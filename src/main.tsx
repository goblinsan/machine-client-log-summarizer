import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.scss';
import { loadConfig } from './config/loader';
import { parseCliArgs } from './config/cli';

// Parse CLI arguments
const cliArgs = parseCliArgs(process.argv.slice(2));
const config = loadConfig(cliArgs);

// Export config for use in App
export { config };

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
  document.getElementById('root') as HTMLElement
);
root.render(<App />);

