import { Category } from "@/app/model/Category";
import { Status } from "@/app/model/Status";
import { RequestHandler } from "express";

export const destroy: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;

    const status = await Status.findOne({ where: { id: Number(id) }, include:Category });

    if (status.Category.userId !== request.authUser.id) response.status(403).send("Unauthorized");

    status.destroy();
    response.status(200).send("Deleted");
  } catch {
    response.status(500).send("Server error");
  }
};
