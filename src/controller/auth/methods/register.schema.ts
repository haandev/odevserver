import { Request, zod } from "@ooic/core";
export const bodySchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  passwordConfirm: zod.string(),
}).refine((data) => data.passwordConfirm === data.password, "Passwords don't match");
