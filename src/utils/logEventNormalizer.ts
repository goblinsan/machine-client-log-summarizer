import { extractPathsFromMeta, extractPathsFromMessage, extractPathsFromLog } from './pathExtractor';

export interface NormalizedLogEvent {
  timestamp: string;
  level: string;
  message: string;
  meta: Record<string, unknown>;
  paths: Record<string, unknown>;
}

export function normalizeLogEvent(event: Record<string, unknown>): NormalizedLogEvent {
  const meta = event.meta || {};
  const paths = extractPathsFromMeta(meta);

  return {
    timestamp: event.timestamp || new Date().toISOString(),
    level: event.level || 'info',
    message: event.message || '',
    meta: meta,
    paths: {
      windowsPath: paths.windowsPath,
      normalizedWindowsPath: paths.normalizedWindowsPath,
      repoUrl: paths.repoUrl,
      normalizedRepoUrl: paths.normalizedRepoUrl,
    },
  };
}

export function normalizeMessage(message: Record<string, unknown>): NormalizedLogEvent {
  const paths = extractPathsFromMessage(message);

  return {
    timestamp: message.timestamp || new Date().toISOString(),
    level: message.level || 'info',
    message: message.message || '',
    meta: message.meta || {},
    paths: {
      windowsPath: paths.windowsPath,
      normalizedWindowsPath: paths.normalizedWindowsPath,
      repoUrl: paths.repoUrl,
      normalizedRepoUrl: paths.normalizedRepoUrl,
    },
  };
}