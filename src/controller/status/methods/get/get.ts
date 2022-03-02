import { Status } from "@/model/Status";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";
const get: RequestHandler = async (request, response, next) => {
  try {
    const query = schema.query.parse(request.query);
    const statuses = await Status.findAll({ where: { ...query } });
    response.status(200).send(statuses);
  } catch (error) {
    next(error);
  }
};

export default get;
