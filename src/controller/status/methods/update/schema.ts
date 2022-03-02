import { zod } from "@ooic/core";
export const body = zod.object({
  title: zod.string().optional(),
  categoryId: zod.number().optional(),
  color: zod.string().optional(),
});
export const params = zod.object({
  id: zod.string().regex(/^\d+$/).transform(Number)
});
