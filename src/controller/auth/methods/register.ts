import { User } from "@/model/User";
import bcrypt from "bcrypt";
import { RequestHandler } from "@ooic/core";
import { bodySchema } from "./register.schema";

export const register: RequestHandler = async (request, response, next) => {
  try {
    const { username, password } = bodySchema.parse(request.body);

    if (await User.findOne({ where: { username } })) throw { statusCode: 401, message: "Username is in use" };

    await User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });
    next();
  } catch (error) {
    next(error);
  }
};
