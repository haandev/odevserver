import { Category } from "@/app/model/Category";
import { RequestHandler } from "express";

export const destroy: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;

    const category = await Category.findOne({ where: { id: Number(id) } });

    if (category.userId !== request.authUser.id) response.status(403).send("Unauthorized");

    category.destroy();
    response.status(200).send("Deleted");
  } catch {
    response.status(500).send("Server error");
  }
};
