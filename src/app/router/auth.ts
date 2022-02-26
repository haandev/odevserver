import express from "express"
const router = express.Router();

import * as Auth from "@/app/controller/auth";

router.post("/login", Auth.login);
router.post("/register", Auth.register,Auth.login);

export default router;