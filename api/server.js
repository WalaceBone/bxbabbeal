import http from "http";
import process from "node:process";
import express from 'express';
import { FOLDER_NAME, WEB_SERVER_HOST } from "../config/application.js";
import { readFile, getEgressFileName, deleteFiles } from "../utils/files.js";
import { employeesAsJson, startMapping } from "../utils/mapper.js";
import { uploadFiles } from "../utils/sftp.js";

const app = express();
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

app.get('/', async (req, res) => {
  const html = await readFile(`${process.cwd()}/${FOLDER_NAME}/index.html`);
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(html);
})

app.get('/transmit', async (req, res) => { });

app.post('/upload', async (req, res) => {
  try {
    const chunks = [];
    req
      .on('data', chunk => chunks.push(chunk))
      .on('end', () => {
        const body = Buffer.concat(chunks).toString();
        startMapping(body);
        res.writeHead(200);
        res.end(JSON.stringify(employeesAsJson));
        res.status(200).send();
      });

  } catch (error) {
    res.writeHead(500);
    res.end();
    console.error(error.message);
  }

});

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

      case "/oldupload":
        // const chunks = [];
        // req
        //   .on('data', chunk => chunks.push(chunk))
        //   .on('end', () => {
        //     const body = Buffer.concat(chunks).toString();
        //     startMapping(body);
        //     res.writeHead(200);
        //     res.end(JSON.stringify(employeesAsJson));
        //   });
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

// const server = http.createServer(requestListener);

export { app, serveData };
