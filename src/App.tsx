import { App } from './App';
import { normalizeLogEvent } from './utils/logEventNormalizer';

function App() {
  return (
  const [ingestionResult, setIngestionResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
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

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setIngestionResult(`Processed file: ${file.name}\nContent preview:\n${content.substring(0, 200)}...`);
    };
    reader.readAsText(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="app">
      <h1>Log Summarizer</h1>

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
          <pre>{ingestionResult}</pre>
        </div>
      )}
    </div>
  );
};

export default App;

