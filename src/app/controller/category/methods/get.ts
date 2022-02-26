import { Category } from "@/app/model/Category";
import { RequestHandler } from "express";

export const get: RequestHandler = async (request, response) => {
  try {
    const categories = await Category.findAll({ where: { userId: request.authUser.id } });
    response.status(200).send(categories);
  } catch {
    response.status(500).send("Server error");
  }
};
