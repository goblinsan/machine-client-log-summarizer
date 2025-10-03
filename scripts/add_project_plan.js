#!/usr/bin/env node
/*
Simple script to POST a Project to the local MADB API (openapi.yml describes localhost:8080)
Creates a project named 'machine-client-log-summarizer' and a couple of example milestones/tasks.

Usage: node scripts/add_project_plan.js [--api http://localhost:8080]
*/

// Prefer the global fetch (Node 18+). Fall back to node-fetch if not present.
const fetch = globalThis.fetch
  ? globalThis.fetch.bind(globalThis)
  : (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const API_DEFAULT = 'http://localhost:8080';

async function main() {
  const apiBase = getArg('--api') || API_DEFAULT;

  const projectPayload = {
    name: 'machine-client-log-summarizer',
    goal: 'Dashboard to ingest local JSON logs and summarize history using a local LM Studio model',
    direction: 'Build local-first UI, ingestion, and LM Studio integration',
    repository: 'https://github.com/goblinsan/machine-client-log-summarizer.git'
  };

  console.log('Creating project at', apiBase + '/v1/projects');
  const projectResp = await fetch(`${apiBase}/v1/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectPayload)
  });

  if (!projectResp.ok) {
    console.error('Failed to create project', projectResp.status, await projectResp.text());
    process.exit(1);
  }

  const project = await projectResp.json();
  console.log('Created project:', project.id || project.name || JSON.stringify(project));

  // Create an example milestone
  const milestonePayload = {
    project_id: project.id,
    name: 'MVP - Local ingestion + UI',
    description: 'Implement file ingestion, stream reader, and collapsible JSON UI',
    status: 'not_started'
  };

  const msResp = await fetch(`${apiBase}/v1/milestones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(milestonePayload)
  });

  if (!msResp.ok) {
    console.error('Failed to create milestone', msResp.status, await msResp.text());
    process.exit(1);
  }
  const milestone = await msResp.json();
  console.log('Created milestone:', milestone.id || milestone.name || JSON.stringify(milestone));

  // Create a sample task under the milestone
  const taskPayload = {
    milestone_id: milestone.id,
    title: 'Add file picker and local ingestion pipeline',
    description: 'Implement a file upload and parsing flow that accepts JSON logs',
    effort_estimate: 4
  };

  const taskResp = await fetch(`${apiBase}/v1/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskPayload)
  });

  if (!taskResp.ok) {
    console.error('Failed to create task', taskResp.status, await taskResp.text());
    process.exit(1);
  }

  const task = await taskResp.json();
  console.log('Created task:', task.id || task.title || JSON.stringify(task));

  console.log('\nDone.');
}

function getArg(name) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return null;
  return process.argv[idx+1] || null;
}

main().catch(err => { console.error(err); process.exit(1) });
