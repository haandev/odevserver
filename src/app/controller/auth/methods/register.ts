import { User } from "@/app/model/User";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";

export const register: RequestHandler = async (request, response, next) => {
  try {
    const { username, password, passwordConfirm } = request.body;

    if (!(username && password && passwordConfirm)) throw Error("All input is required");

    if (password !== passwordConfirm) throw Error("Passwords not matching");

    if (await User.findOne({ where: { username } })) throw Error("Username is in use");

    await User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });
    next();
  } catch (error) {
    console.log(error);
    response.status(500).send(error.message);
  }
};
