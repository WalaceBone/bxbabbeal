// pages/index.tsx
"use client";
import React, { useState } from 'react';
import FileInput from './csv/csv.client';
import axios from 'axios';

const Home: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileUpload = async () => {
    try {
      const response = await axios.post('/api/sftp-upload', { content: fileContent });
      alert(response.data.message);
    } catch (error) {
      alert('Error uploading file: ' + error);
    }
  };

  return (
    <div>
      <FileInput onFileLoaded={setFileContent} />
      <button onClick={handleFileUpload} disabled={!fileContent}>
        Upload via SFTP
      </button>
      {/* Display the file content in a preformatted text block */}
      {fileContent && <pre>{fileContent}</pre>}
    </div>
  );
};

export default Home;
