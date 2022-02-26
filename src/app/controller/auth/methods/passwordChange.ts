import { User } from "@/app/model/User";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";

export const passwordChange: RequestHandler = async (
  request,
  response,
) => {
  try {
    const username = request.authUser.username;
    const oldPassword = request.body.oldPassword;
    const newPassword = request.body.password;

    const user = await User.findOne({
      where: { username },
    });
    if (!user) return response.status(404).send("User not found");

    if (!(await bcrypt.compare(oldPassword, user.password)))
      return response.status(401).send("Old password is wrong");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return response.status(200).send("Password changed");
  } catch {
    return response.status(500).send("Server error");
  }
};
