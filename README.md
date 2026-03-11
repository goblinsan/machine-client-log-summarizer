# Sample Data Packs

Curated synthetic log runs for demos, tests, and documentation.

## Usage

```typescript
import { ok, flaky, fail, timeout, allEntries } from './src/config/data-packs/synthetic-log-runs';

// Use for demos
console.log(ok[0]);

// Use for tests
describe('flaky scenarios', () => {
  flaky.forEach((log) => {
    // test logic
  });
});

// Use for docs
console.log(allEntries);
```

## Data Structure

Each log entry includes:
- `status`: 'ok' | 'flaky' | 'fail' | 'timeout'
- `persona`: agent persona (coordinator, lead-engineer, context, qa, security)
- `workflowId`: unique workflow identifier
- `intent`: operation intent
- `timestamp`: ISO timestamp
- `durationMs`: optional duration in milliseconds
- `error`: optional error message

---