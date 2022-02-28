import { Category } from "@/model/Category";
import { RequestHandler } from "@ooic/core";

export const get: RequestHandler = async (request, response) => {
  try {
    const categories = await Category.findAll({ where: { userId: request.authUser.id } });
    response.status(200).send(categories);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};
