import { Request, zod } from "@ooic/core";
export const bodySchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});
