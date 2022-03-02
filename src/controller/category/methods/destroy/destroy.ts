import { Category } from "@/model/Category";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";

const destroy: RequestHandler = async (request, response, next) => {
  try {
    const { id } = schema.params.parse(request.params);
    const category = await Category.findOne({ where: { id: Number(id) } });

    if (category.userId !== request.authUser.id) throw { statusCode: 403, message: "Unauthorized" };

    category.destroy();
    response.status(200).send("Deleted");
  } catch (error) {
    next(error);
  }
};

export default destroy