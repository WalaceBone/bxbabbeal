#!/usr/bin/env node

import "dotenv/config";

import {
  SFTP_HOST,
  SFTP_PORT,
  SFTP_USERNAME,
  WEB_SERVER_HOST,
  WEB_SERVER_PORT,
} from "./config/application.js";
import { server } from "./utils/server.js";

server.listen(WEB_SERVER_PORT, WEB_SERVER_HOST, () => {
  console.log('----- Basile X Boond Manager -----\n');
  console.log(`Server is running `);
});
