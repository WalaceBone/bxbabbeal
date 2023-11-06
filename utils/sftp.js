import Client from 'ssh2-sftp-client';

import {
    SFTP_HOST,
    SFTP_PORT,
    SFTP_PWD,
    SFTP_USERNAME
} from "../config/application.js";

const sftp = new Client();

const sftpOptions = {
    host: SFTP_HOST,
    port: SFTP_PORT,
    username: SFTP_USERNAME,
    password: SFTP_PWD,
};

const remoteFilePath = ""

async function uploadFiles(file) {
    try {
        await sftp.connect(sftpOptions);

        const fileData = fs.createReadStream(file);
        await sftp.put(fileData, remoteFilePath);

        console.log(`Uploaded ${file} to ${remoteFilePath}`);
    } catch (error) {
        console.error(`File upload failed: ${error.message}`);
    } finally {
        sftp.end();
    }
};

export { uploadFiles };