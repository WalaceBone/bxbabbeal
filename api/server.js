import http from "http";
import process from "node:process";
import express from 'express';
import { FOLDER_NAME, WEB_SERVER_HOST } from "../config/application.js";
import { readFile, getEgressFileName, deleteFiles } from "./files.js";
import { employeesAsJson, startMapping } from "./mapper.js";
import { uploadFiles } from "./sftp.js";

const app = express();
app.use(express.bodyParser());

app.get('/transmit', async (req, res) => { });

app.get('/upload', async (req, res) => { });

const requestListener = async (req, res) => {
  try {
    console.log(`Serving: ${req.url}`);

    switch (req.url) {
      case "/":
        const html = await readFile(`${process.cwd()}/${FOLDER_NAME}/index.html`);
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(html);
        break;

      case "/upload":
        const chunks = [];
        req
          .on('data', chunk => chunks.push(chunk))
          .on('end', () => {
            const body = Buffer.concat(chunks).toString();
            startMapping(body);
            res.writeHead(200);
            res.end(JSON.stringify(employeesAsJson));
          });
        break;

      case "/transmit":
        await uploadFiles(getEgressFileName());
        await deleteFiles();
        res.writeHead(200);
        res.status(200).send("DONE");
        break;

      default:
        res.writeHead(404);
        res.end("Resource not found");
    }
  } catch (error) {
    res.writeHead(500);
    res.end();
    console.error(error.message);
    process.exit(1);
  }
};

const serveData = (body) => {
  const options = {
    host: WEB_SERVER_HOST,
    path: '/',
    method: 'POST',
    body,
  }

  http.request(options, response => {
    console.log(`STATUS: ${response.statusCode}`);
  }).end();
};

const server = http.createServer(requestListener);

export { app, server, serveData };
