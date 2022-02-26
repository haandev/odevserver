import fs from "fs";
import { toKebabCase } from "../utils";
import { Express } from "express";
export default (app: Express) => {
  const Routers = {};
  const files = fs.readdirSync("src/app/router/");
  Promise.all(files.map((fileName) => import(`../app/router/${fileName}`))).then((responses) => {
    responses.forEach((loadedModule, index) => {
      const name = toKebabCase(files[index].split(".")[0]);
      console.log(name)
      Routers[name] = loadedModule.default;
      app.use(`/${name}`, Routers[name]);
    });
  });
};
