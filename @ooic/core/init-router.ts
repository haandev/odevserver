import fs from "fs";
import { toKebabCase } from "./utils";
import { Express } from "express";
export const initRouter = async (app: Express) => {
  const Routers = {};
  const files = fs.readdirSync("src/router/");
  await Promise.all(files.map((fileName) => import(`@/router/${fileName}`))).then((responses) => {
    responses.forEach((loadedModule, index) => {
      const name = toKebabCase(files[index].split(".")[0]);
      Routers[name] = loadedModule.default;
      app.use(`/${name}`, Routers[name]);
    });
  });
};
