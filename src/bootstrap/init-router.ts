import fs from "fs";
import { toKebabCase } from "../utils";
import { Express, Router } from "express";
export default (app: Express) => {
  const Routers = {};
  fs.readdirSync("src/app/router/").forEach((fileName) => {
    import(
      `../app/router/${fileName}`
    ).then(loadedModule=>{
      Routers[toKebabCase(fileName.split(".")[0])] = loadedModule.default
      app.use(
        `/${toKebabCase(fileName.split(".")[0])}`,
        Routers[toKebabCase(fileName.split(".")[0])]
      );
    });
    
  });
  return Routers;
};
