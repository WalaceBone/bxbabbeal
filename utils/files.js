import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

import {
  EGRESS_FILE_NAME,
  FOLDER_NAME,
  INGRESS_FILE_EXT,
  INGRESS_FILE_NAME
} from "../config/application.js";

const readFile = async (path) => {
  try {
    return await fs.readFile(path, { encoding: 'utf8' });
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
    process.exit(1);
  }
};

const readDir = async () => {
  try {
    return await fs.readdir(`${process.cwd()}/${FOLDER_NAME}`);
  } catch (error) {
    console.error(`Got an error trying to reading the directory: ${error.message}`);
    process.exit(1);
  }
};

const deleteFile = async (path) => {
  try {
    await fs.unlink(`${process.cwd()}/${FOLDER_NAME}/${path}`);
    console.log(`Deleted ${path}`);
  } catch (error) {
    console.error(`Got an error trying to delete the file: ${error.message}`);
    process.exit(1);
  }
};

const deleteFiles = async () => {
  try {
    console.log("Deleting old files...");
    const files = await readDir();
    const targetFiles = files.filter(file => file.includes('abbeal'));
    targetFiles.forEach(file => deleteFile(file));
  } catch (error) {
    console.error(`Got an error trying to delete old files: ${error.message}`);
    process.exit(1);
  }
};

/**
 * CSV handlers
 */
const writeCSVLine = async (fileName, { firstName, lastName, email, zipCode = "" }) => {
  try {
    const csvLine = `\n${firstName},${lastName},${email},${zipCode}`;

    await fs.writeFile(
      `${process.cwd()}/${FOLDER_NAME}/${fileName}.csv`,
      csvLine,
      { flag: "a" },
    );
  } catch (error) {
    console.error(`Got an error trying to write the file: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Ingress File
 */
const getIngressFileName = () => {
  return path.format({
    name: INGRESS_FILE_NAME,
    ext: INGRESS_FILE_EXT,
  });
};

const getIngressFilePath = () => {
  return path.join(
    process.cwd(),
    FOLDER_NAME,
    getIngressFileName(),
  );
};

/**
 * Egress File
 */
const getEgressFileName = () => {
  const date = new Date().toISOString().replace(/[^0-9.]/g, "");
  const timestamp = date.substring(0, date.length - 4);
  return EGRESS_FILE_NAME + timestamp;
};

export {
  deleteFiles,
  getEgressFileName,
  getIngressFilePath,
  readFile,
  writeCSVLine
};