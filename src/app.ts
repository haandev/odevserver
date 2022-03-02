import fs from "fs";
import { OoicConfig, ooic } from "@ooic/core";

import { unhandled } from "@ooic/core/unhandled";
import { ZodError } from "@/error-handler/ZodError";
import { SequelizeValidationError } from "@/error-handler/SequelizeValidationError";

const config: OoicConfig = {
  cors: {
    enabled: true,
    options: {
      credentials: true,
      origin: function (_origin, callback) {
        callback(null, true);
      },
    },
  },
  morgan: {
    enabled: true,
    format: "combined",
  },
  ssl: {
    enabled: true,
    key: fs.readFileSync("ssl/private.key"),
    cert: fs.readFileSync("ssl/certificate.crt"),
  },
  cookieParser: {
    enabled: true,
  },
};
(async () => {
  const app = await ooic(config);
})();
