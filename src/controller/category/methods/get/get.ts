import { Category } from "@/model/Category";
import { RequestHandler } from "@ooic/core";

const get: RequestHandler = async (request, response, next) => {
  try {
    const categories = await Category.findAll({ where: { userId: request.authUser.id } });
    response.status(200).send(categories);
  } catch (error) {
    next(error)
  }
};

export default get