import { User } from "@/model/User";
import { RequestHandler } from "@ooic/core";
import bcrypt from "bcrypt";

import { bodySchema } from "./passwordChange.schema";

export const passwordChange: RequestHandler = async (request, response, next) => {
  try {
    const { username, oldPassword, newPassword } = bodySchema.parse(request.body);
    const user = await User.findOne({
      where: { username },
    });
    if (!user) throw { statusCode: 404, message: "User not found" };
    if (!(await bcrypt.compare(oldPassword, user.password))) throw { statusCode: 401, message: "Old password is wrong" };

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    response.status(200).send("Password changed");
  } catch (error) {
    next(error);
  }
};
