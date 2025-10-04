import React, { useState, useRef } from 'react';
import './styles.css';
const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setStatus('');
  };

  const handleIngestion = () => {
    if (!file) {
      setStatus('Please select a file first.');
      return;
    }

    setIsProcessing(true);
    setStatus('Processing file...');

    // Simulate ingestion logic
    setTimeout(() => {
      setIsProcessing(false);
      setStatus(`Processed ${file.name}`);
    }, 2000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="app">
      <h1>Log Summarizer</h1>

      <div className="file-picker-container">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="file-input"
          accept=".log,.txt"
        />
        <button onClick={triggerFileInput} className="file-picker-button">
          Choose File
        </button>
      </div>

      {file && (
        <div className="file-info">
          <p>Selected file: {file.name}</p>
        </div>
      )}

      <button
        onClick={handleIngestion}
        disabled={isProcessing}
        className="ingestion-button"
      >
        {isProcessing ? 'Processing...' : 'Ingest File'}
      </button>

      {status && <p className="status">{status}</p>}
    </div>
  );
};
export default App;
