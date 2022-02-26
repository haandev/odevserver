import { User } from "@/app/model/User";
import { RequestHandler } from "express";

export const register: RequestHandler = async (request, response, next) => {
  try {
    const { username, password, passwordConfirm } = request.body;

    if (!(username && password && passwordConfirm))
      return response.status(400).send("All input is required");

    if (password === passwordConfirm)
      return response.status(401).send("Passwords not matching");

    if (await User.findOne({ where: { username } }))
      return response.status(401).send("Username is in use");
    
    await User.create({
        username,
        password
    })
    next()
  } catch (error) {
    response.status(500).send("Server error");
  }
};
