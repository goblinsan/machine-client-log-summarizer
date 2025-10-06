import React from 'react';
import { parseJsonFile } from './ingest/fileIngest';
import './styles.css';

const App: React.FC = () => {
  const handleFileIngestion = async () => {
    try {
      const result = await parseJsonFile('sample.json');
      console.log('Parsed file:', result);
    } catch (error) {
      console.error('Failed to parse JSON file:', error);
    }
  };

  return (
    <div className="app">
      <h1>Log Summarizer</h1>
      <p>Welcome to the log summarizer app.</p>
      <button onClick={handleFileIngestion}>Parse JSON</button>
    </div>
  );
};
