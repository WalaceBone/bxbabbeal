#!/usr/bin/env node

import "dotenv/config";

import {
  SFTP_HOST,
  SFTP_PORT,
  SFTP_USERNAME,
  WEB_SERVER_HOST,
  WEB_SERVER_PORT,
} from "./config/application.js";
import { app } from "./api/server.js";

app.listen(process.env.PORT || 8080, process.env.IP || 'localhost', () => {
  console.log('----- Basile X Boond Manager -----\n');
  console.log(`Server is running ${process.env.PORT}:${process.env.IP}`);
});
