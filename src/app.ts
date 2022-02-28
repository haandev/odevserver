import fs from "fs";
import { OoicConfig, ooic } from "@ooic/core";

const config: OoicConfig = {
  cors: {
    enabled: true,
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
const app = ooic(config); 
   