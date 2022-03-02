import { zod } from "@ooic/core";
export const paramsSchema = zod.object({
  id: zod.string().regex(/^\d+$/).transform(Number)
});