import React, { useState } from 'react';
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
