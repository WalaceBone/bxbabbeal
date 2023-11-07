#!/usr/bin/env node

import "dotenv/config";

import {
  SFTP_HOST,
  SFTP_PORT,
  SFTP_USERNAME,
  WEB_SERVER_HOST,
  WEB_SERVER_PORT,
} from "./config/application.js";
import { server } from "./api/server.js";

server.listen(process.env.PORT, process.env.IP, () => {
  console.log('----- Basile X Boond Manager -----\n');
  console.log(`Server is running `);
});
