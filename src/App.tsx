import React, { useState, useRef } from 'react';
import { marked } from 'marked';
const App: React.FC = () => {
  const [logContent, setLogContent] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Validate file type
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError('Please select a valid JSON file.');
      return;
    }

    // Clear previous error
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setLogContent(content);
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

    setIsProcessing(true);
    // Simulate processing and summarization
    setTimeout(() => {
      let processedContent = [];

      try {
        const parsedLogs = JSON.parse(logContent);
        if (Array.isArray(parsedLogs)) {
          processedContent = parsedLogs.map((entry: any, index: number) => ({
            timestamp: entry.timestamp || new Date().toISOString(),
            level: entry.level || 'INFO',
            message: entry.message || `Processed entry ${index + 1}`
          }));
        } else {
          processedContent = [{
            timestamp: new Date().toISOString(),
            level: 'INFO',
            message: `Processed ${Object.keys(parsedLogs).length} entries`
          }];
        }
      } catch (e) {
        setError('Failed to parse log content.');
        setIsProcessing(false);
        return;
      }

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
  const handleClear = () => {
    setLogContent('');
    setSummary('');
    setError(null);
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
        {error && <div className="error">{error}</div>}
      </div>
      {logContent && (
        <div className="log-preview">
          <h2>Log Preview</h2>
          <pre>{logContent.substring(0, 500)}...</pre>
          <button onClick={handleClear} className="clear-button">Clear</button>
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
