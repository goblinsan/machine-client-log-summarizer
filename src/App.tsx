import React, { useState, useRef } from 'react';
import { marked } from 'marked';

// Define the expected structure of a log entry
interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

// Define the structure of a log file (array of log entries)
interface LogFile {
  logs: LogEntry[];
}

const App: React.FC = () => {
  const [logContent, setLogContent] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setLogContent(content);
    };
    reader.readAsText(file);
  };

  const handleProcessLogs = () => {
    if (!logContent) return;

    setIsProcessing(true);

    // Simulate processing and summarization
    setTimeout(() => {
      const processedContent = logContent
        .split('\n')
        .filter(line => line.trim() !== '')
        .map((line, index) => ({
          timestamp: new Date().toISOString(),
          level: 'INFO',
          message: `Processed line ${index + 1}: ${line.substring(0, 50)}...`
        }));

      const summaryText = `Summary of ${processedContent.length} log entries processed.`;
      setSummary(summaryText);
      setIsProcessing(false);
    }, 1000);
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="app">
      <h1>Log Summarizer</h1>
      <div className="file-picker">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          style={{ display: 'none' }}
        />
        <button onClick={handleFileSelect} className="file-button">
          Select Log File
        </button>
      </div>

      {logContent && (
        <div className="log-preview">
          <h2>Log Preview</h2>
          <pre>{logContent.substring(0, 500)}...</pre>
        </div>
      )}

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
