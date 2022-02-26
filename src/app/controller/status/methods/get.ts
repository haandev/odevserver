import { Status } from "@/app/model/Status";
import { RequestHandler } from "express";

export const get: RequestHandler = async (request, response) => {
  try {
    const {categoryId} = request.query
    const statuses = await Status.findAll({ where: { categoryId } });
    response.status(200).send(statuses);
  } catch {
    response.status(500).send("Server error");
  }
};
