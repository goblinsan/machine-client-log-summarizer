# Machine Client Log Summarizer

## Testing

Run `npm test` to execute the Vitest test harness.

## Installation
1. **CLI arguments** (highest priority)
2. **Config file** (`src/config.json`)
3. **Environment variables**
4. **Default values** (lowest priority)

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

#### Logging

| Variable | Description | Default |
|----------|-------------|---------|
| `LOG_PATH` | Directory for log files | `./logs` |
| `LOG_LEVEL` | Log level (debug, info, warn, error) | `info` |
| `TIMEOUT` | Request timeout in milliseconds | `30000` |

#### Storage

| Variable | Description | Default |
|----------|-------------|---------|
| `STORE_PATH` | Directory for data storage | `./data` |
| `STORE_TYPE` | Storage type (json, sqlite, mongodb) | `json` |

#### LM Studio

| Variable | Description | Default |
|----------|-------------|---------|
| `LM_STUDIO_ENDPOINT` | LM Studio API endpoint | `http://localhost:1234/v1` |

#### Application

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_NAME` | Application name | `Multi-Agent Log Summarizer` |
| `VERSION` | Application version | `1.0.0` |

#### Processing

| Variable | Description | Default |
|----------|-------------|---------|
| `BATCH_SIZE` | Number of logs to process per batch | `10` |
| `MAX_RETRIES` | Maximum retry attempts | `3` |

#### Environment Mode

| Variable | Description | Default |
|----------|-------------|---------|
| `ENV` | Environment mode (development, production, test) | `development` |

#### Features

| Variable | Description | Default |
|----------|-------------|---------|
| `ENABLE_STREAMING` | Enable streaming responses | `true` |
| `ENABLE_CACHE` | Enable caching | `true` |

#### Security

| Variable | Description | Default |
|----------|-------------|---------|
| `ALLOW_CORS` | Allow CORS requests | `true` |
| `CORS_ORIGINS` | Allowed CORS origins (`*` or comma-separated) | `*` |

### CLI Arguments

Use `--` prefix for CLI arguments:

```bash
npx ts-node src/main.tsx --log-level=debug --log-path=/var/log
```

### Config File

Create `src/config.json` for persistent configuration:

```json
{
  "logPath": "./logs",
  "logLevel": "info",
  "timeout": 30000,
  "storePath": "./data",
  "storeType": "json",
  "lmStudioEndpoint": "http://localhost:1234/v1",
  "appName": "Multi-Agent Log Summarizer",
  "version": "1.0.0",
  "batchSize": 10,
  "maxRetries": 3,
  "env": "development",
  "enableStreaming": true,
  "enableCache": true,
  "allowCors": true,
  "corsOrigins": "*"
}
```
