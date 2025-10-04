import React, { useState, useRef } from 'react';

interface FileData {
  name: string;
  size: number;
  content: string | null;
}

const App = () => {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Validate file type (e.g., .log files)
    if (!file.name.endsWith('.log')) {
      setError('Only .log files are allowed.');
      return;
    }

    // Validate file size (e.g., max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds the limit of 10MB.');
      return;
    }

    setError(null);
    setIsProcessing(true);

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;

      setSelectedFile({
        name: file.name,
        size: file.size,
        content: content || null
      });

      setIsProcessing(false);
    };

    reader.onerror = () => {
      setError('Failed to read file.');
      setIsProcessing(false);
    };

    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];

    if (file) {
      const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(event);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Log Summarizer</h1>

        <div
          className="file-drop-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".log"
            style={{ display: 'none' }}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="file-picker-button"
          >
            Choose Log File
          </button>

          {selectedFile && (
            <div className="file-info">
              <p>Selected file: {selectedFile.name}</p>
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
          )}

          {isProcessing && <p>Processing file...</p>}

          {error && <p className="error">{error}</p>}

          {selectedFile && selectedFile.content && (
            <div className="file-content">
              <h2>File Content Preview:</h2>
              <pre>{selectedFile.content.substring(0, 500)}...</pre>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default App;

  const handleIngest = () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    if (selectedFile.type !== 'application/json') {
      setError('Please select a valid JSON file');
      return;
    }

    setIngestionStatus('Processing...');

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const parsedData = JSON.parse(content);

        // Simulate processing and summary generation
        const summary: LogSummary = {
          totalLines: parsedData.lines?.length || 0,
          errorCount: parsedData.errors?.length || 0,
          warningCount: parsedData.warnings?.length || 0,
        };

        setLogSummary(summary);
        setIngestionStatus('Ingested successfully');
      };

      reader.onerror = () => {
        setError('Failed to read file');
        setIngestionStatus('');
      };

      reader.readAsText(selectedFile);
    } catch (err) {
      setError('Error processing file: ' + (err as Error).message);
      setIngestionStatus('');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setIngestionStatus('');
    setLogSummary(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="app">
      <h1>Log Summarizer</h1>

      <div className="file-picker">
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <button onClick={handleIngest} disabled={!selectedFile}>
          Ingest File
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {ingestionStatus && (
        <div className="status">
          <p>{ingestionStatus}</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      )}

      {logSummary && (
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
        </div>
      )}
    </div>
  );
};

export default App;
