# Machine Client Log Summarizer

## Testing

Run tests locally:

```bash
npm test
```

Tests are run with Vitest and can be executed before code reviews.

## Installation




```bash
npm test
```

CI will run `npm test` before code reviews.

## Getting Started

|----------|-------------|---------|
| LOG_PATH | Path to log files | /var/log/machine-client |
| STORE_PATH | Path to store data | /var/store/machine-client |
| LM_STUDIO_ENDPOINT | LM Studio API endpoint | http://localhost:1234/v1 |

### Config File

Create a `config.json` file in the project root to override defaults:

```json
{
  "logPath": "/custom/logs",
  "storePath": "/custom/store"
}
```

### CLI Arguments

Override config with CLI flags:

```bash
node dist/index.js --log-path /custom/logs --store-path /custom/store
```

## Getting Started

```bash
npm install
npm run dev
```

## License

MIT

## License

MIT

Run tests locally:

```bash
npm test
```

Tests are run with Vitest in jsdom environment. CI will run the same command.

## Development

```bash
npm run dev
```

## Building

```bash
npm run build
```

## License

MIT
```bash
npm run dev
```

## Testing

```bash
npm test
```

## Building

```bash
npm run build
```

## CI/CD

Tests run automatically before code reviews via `npm test`.




