import FilePicker from './FilePicker';
import IngestionPipeline from './IngestionPipeline';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Log Summarizer</h1>
      <FilePicker />
      <IngestionPipeline />
    </div>
  );
};

