import { RequestHandler } from "express";
import { Todo } from "@/app/model/Todo";
export const create: RequestHandler = async (request, response) => {
  try {
    const result = await Todo.create({ userId: request.authUser.id, ...request.body });
    response.send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error");
  }
};
