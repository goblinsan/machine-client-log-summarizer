import { processLogFile } from './ingestion';
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const result = await processLogFile(selectedFile);
      setSummary(result);
    } catch (error) {
      console.error('Error processing file:', error);
      setSummary('Error processing file');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="app">
      <h1>Log Summarizer</h1>

      <div className="file-picker">
        <label htmlFor="fileInput">Choose a log file:</label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
        />

        {selectedFile && (
          <p>Selected file: {selectedFile.name}</p>
        )}

        <button
          onClick={handleProcess}
          disabled={!selectedFile || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Process Log'}
        </button>
      </div>

      {summary && (
        <div className="summary">
          <h2>Summary:</h2>
          <pre>{summary}</pre>
        </div>
      )}
    </div>
  );
