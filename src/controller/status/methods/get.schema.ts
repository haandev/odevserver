import { zod } from "@ooic/core";

export const querySchema = zod.object({
  categoryId: zod.number()
});