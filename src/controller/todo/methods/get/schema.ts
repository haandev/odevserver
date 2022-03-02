import { zod } from "@ooic/core";

export const query = zod.object({
  categoryId: zod.string().regex(/^\d+$/).transform(Number).optional(),
  statusId: zod.string().regex(/^\d+$/).transform(Number).optional()
});