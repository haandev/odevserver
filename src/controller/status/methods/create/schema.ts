import { zod } from "@ooic/core";
export const body = zod.object({
  title: zod.string(),
  color: zod.string(),
  categoryId: zod.number()
});
