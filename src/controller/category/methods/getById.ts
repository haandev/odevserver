import { Category } from "@/model/Category";
import { RequestHandler } from "@ooic/core";

export const getById: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;
    const category = await Category.findOne({
      where: { id: Number(id), userId: Number(request.authUser.id) },
    });
    response.status(200).send(category);
  } catch {
    response.status(500).send("Server error");
  }
};
