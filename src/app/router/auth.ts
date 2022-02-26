import express from "express";
const router = express.Router();

import * as auth from "@/app/controller/auth";

router.post("/login", auth.login);
router.post("/register", auth.register, auth.login);
router.post("/password-change", auth.verifyToken, auth.passwordChange);
router.get("/user", auth.user);

export default router;
