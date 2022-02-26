import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uid2 from "uid2";

import { User } from "@/app/model/User";
import { Login } from "@/app/model/Login";
import { RequestHandler } from "express";

export const login: RequestHandler = async (request, response) => {
  try {
    const { username, password } = request.body;
    if (!(username && password)) {
      response.status(400).send("All input is required");
    }
    const user = await User.findOne({
      where: { username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      /* Omit here the sensitive information in User model to generate jwt */

      const payload = { id: user.id, username: user.username };
      console.log(payload);

      const token = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: "120m",
      });

      const _refreshToken = uid2(64);

      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 30);

      await Login.create({
        userId: user.id,
        refreshToken: _refreshToken,
        firstIp: request.clientIp,
        userAgent: request.headers["user-agent"],
        expiredAt: expires.toISOString(),
      });

      response.cookie("refreshToken", _refreshToken, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires,
      });

      return response.status(200).send({ ...payload, token });
    } else {
      return response.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    return response.status(500).send("Server error");
  }
};
