import express from "express";
const router = express.Router();

import * as category from "@/app/controller/category";
import * as auth from "@/app/controller/auth";

router.post("/", auth.verifyToken, category.create);
router.put("/:id", auth.verifyToken, category.update);
router.get("/", auth.verifyToken, category.get);
router.get("/:id", auth.verifyToken, category.getById);
router.delete("/:id", auth.verifyToken, category.destroy);

export default router;
