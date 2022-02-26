import { RequestHandler } from "express";

export const user: RequestHandler = async (request, response) => {
  try {
    return response.status(200).send(request.authUser);
  } catch {
    return response.status(500).send("Server error");
  }
}