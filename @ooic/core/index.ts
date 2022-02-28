export { ooic } from "./app";
import { Model }  from "./init-connection";
export { sequelize, DataTypes, sync, connect } from "./init-connection";
export { initRouter } from "./init-router";
export type { OoicConfig } from "./types";
import express from "express";
export { express };
export const Router = express.Router;
import { RequestHandler } from "express";
export type { RequestHandler };

export {Model}