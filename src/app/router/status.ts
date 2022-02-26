import express from "express";
const router = express.Router();

import * as status from "@/app/controller/status";
import * as auth from "@/app/controller/auth";

router.post("/", auth.verifyToken, status.create);
router.put("/:id", auth.verifyToken, status.update);
router.get("/", auth.verifyToken, status.get);
router.get("/:id", auth.verifyToken, status.getById);
router.delete("/:id", auth.verifyToken, status.destroy);

export default router;
