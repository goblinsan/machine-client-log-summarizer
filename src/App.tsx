import React, { useState } from 'react';

const App = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const parsedLogs = JSON.parse(content);
          setLogs(parsedLogs);
        } catch (error) {
          console.error('Failed to parse logs:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="app">
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <div className="logs">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
