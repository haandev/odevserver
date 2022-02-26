import express from "express";

declare global {
  namespace Express {
    interface Request {
      authUser: any;
      clientIp: string;
    }
  }
}
