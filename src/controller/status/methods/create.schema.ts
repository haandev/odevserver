import { zod } from "@ooic/core";
export const bodySchema = zod.object({
  title: zod.string(),
  color: zod.string(),
  categoryId: zod.number()
});
