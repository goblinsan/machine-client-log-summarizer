export interface PathData {
  windowsPath?: string;
  repoUrl?: string;
  normalizedPath?: string;
  isWindowsPath: boolean;
  isRepoUrl: boolean;
}

export type PathExtractionResult = {
  paths: PathData[];
  errors?: string[];
};

export const PATH_EXTRACTOR = {
  WINDOWS_PATH_PATTERN: /^[A-Za-z]:[\\/]([\\w\s\-_.]+)*$/,
  REPO_URL_PATTERN: /^(https?:\/\/)?(www\.)?(github\.com|gitlab\.com|bitbucket\.org)\/[^\/]+\/[^\/]+\/?$/,
  GIT_URL_PATTERN: /^(git@)?[^@]+:[^\/]+\/[^\/]+\.git$/,
};

export function isWindowsPath(path: string): boolean {
  return PATH_EXTRACTOR.WINDOWS_PATH_PATTERN.test(path);
}

export function isRepoUrl(url: string): boolean {
  return PATH_EXTRACTOR.REPO_URL_PATTERN.test(url) || PATH_EXTRACTOR.GIT_URL_PATTERN.test(url);
}

export function normalizeWindowsPath(path: string): string {
  return path.replace(/\\/g, '/');
}

export function normalizeRepoUrl(url: string): string {
  return url.replace(/\.git$/, '').replace(/\/$/, '');
}
++ b/src/utils/pathExtractor.ts
import { PathData, PathExtractionResult, isWindowsPath, isRepoUrl, normalizeWindowsPath, normalizeRepoUrl } from '../types/pathData';

export function extractPathsFromMeta(meta: Record<string, unknown>): PathExtractionResult {
  const paths: PathData[] = [];
  const errors: string[] = [];

  const metaKeys = Object.keys(meta) as (keyof typeof meta)[];

  for (const key of metaKeys) {
    const value = meta[key];

    if (typeof value === 'string') {
      if (isWindowsPath(value)) {
        paths.push({
          windowsPath: value,
          normalizedPath: normalizeWindowsPath(value),
          isWindowsPath: true,
          isRepoUrl: false,
        });
      } else if (isRepoUrl(value)) {
        paths.push({
          repoUrl: value,
          normalizedPath: normalizeRepoUrl(value),
          isWindowsPath: false,
          isRepoUrl: true,
        });
      }
    }
  }

  return { paths, errors };
}

export function extractPathsFromMessage(message: string): PathExtractionResult {
  const paths: PathData[] = [];
  const errors: string[] = [];

  const messageParts = message.split(/[\n\s]+/);

  for (const part of messageParts) {
    if (isWindowsPath(part)) {
      paths.push({
        windowsPath: part,
        normalizedPath: normalizeWindowsPath(part),
        isWindowsPath: true,
        isRepoUrl: false,
      });
    } else if (isRepoUrl(part)) {
      paths.push({
        repoUrl: part,
        normalizedPath: normalizeRepoUrl(part),
        isWindowsPath: false,
        isRepoUrl: true,
      });
    }
  }

  return { paths, errors };
}