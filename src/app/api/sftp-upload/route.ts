// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import SFTPClient from 'ssh2-sftp-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const sftp = new SFTPClient();
    const { content } = req.body;

    try {
      await sftp.connect({
        host: 'your_sftp_server',
        port: 22, // default port
        username: 'your_username',
        password: 'your_password',
      });

      await sftp.put(Buffer.from(content), '/remote/path/to/your.csv');
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload file', details: error.message });
    } finally {
      sftp.end();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
