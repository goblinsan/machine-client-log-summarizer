import { useState, useEffect } from 'react';
import './styles/main.scss';
import { config } from './config';
import { LogEvent } from './types';

function App() {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
  const [logs, setLogs] = useState<LogEvent[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [config, setConfig] = useState(config);

  useEffect(() => {
    setConfig(config);
  }, []);

  const handleProcessLogs = async () => {
    setIsProcessing(true);
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
      const content = e.target?.result as string;
      setIngestionResult(`Processed file: ${file.name}\nContent preview:\n${content.substring(0, 200)}...`);
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

      {ingestionResult && (
        <div className="ingestion-result">
          <h2>Ingestion Result</h2>
          <pre>{ingestionResult}</pre>
        </div>
      )}
    </div>
  );
};

export default App;

