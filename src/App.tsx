import React, { useState, useRef } from 'react';
import './styles.css';

const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="app">
      <h1>Machine Client Log Summarizer</h1>

      <div
        className="file-drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button onClick={() => fileInputRef.current?.click()}>
          Choose File
        </button>
        <p>or drag and drop a log file here</p>
        {selectedFile && (
          <p>Selected file: {selectedFile.name}</p>
        )}
      </div>

      {fileContent && (
        <div className="file-content">
          <h2>File Content:</h2>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};
