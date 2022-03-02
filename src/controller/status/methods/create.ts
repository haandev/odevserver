import { RequestHandler } from "@ooic/core";
import { Status } from "@/model/Status";
import { bodySchema } from "./create.schema";
export const create: RequestHandler = async (request, response, next) => {
  try {
    const result = await Status.create(bodySchema.parse(request.body));
    response.send(result);
  } catch (error) {
    next(error);
  }
};
