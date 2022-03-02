import { zod } from "@ooic/core";
export const bodySchema = zod.object({
  title: zod.string(),
});
export const paramsSchema = zod.object({
  id: zod.string().regex(/^\d+$/).transform(Number)
});
