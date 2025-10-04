/* eslint-disable no-console */

/* eslint-disable no-console */
import React, { useState, useRef } from 'react';
import { marked } from 'marked';

// Define types for log entries
interface LogEntry {
  timestamp?: string;
  level?: string;
  message?: string;
}

// Define types for log entries
const App: React.FC = () => {
  const [logContent, setLogContent] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    // Validate file type
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError('Please select a valid JSON file.');
      return;
    }

    setIsFileSelected(true);

    // Clear previous error
    setError(null);

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      setLogContent(content);

      // Parse and store log entries
      try {
        const parsedLogs = JSON.parse(content);

        let entries: LogEntry[] = [];

        if (Array.isArray(parsedLogs)) {
          entries = parsedLogs.map((entry: any, index: number) => ({
            timestamp: entry.timestamp || new Date().toISOString(),
            level: entry.level || 'INFO',
            message: entry.message || `Processed entry ${index + 1}`
          }));
        } else {
          entries = [{
            timestamp: new Date().toISOString(),
            level: 'INFO',
            message: `Processed ${Object.keys(parsedLogs).length} entries`
          }];
        }

        setLogEntries(entries);
      } catch (e) {
        setError('Failed to parse log content.');
        setLogEntries([]);
      }
    };

    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
    };

    reader.readAsText(file);
  };

  const handleProcessLogs = () => {
    if (!logContent) return;

    // Validate content is valid JSON
    try {
      JSON.parse(logContent);
    } catch (e) {
      setError('Invalid JSON content. Please check your file.');
      return;
    }

    // Reset any previous summary
    setSummary('');
    setIsProcessing(true);

    // Simulate processing and summarization
    setTimeout(() => {
      // Format summary with markdown
      const summaryText = `Summary of ${logEntries.length} log entries processed from file "${fileName}".`;
      setSummary(summaryText);
      setIsProcessing(false);
    }, 1000);
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClear = () => {
    setLogContent('');
    setSummary('');
    setError(null);
    setIsFileSelected(false);
    setFileName('');
    setLogEntries([]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];
      const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(event);
    }

    setIsDragging(false);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDropAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Add test to verify file parsing logic
  const testFileParsing = () => {
    // Mock data for testing
    const mockLogData = [
      { timestamp: "2023-01-01T00:00:00Z", level: "INFO", message: "Application started" },
      { timestamp: "2023-01-01T00:01:00Z", level: "ERROR", message: "Database connection failed" }
    ];

    const mockContent = JSON.stringify(mockLogData);
    setLogContent(mockContent);

    try {
      const parsedLogs = JSON.parse(mockContent);

      let entries: LogEntry[] = [];

      if (Array.isArray(parsedLogs)) {
        entries = parsedLogs.map((entry: any, index: number) => ({
          timestamp: entry.timestamp || new Date().toISOString(),
          level: entry.level || 'INFO',
          message: entry.message || `Processed entry ${index + 1}`
        }));
      } else {
        entries = [{
          timestamp: new Date().toISOString(),
          level: 'INFO',
          message: `Processed ${Object.keys(parsedLogs).length} entries`
        }];
      }

      setLogEntries(entries);
      return true;
    } catch (e) {
      setError('Failed to parse mock log content.');
      setLogEntries([]);
      return false;
    }
  };

  return (
    <div className="app">
      <h1>Log Summarizer</h1>

      <div
        className="file-picker"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          style={{ display: 'none' }}
        />

        <div
          onClick={handleDropAreaClick}
          className="drop-area"
          style={isDragging ? { backgroundColor: 'rgba(96, 165, 250, 0.2)' } : undefined}
        >

          <button onClick={handleFileSelect} className="file-button">
            Select Log File
          </button>

        </div>

        {fileName && (
          <div className="file-info">
            Selected file: <strong>{fileName}</strong>
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>

      <div className="file-drop-hint">
        Or drag and drop a JSON file here
      </div>

      {logContent && !isProcessing && (
        <div className="log-preview">
          <h2>Log Preview</h2>

          <pre>{logContent.length > 500 ? logContent.substring(0, 500) + '...' : logContent}</pre>

          <button onClick={handleClear} className="clear-button">Clear</button>
        </div>
      )}

      <div className="test-section">
        <h3>Test Section</h3>

        <button onClick={testFileParsing} className="test-button">
          Run Test
        </button>
      </div>

      <button
        onClick={handleProcessLogs}
        disabled={!logContent || isProcessing}
        className="process-button"
      >

        {isProcessing ? 'Processing...' : 'Process Logs'}
      </button>

      {summary && (
        <div className="summary">
          <h2>Summary</h2>

          <div dangerouslySetInnerHTML={{ __html: marked(summary) }} />
        </div>
      )}

    </div>
  );
};

export default App;
