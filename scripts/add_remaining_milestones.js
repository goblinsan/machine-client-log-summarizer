#!/usr/bin/env node
/*
Create Milestones 2,3,4 and related tasks for an existing project in the MADB API.

Usage: node scripts/add_remaining_milestones.js [--api http://localhost:8080] [--project-id <id>]
If --project-id is omitted, defaults to the provided id in the task: 1808e304-fc52-49f6-9a42-71044b4cb4b5
*/

const fetch = globalThis.fetch
  ? globalThis.fetch.bind(globalThis)
  : (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const API_DEFAULT = 'http://localhost:8080';
const DEFAULT_PROJECT_ID = '1808e304-fc52-49f6-9a42-71044b4cb4b5';

function getArg(name) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return null;
  return process.argv[idx + 1] || null;
}

async function postJson(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text}`);
  }
  return res.json();
}

async function createMilestone(apiBase, projectId, milestone) {
  const payload = {
    project_id: projectId,
    name: milestone.name,
    description: milestone.description || null,
    status: milestone.status || 'not_started'
  };
  return postJson(`${apiBase}/v1/milestones`, payload);
}

async function createTask(apiBase, task) {
  // TaskCreate requires milestone_id and title
  const payload = {
    milestone_id: task.milestone_id,
    title: task.title,
    description: task.description || null,
    effort_estimate: task.effort_estimate || 0
  };
  return postJson(`${apiBase}/v1/tasks`, payload);
}

async function main() {
  const apiBase = getArg('--api') || API_DEFAULT;
  const projectId = getArg('--project-id') || DEFAULT_PROJECT_ID;

  console.log(`Using API: ${apiBase}`);
  console.log(`Project ID: ${projectId}`);

  const milestones = [
    {
      key: 'model-integration',
      name: 'Model integration (LM Studio)',
      description: 'Integrate with LM Studio: settings, adapter, batching, and caching',
      tasks: [
        { title: 'Add settings to configure LM Studio host and model id', description: 'Settings UI and persisted config for LM Studio endpoint and model id' },
        { title: 'Implement an adapter to call local LM Studio HTTP API to summarize logs', description: 'HTTP client adapter to call LM Studio with prompt + logs and return a text summary' },
        { title: 'Implement batching/rolling-window summarization of log history', description: 'Chunk logs into windows and summarize periodically or on demand' },
        { title: 'Cache summaries and display generated_at timestamps', description: 'Store last summaries per window and show generated_at in UI' }
      ]
    },
    {
      key: 'ux-polish',
      name: 'UX polish & features',
      description: 'Search, export, and UI improvements for logs and summaries',
      tasks: [
        { title: 'Add search/filter for logs (level, text, time)', description: 'Client-side filtering and optional server-side search index' },
        { title: 'Add download/export of summaries and extracted events', description: 'Export JSON or text summaries for sharing' },
        { title: 'Add collapsible sections, copy-to-clipboard, and compact/expanded views', description: 'UX components for manipulating and copying log entries and summaries' }
      ]
    },
    {
      key: 'testing-deploy',
      name: 'Testing & Deployment',
      description: 'Add tests and CI for the project',
      tasks: [
        { title: 'Unit tests for parser and UI components', description: 'Jest/Testing Library tests for parsing logic and React components' },
        { title: 'E2E smoke test to ensure ingest -> summarize flow works with a mock model', description: 'Playwright or Cypress test against a mock LM Studio' },
        { title: 'CI pipeline: install, typecheck, build', description: 'GitHub Actions that run install, typecheck, build and basic tests' }
      ]
    }
  ];

  for (const m of milestones) {
    try {
      console.log('\nCreating milestone:', m.name);
      const createdMs = await createMilestone(apiBase, projectId, m);
      const milestoneId = createdMs.id || createdMs;
      console.log(' -> Milestone created with id:', milestoneId);

      for (const t of m.tasks) {
        try {
          const taskPayload = { ...t, milestone_id: milestoneId };
          const createdTask = await createTask(apiBase, taskPayload);
          const taskId = createdTask.id || createdTask;
          console.log(`   - Task created: ${t.title} (id: ${taskId})`);
        } catch (err) {
          console.error('   ! Failed to create task', t.title, err.message || err);
        }
      }
    } catch (err) {
      console.error('! Failed to create milestone', m.name, err.message || err);
    }
  }

  console.log('\nAll done.');
}

main().catch(err => { console.error(err); process.exit(1); });
