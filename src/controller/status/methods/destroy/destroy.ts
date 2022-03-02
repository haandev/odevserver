import { Category } from "@/model/Category";
import { Status } from "@/model/Status";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";
const destroy: RequestHandler = async (request, response, next) => {
  try {
    const { id } = schema.params.parse(request.params);

    const status = await Status.findOne({ where: { id: Number(id) }, include: Category });

    if (status.Category.userId !== request.authUser.id) throw { statusCode: 403, message: "Unauthorized" };

    status.destroy();
    response.status(200).send("Deleted");
  } catch (error) {
    next(error);
  }
};

export default destroy