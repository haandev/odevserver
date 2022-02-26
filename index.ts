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
  response.send( 
    `Welcome to ${process.env.APP_NAME} v${process.env.APP_VERSION}!`
  );  
}); 

const sslOptions = {  
  key: fs.readFileSync("ssl/private.key"),
  cert: fs.readFileSync("ssl/certificate.crt"),
}; 

(async () => {   
  await connect();
  router(app);
 
  await sync(); 
  asciify(
    "PTK167",
    { font: "starwars", color: "green" },
    function (_err: any, res: any) {
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
          `\nWelcome to ${process.env.APP_NAME} v${process.env.APP_VERSION}! Listening on port 80 and 443` +
            `\nRunning on environment: ${process.env.NODE_ENV}`
        );
      }
    }
  );
})(); 
