import { Router } from "@ooic/core";

import * as status from "@/controller/status";
import * as auth from "@/controller/auth";

const router = Router();

router.post("/", auth.verifyToken, status.create);
router.put("/:id", auth.verifyToken, status.update);
router.get("/", auth.verifyToken, status.get);
router.get("/:id", auth.verifyToken, status.getById);
router.delete("/:id", auth.verifyToken, status.destroy);

export default router;