# Project Plan: machine-client-log-summarizer

Repository: https://github.com/goblinsan/machine-client-log-summarizer.git

Overview
--------
Build a local dashboard that ingests JSON log files (from a local running process), summarizes history using a local model (via LM Studio), and displays raw logs as collapsible JSON blocks. The dashboard will be a Vite + React + TypeScript app running locally.

High-level Goals
- Ingest JSON log files from disk and from a local process stream.
- Send log history to a local model hosted in LM Studio for summarization.
- Display summaries and raw logs (collapsible, pretty-printed JSON).
- Provide a small settings UI to configure LM Studio endpoint and ingestion options.
- Automated tests and CI for build and basic end-to-end checks.

Milestones & Tasks
------------------

1) MVP - Local ingestion + UI
  - Tasks:
    - Add file picker and local-file ingestion pipeline
    - Implement a streaming reader for a running process (tail-like)
    - Render logs in a scrollable list with collapsible pretty JSON blocks
    - Basic summary UI that shows a placeholder until model is connected

2) Model integration (LM Studio)
  - Tasks:
    - Add settings to configure LM Studio host and model id (default localhost)
    - Implement an adapter to call local LM Studio HTTP API to summarize logs
    - Implement batching/rolling-window summarization of log history
    - Cache summaries and display generated_at timestamps

3) UX polish & features
  - Tasks:
    - Add search/filter for logs (level, text, time)
    - Add download/export of summaries and extracted events
    - Add collapsible sections, copy-to-clipboard, and compact/expanded views

4) Testing & Deployment
  - Tasks:
    - Unit tests for parser and UI components
    - E2E smoke test to ensure ingest -> summarize flow works with a mock model
    - CI pipeline: install, typecheck, build

Acceptance Criteria
- Able to load a local JSON log file and view pretty JSON blocks.
- Able to point to a running LM Studio instance and get back a text summary for a chosen time-window of logs.
- Summary UI shows generated_at and the logs can be expanded/collapsed.

Notes about LM Studio integration
- LM Studio typically exposes a local HTTP API (adjust host/port per your LM Studio configuration). The adapter should be simple POST requests that forward a prompt plus a chunk of logs and return the model response text.

Security & Local-only defaults
- By default the dashboard will only access localhost endpoints and local files. Settings to connect external endpoints should be explicit.

Estimated timeline (small team / solo): 2-3 weeks for a solid MVP, 4-6 weeks for polished version with tests and CI.
