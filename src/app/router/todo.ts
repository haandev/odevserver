import express from "express";
const router = express.Router();

import * as todo from "@/app/controller/todo";
import * as auth from "@/app/controller/auth";

router.post("/", auth.verifyToken, todo.create);
router.put("/:id", auth.verifyToken, todo.update);
router.get("/", auth.verifyToken, todo.get);
router.get("/:id", auth.verifyToken, todo.getById);
router.delete("/:id", auth.verifyToken, todo.destroy);

export default router;
