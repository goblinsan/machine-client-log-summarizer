import { createRoot } from 'react-dom/client';
import { normalizeLogEvent } from './utils/logEventNormalizer';

import './styles/main.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
    <div className="app">
      <header>
        <h1>Multi-Agent Log Summarizer</h1>
        <div className="path-info">
          <span>Windows Path: {normalizedWindowsPath || 'N/A'}</span>
          <span>Repo URL: {normalizedRepoUrl || 'N/A'}</span>
        </div>
      </header>
      <main>
        <div className="log-container">
