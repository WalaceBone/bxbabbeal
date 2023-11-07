import Client from 'ssh2-sftp-client';
import * as fs from 'fs';

import {
    SFTP_HOST,
    SFTP_PORT,
    SFTP_PWD,
    SFTP_USERNAME,
    FOLDER_NAME,
    INGRESS_FILE_EXT
} from "../config/application.js";

const sftp = new Client();

const sftpOptions = {
    host: SFTP_HOST,
    port: SFTP_PORT,
    username: SFTP_USERNAME,
    password: SFTP_PWD,
};

const remoteFilePath = "/"

async function uploadFiles(file) {
    try {
        console.log(sftpOptions);
        await sftp.connect(sftpOptions);
        console.log(`${process.cwd()}/${FOLDER_NAME}/` + file);
        //const fileData = fs.createReadStream(file);
        await sftp.put(`${process.cwd()}/${FOLDER_NAME}/` + file + INGRESS_FILE_EXT, remoteFilePath + file + INGRESS_FILE_EXT);

        console.log(`Uploaded ${file} to ${remoteFilePath}`);
    } catch (error) {
        console.error(`File upload failed: ${error.message}`);
    } finally {
        sftp.end();
    } 
};

export { uploadFiles };