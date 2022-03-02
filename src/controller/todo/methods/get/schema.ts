import { zod } from "@ooic/core";

export const query = zod.object({
  categoryId: zod.number(),
  statusId: zod.number()
});