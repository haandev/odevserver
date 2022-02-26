import { Category } from "@/app/model/Category";
import { Status } from "@/app/model/Status";
import { RequestHandler } from "express";

export const getById: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;
    const status = await Status.findOne({
      where: { id: Number(id)},include:Category 
    });
    response.status(200).send(status);
  } catch {
    response.status(500).send("Server error");
  }
};
