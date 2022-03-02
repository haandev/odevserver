import { Category } from "@/model/Category";
import { Status } from "@/model/Status";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";
const getById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = schema.params.parse(request.params);
    const status = await Status.findOne({
      where: { id: Number(id) },
      include: Category,
    });
    response.status(200).send(status);
  } catch (error) {
    next(error);
  }
};

export default getById