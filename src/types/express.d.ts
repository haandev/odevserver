import { User } from "@/app/model/User";

type typedResponse = Express.Response & {
  status: (statusCode: number) => typedResponse;
  sendStatus: (statusCode: number) => typedResponse;
  send: (responseBody: any) => typedResponse;
  cookie: (
    cookieName: string,
    cookieValue: string,
    options: { secure: boolean; httpOnly: boolean; expires: Date }
  ) => void;
};

type typedRequest = Express.Request & {
  cookies: {
    accessToken: string;
    refreshToken: string;
  };
  headers: object;
  authUser: any;
  clientIp: string;
  body: unknown;
  params: unknown;
};

export type ExpressMiddleware<request = {}, response = {}> = (
  request?: typedRequest & request,
  response?: typedResponse & response,
  next?: ExpressMiddleware
) => any;
