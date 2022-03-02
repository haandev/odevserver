import https from "https";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { OoicConfig } from "./types";
import { initRouter } from "./init-router";
import { initErrorHandlers } from "./init-error-handlers";
import { connect, sync } from "./init-connection";
import { queryParser } from "express-query-parser";
import { swaggerify } from "./swagger-autogen";
import unhandled from "./unhandled";
import { NumberIfNumeric } from "./utils";
export async function ooic(config: OoicConfig) {
  const app = express();
  config.cors?.enabled && app.use(cors(config.cors.options));
  config.morgan?.enabled && process.env.NODE_ENV === "development" && app.use(morgan(config.morgan.format, config.morgan.options));
  config.cookieParser?.enabled && app.use(cookieParser(config.cookieParser.secret, config.cookieParser.options));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    queryParser({
      parseNumber: true,
      parseBoolean: true,
      parseNull: true,
      parseUndefined: true,
    })
  );

  await connect();
  await initRouter(app);
  await initErrorHandlers(app);
  app.use(unhandled);

  // await swaggerify(app),
  await sync();

  if (process.env.NODE_ENV === "development") {
    http.createServer(app).listen(process.env.APP_PORT);
    console.log(
      `\nWelcome to ${process.env.APP_NAME} v${process.env.APP_VERSION}! Listening on port ${process.env.APP_PORT}` +
        `\nRunning on environment: ${process.env.NODE_ENV}` +
        `\nhttp://localhost:${process.env.APP_PORT}`
    );
  } else {
    http.createServer(app).listen(80);
    config.ssl?.enabled && https.createServer({ cert: config.ssl.cert, key: config.ssl.key }, app).listen(443);
    console.log(
      `\nWelcome to ${process.env.APP_NAME} v${process.env.APP_VERSION}! Listening on port 80 and 443` + `\nRunning on environment: ${process.env.NODE_ENV}`
    );
  }
  return app;
}
