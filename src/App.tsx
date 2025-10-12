import React, { useState, useRef } from 'react';

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [ingestionResult, setIngestionResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      processFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      processFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        // Simulate parsing logic for JSON files
        const parsedContent = JSON.parse(content);
        setIngestionResult(`Processed file: ${file.name}\nParsed content:\n${JSON.stringify(parsedContent, null, 2)}`);
        setError(null);
      } catch (err) {
        setError('Failed to parse file as JSON');
        setIngestionResult(null);
      }
    };
    reader.onerror = () => {
      setError('Failed to read file');
      setIngestionResult(null);
    };
    reader.readAsText(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="app">
      <h1>Log Summarizer</h1>

      <div
        className="file-drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={triggerFileSelect}
      >
        <p>Drag & drop a file here or click to select</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {file && (
        <div className="file-info">
          <p>Selected file: {file.name}</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      )}

      {ingestionResult && (
        <div className="ingestion-result">
          <h2>Ingestion Result</h2>
          {ingestionResult}
       </div>
     )}
   </div>
 );
};

export default App;