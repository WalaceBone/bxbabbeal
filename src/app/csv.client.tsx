"use client";

import React, { useState, ChangeEvent } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

const CsvReaderPage: React.FC = () => {
  const [csvData, setCsvData] = useState<string[][] | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target?.result as string;
        parseCSV(text);
      };

      reader.readAsText(event.target.files[0]);
    }
  };

  const parseCSV = (data: string) => {
    Papa.parse(data, {
      complete: (result) => {
        setCsvData(result.data as string[][]);
      },
      header: false,
    });
  };

  const handleSFTPUpload = async () => {
    if (!csvData) {
      alert('No CSV data to upload');
      return;
    }

    try {
      const csvString = Papa.unparse(csvData);

      // Use FormData to send the file via a POST request
      const formData = new FormData();
      const blob = new Blob([csvString], { type: 'text/csv' });
      formData.append('file', blob, 'upload.csv');
  
      // Send the POST request to your API route
      const response = await axios.post('/api/sftp-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Upload response:', response.data);
    } catch (error) {
      console.error('SFTP upload failed:', error);
    
    }
  };

  return (
    <div>
      <h1>CSV Reader</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      
      {csvData && (
        <div>
          <h2>CSV Content</h2>
          <table>
            <tbody>
              {csvData.map((row, i) => (
                <tr key={i}>
                  {row.map((item, j) => (
                    <td key={j}>{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button onClick={handleSFTPUpload}>Upload via SFTP</button>
    </div>
  );
};

export default CsvReaderPage;
