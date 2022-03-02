import { zod } from "@ooic/core";
export const body = zod.object({
  title: zod.string(),
  categoryId: zod.number(),
  statusId: zod.number()
});
export const params = zod.object({
  id: zod.string().regex(/^\d+$/).transform(Number)
});