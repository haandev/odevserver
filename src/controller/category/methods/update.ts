import { Category } from "@/model/Category";
import { RequestHandler } from "@ooic/core";

export const update: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;

    const category = await Category.findOne({ where: { id: Number(id) } });

    if (category.userId !== request.authUser.id) response.status(403).send("Unauthorized");

    category.update(request.body);
    response.status(200).send(category);
  } catch {
    response.status(500).send("Server error");
  }
};
