import React, { useState, useRef } from 'react';
import './styles.css';

interface LogSummary {
  totalLines: number;
  errorCount: number;
  warningCount: number;
}

const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ingestionStatus, setIngestionStatus] = useState<string>('');
  const [logSummary, setLogSummary] = useState<LogSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIngestionStatus('Selected file: ' + file.name);
      setError(null);
    }
  };

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
