import { Category } from "@/model/Category";
import { Status } from "@/model/Status";
import { RequestHandler } from "@ooic/core";

export const update: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;

    const status = await Status.findOne({ where: { id: Number(id) }, include: Category });

    if (status.Category.userId !== request.authUser.id) response.status(403).send("Unauthorized");

    status.update(request.body);
    response.status(200).send(status);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};
