import { PathData, normalizeWindowsPath, normalizeRepoUrl, isWindowsPath, isRepoUrl } from '../types/pathData';

export function extractPathsFromMeta(meta: Record<string, unknown>): PathData {

  const paths: PathData = {};

  // Extract file paths from various meta fields
  const pathFields = ['filePath', 'file_path', 'path', 'file', 'sourceFile', 'targetFile'];

  for (const field of pathFields) {
    const value = meta[field];
    if (typeof value === 'string') {
      if (isWindowsPath(value)) {
        paths.windowsPath = value;
        paths.normalizedWindowsPath = normalizeWindowsPath(value);
      }
    }
  }

  // Extract repo URLs from various meta fields
  const urlFields = ['repoUrl', 'repo_url', 'repository', 'sourceUrl', 'targetUrl', 'gitUrl'];

  for (const field of urlFields) {
    const value = meta[field];
    if (typeof value === 'string') {
      if (isRepoUrl(value)) {
        paths.repoUrl = value;
        paths.normalizedRepoUrl = normalizeRepoUrl(value);
      }
    }
  }

  // Also check for nested objects that might contain paths
  if (meta.file && typeof meta.file === 'object') {
    const file = meta.file as Record<string, unknown>;
    if (file.path && typeof file.path === 'string') {
      if (isWindowsPath(file.path)) {
        paths.windowsPath = file.path;
        paths.normalizedWindowsPath = normalizeWindowsPath(file.path);
      }
    }
    if (file.repo && typeof file.repo === 'string') {
      if (isRepoUrl(file.repo)) {
        paths.repoUrl = file.repo;
        paths.normalizedRepoUrl = normalizeRepoUrl(file.repo);
      }
    }
  }

  return paths;
}

export function extractPathsFromMessage(message: Record<string, unknown>): PathData {
  const meta = message.meta || {};
  return extractPathsFromMeta(meta);
}

export function extractPathsFromLog(log: Record<string, unknown>): PathData {
  const meta = log.meta || {};
  return extractPathsFromMeta(meta);
}
