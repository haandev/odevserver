
import { zod } from "@ooic/core";
export const bodySchema = zod.object({
  title: zod.string(),
});
