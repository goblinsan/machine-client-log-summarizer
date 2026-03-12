import React, { useState, useRef } from 'react';
import { App } from './App';
import { normalizeLogEvent } from './utils/logEventNormalizer';
import { computeHash, isDuplicate, markSeen, getSeenCount } from './utils/hash';
import { HashRecord, PreviewParseResult } from './types';
import { deduplicationTracker } from './utils/dedup';

function App() {
  const [file, setFile] = useState<File | null>(null);
import { HashRecord, PreviewParseResult } from './types';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [ingestionResult, setIngestionResult] = useState<string | null>(null);
  const [dedupStats, setDedupStats] = useState({
    totalRecords: 0,
    uniqueRecords: 0,
    duplicateRecords: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      processFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
      const lines = content.split('\n').filter(line => line.trim());
      let totalRecords = 0;
      let uniqueRecords = 0;
      let duplicateRecords = 0;

      lines.forEach((line) => {
        try {
          const parsed = JSON.parse(line);
          const hashInput: HashRecord = {
            ts: parsed.ts,
            msg: parsed.msg,
            persona: parsed.persona,
            workflowId: parsed.workflowId,
            corrId: parsed.corrId,
            preview_raw: parsed.preview_raw,
          };

          const { isDuplicate, hash } = deduplicationTracker.processRecord(hashInput);
          totalRecords++;

          if (isDuplicate) {
            duplicateRecords++;
          } else {
            uniqueRecords++;
          }
        } catch (err) {
          // Skip invalid JSON lines
        }

      lines.forEach((line) => {
        try {
          const parsed = JSON.parse(line);
          const hashInput: HashRecord = {
            ts: parsed.ts,
            msg: parsed.msg,
      setDedupStats({
        totalRecords,
        uniqueRecords,
        duplicateRecords,
      });

      setIngestionResult(
          const hash = computeHash(hashInput);
        `Total records: ${totalRecords}\n` +
        `Unique records: ${uniqueRecords}\n` +
        `Duplicate records: ${duplicateRecords}\n` +
        `Deduplication ratio: ${(duplicateRecords / totalRecords * 100).toFixed(1)}%`
      );
    };
    reader.readAsText(file);
            uniqueRecords++;
          }
        } catch (err) {
          // Skip invalid JSON lines
        }
        <h1>Multi-Agent Log Summarizer</h1>
        <div className="path-info">
          <span>Windows Path: {normalizedWindowsPath || 'N/A'}</span>
          <span>Repo URL: {normalizedRepoUrl || 'N/A'}</span>
        </div>
      </header>
      <main>
      });

      setIngestionResult(
        `Processed file: ${file.name}\n` +
        `Total records: ${totalRecords}\n` +
        `Unique records: ${uniqueRecords}\n` +
        `Duplicate records: ${duplicateRecords}\n` +
        `Deduplication ratio: ${(duplicateRecords / totalRecords * 100).toFixed(1)}%`
      );
    };
    reader.readAsText(file);
  };
          {dedupStats.totalRecords > 0 && (
            <div className="dedup-stats">
              <h2>Deduplication Statistics</h2>
              <p>Total: {dedupStats.totalRecords}</p>
              <p>Unique: {dedupStats.uniqueRecords}</p>
              <p>Duplicates: {dedupStats.duplicateRecords}</p>
            </div>
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
          <div
            className="file-drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={triggerFileSelect}
          >
            <p>Drag & drop a file here or click to select</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {file && (
            <div className="file-info">
              <p>Selected file: {file.name}</p>
            </div>
          )}

          {ingestionResult && (
            <div className="ingestion-result">
              <h2>Ingestion Result</h2>
              {ingestionResult}
            </div>
          )}

          {dedupStats.totalRecords > 0 && (
            <div className="dedup-stats">
              <h2>Deduplication Statistics</h2>
              <p>Total: {dedupStats.totalRecords}</p>
              <p>Unique: {dedupStats.uniqueRecords}</p>
              <p>Duplicates: {dedupStats.duplicateRecords}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
