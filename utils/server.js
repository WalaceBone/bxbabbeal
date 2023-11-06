import http from "http";
import process from "node:process";

import { FOLDER_NAME, WEB_SERVER_HOST } from "../config/application.js";
import { readFile, getEgressFileName } from "./files.js";
import { employeesAsJson, startMapping } from "./mapper.js";
import { uploadFiles } from "./sftp.js";

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
            uploadFiles(getEgressFileName());


            res.writeHead(200);
            res.end(JSON.stringify(employeesAsJson));
          });
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

export { server, serveData };
