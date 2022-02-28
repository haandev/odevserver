import { Router } from "@ooic/core";

import * as todo from "@/controller/todo";
import * as auth from "@/controller/auth";

const router = Router();
router.post("/", auth.verifyToken, todo.create);
router.put("/:id", auth.verifyToken, todo.update);
router.get("/", auth.verifyToken, todo.get);
router.get("/:id", auth.verifyToken, todo.getById);
router.delete("/:id", auth.verifyToken, todo.destroy);

export default router;
