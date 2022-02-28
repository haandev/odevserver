import { Status } from "@/model/Status";
import { RequestHandler } from "@ooic/core";

export const get: RequestHandler = async (request, response) => {
  try {
    const {categoryId} = request.query
    const statuses = await Status.findAll({ where: { categoryId } });
    response.status(200).send(statuses);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};
