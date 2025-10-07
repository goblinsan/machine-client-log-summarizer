import React, { useState } from 'react';
import './styles.css';

import { parseJsonFile } from './ingest/fileIngest';

interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

const App = () => {
  const [logs, setLogs] = useState<LogRecord[]>([]);

  const handleParseFile = () => {
    // Mock file content for demonstration
    const mockFileContent = JSON.stringify([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Application started',
      },
      {
        timestamp: '2023-01-01T00:01:00Z',
        level: 'ERROR',
        message: 'Failed to connect to database',
      },
    ]);

    const parsedLogs = parseJsonFile(mockFileContent);
    setLogs(parsedLogs);
  };

  return (
    <div className="app">
      <h1>Log Summarizer</h1>
      <button onClick={handleParseFile}>Parse Logs</button>
      <div className="logs">
        {logs.map((log, index) => (
          <div key={index} className="log-entry">
            <span className="timestamp">{log.timestamp}</span>
            <span className="level">{log.level}</span>
            <span className="message">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
