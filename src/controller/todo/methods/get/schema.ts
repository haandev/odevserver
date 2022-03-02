import { zod } from "@ooic/core";

export const query = zod.object({
  categoryId: zod.number().optional(),
  statusId: zod.number().optional()
});