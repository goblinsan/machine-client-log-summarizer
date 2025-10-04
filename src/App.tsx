import React, { useState } from 'react';
import { marked } from 'marked';

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSummary(null);
    }
  };

  const handleProcess = () => {
    if (file) {
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => {
        setSummary('Sample summary of log file content...');
        setIsProcessing(false);
      }, 1000);
    }
  };

  return (
    <div className="app">
      <h1>Log Summarizer</h1>
      <input type="file" accept=".json" onChange={handleFileChange} />
      {file && (
        <button onClick={handleProcess} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Summarize'}
        </button>
      )}
      {summary && <div className="summary">{summary}</div>}
    </div>
  );
};

export default App;
