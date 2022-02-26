import { RequestHandler } from "express";
import { Category } from "@/app/model/Category";
export const create: RequestHandler = async (request, response) => {
  try {
    const result = await Category.create({ userId: request.authUser.id, ...request.body });
    response.send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error");
  }
};
