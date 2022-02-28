import { RequestHandler } from "@ooic/core";

export const user: RequestHandler = async (request, response) => {
  try {
    response.status(200).send(request.authUser);
  } catch {
    response.status(500).send("Server error");
  }
}