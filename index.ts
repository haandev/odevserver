import https from "https";
import http from "http";
import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

import asciify from "asciify";
import morgan from "morgan";
import fs from "fs";
import { connect, sync } from "@/bootstrap/init-connection";
import router from "@/bootstrap/init-router";
const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", function (request, response) {
  response.send(`Welcome to ${process.env.APP_NAME} v${process.env.APP_VERSION}!`);
});

const sslOptions = {
  key: fs.readFileSync("ssl/private.key"),
  cert: fs.readFileSync("ssl/certificate.crt"),
};

function getFullPath(layer, prevPath = "") {
  let routeName = "";
  if (layer?.route?.path) {
    routeName = layer?.route?.path;
  } else if (layer.regexp) {
    routeName = layer.regexp.source.replace("^\\", "").replace("\\/?(?=\\/|$)", "");
    if (layer.keys && layer.keys.length > 0) {
      layer.keys.forEach(function (key) {
        routeName = routeName.replace("(?:([^\\/]+?))", ":" + key.name);
      });
    }
  }
  return prevPath + routeName.split("\\").join("");
}
const trimEndStr = (source: string, str: string) => {
  const start = source.indexOf(str);
  const length = str.length;
  if (start + length === source.length) {
    return source.slice(0, start);
  }
};
const routes = [];
const recursivePath = (r, pathPrev = "") => {
  const path = getFullPath(r, pathPrev);
  if (r.name === "router") {
    const stack = r.handle.stack;
    stack.forEach((r, i) => {
      const pathNext = recursivePath(r, path);
    });
  } else {
    if (r.name === "bound dispatch") {
      routes.push({ path, params:r.params,keys:r.keys,stack:r.route.stack,methods:r.route.methods });
    }
    return path;
  }
};
(async () => {
  await connect();
  await router(app);

  app._router.stack.forEach((r, i) => {
    recursivePath(r);
  });
  console.log(routes)

  await sync();
  asciify("PTK167", { font: "starwars", color: "green" }, function (_err: any, res: any) {
    console.log(res);
    if (process.env.NODE_ENV === "development") {
      http.createServer(app).listen(process.env.APP_PORT);
      console.log(
        `\nWelcome to ${process.env.APP_NAME} v${process.env.APP_VERSION}! Listening on port ${process.env.APP_PORT}` +
          `\nRunning on environment: ${process.env.NODE_ENV}` +
          `\nhttp://localhost:${process.env.APP_PORT}`
      );
    } else {
      http.createServer(app).listen(80);
      https.createServer(sslOptions, app).listen(443);
      console.log(
        `\nWelcome to ${process.env.APP_NAME} v${process.env.APP_VERSION}! Listening on port 80 and 443` + `\nRunning on environment: ${process.env.NODE_ENV}`
      );
    }
  });
})();
