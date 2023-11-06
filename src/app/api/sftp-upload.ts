import type { NextApiRequest, NextApiResponse } from 'next';
import SFTPClient from 'ssh2-sftp-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log("HERE");
        // Process the file uploaded in the request
        // const sftp = new SFTPClient();
        // try {
        //     await sftp.connect({
        //         host: process.env.SFTP_HOST,
        //         port: process.env.SFTP_PORT ? parseInt(process.env.SFTP_PORT) : 22,
        //         username: process.env.SFTP_USER,
        //         password: process.env.SFTP_PASSWORD,
        //     });

        //     // You'll need to write the file to a temporary location or buffer
        //     // since we're receiving it as part of the request body
        //     // This is an example where we assume you've handled the file as needed
        //     const remoteFilePath = `/remote/path/to/file.csv`;

        //     await sftp.put(req.body.file, remoteFilePath);

        //     res.status(200).json({ success: true });
        // } catch (error) {
        //     res.status(500).json({ success: false, error });
        // } finally {
        //     sftp.end();
        // }
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
