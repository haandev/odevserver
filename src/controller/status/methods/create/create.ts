import { RequestHandler } from "@ooic/core";
import { Status } from "@/model/Status";
import { schema } from ".";
const create: RequestHandler = async (request, response, next) => {
  try {
    const result = await Status.create(schema.body.parse(request.body));
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export default create