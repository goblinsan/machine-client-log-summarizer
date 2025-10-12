import React, { useState, useEffect } from 'react';

import { processLogFiles } from './ingest/fileIngest';

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

function App() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        // For demo purposes, we'll simulate loading log files
        const filePaths = ['mock-log-file.json'];
        const entries = await processLogFiles(filePaths);
        setLogEntries(entries);
      } catch (error) {
        console.error('Failed to process log files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogData();
  }, []);

  if (loading) {
    return <div>Loading log data...</div>;
  }

  return (
    <div className="app">
      <h1>Machine Client Log Summarizer</h1>
      <div className="log-entries">
        {logEntries.map((entry, index) => (
          <div key={index} className="log-entry">
            <span className={`level-${entry.level.toLowerCase()}`}>{entry.level}</span>
            <span className="timestamp">{new Date(entry.timestamp).toLocaleString()}</span>
            <p className="message">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

// Mock log file content for testing
const mockLogContent = `[
  {
    "timestamp": "2023-01-01T00:00:00Z",
    "level": "INFO",
    "message": "Application started successfully"
  },
  {
    "timestamp": "2023-01-01T00:01:00Z",
    "level": "ERROR",
    "message": "Failed to connect to database"
  }
]`;

// This would normally be read from actual files
// For now, we're simulating the file reading process
const mockLogFiles = {
  'mock-log-file.json': mockLogContent
};