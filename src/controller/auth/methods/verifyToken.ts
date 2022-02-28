import { RequestHandler } from "@ooic/core";
import jwt from "jsonwebtoken";

import { Login } from "@/model/Login";

export const verifyToken: RequestHandler = async (request, response, next) => {
  try {
    const { refreshToken, accessToken } = request.cookies;
   /*  console.log(request.headers.cookie)
    console.log(request.cookies) */
    const authorizationHeader = request.headers["authorization"];
    const token = authorizationHeader?.substring(7) || accessToken;

    if (!accessToken && (!authorizationHeader || !authorizationHeader?.startsWith("Bearer "))) {
      console.log("access token", accessToken);
      console.log("authorizationHeader", authorizationHeader);
      return response.status(403).send("Invalid Authorization Strategy");
    }

    if (!token) return response.status(403).send("A token is required for authentication");

    try {
      request.authUser = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
      const login = await Login.findOne({
        where: { refreshToken },
      });
      const user = jwt.decode(token) as jwt.JwtPayload;
      if (login && user && login.userId === user.id) {
        const { iat, exp, ...payload } = user;

        const token = jwt.sign(payload, process.env.TOKEN_KEY, {
          expiresIn: "1m",
        });

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 1);

        response.cookie("accessToken ", token, {
        //  secure: process.env.NODE_ENV !== "development",
          httpOnly: true,
          expires,
        });
        next();
      } else {
        return response.status(401).send({ login, user });
      }
    }
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).send(error);
  }
};
