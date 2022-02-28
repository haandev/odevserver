import { RequestHandler } from "@ooic/core";
import { Status } from "@/model/Status";
export const create: RequestHandler = async (request, response) => {
  try {
    const result = await Status.create({ ...request.body });
    response.send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error");
  }
};
