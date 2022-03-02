import { Request, zod } from "@ooic/core";
export const bodySchema = zod.object({
  username: zod.string(),
  newPassword: zod.string(),
  newPasswordConfirm: zod.string(),
  oldPassword: zod.string(),
}).refine((data) => data.newPassword === data.newPasswordConfirm, "Passwords don't match");;