import React, { useState } from 'react';
import OSS from 'ali-oss';
import './App.css';

function App() {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }



    const client = new OSS({
      region: process.env.REACT_APP_PUBLIC_ALI_OSS_REGION,
      accessKeyId: process.env.REACT_APP_PUBLIC_ALI_OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.REACT_APP_PUBLIC_ALI_OSS_ACCESS_KEY_SECRET,
      bucket: process.env.REACT_APP_PUBLIC_ALI_OSS_BUCKET
    });

    try {
      const uploadResult = await client.put(selectedFile.name, selectedFile);
      console.log('Upload succeeded:', uploadResult);

      // Optional: Download the object to verify the upload
      const getResult = await client.get(selectedFile.name);
      console.log('Object downloaded:', getResult);

      alert(`File uploaded successfully: ${uploadResult.url}`);
    } catch (error) {
      console.error('Error:', error);
      alert('File upload failed');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <button onClick={() => document.getElementById('fileInput').click()}>
          Select File
        </button>
        <button onClick={handleFileUpload} disabled={!selectedFile}>
          Upload File
        </button>
      </header>
    </div>
  );
}

export default App;
