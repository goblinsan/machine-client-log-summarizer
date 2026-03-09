import { extractPathsFromMeta } from './pathExtractor';

export interface JsonPreview {
  content: string;
  meta: Record<string, unknown>;
  paths: Record<string, unknown>;
}

export function parseJsonPreview(jsonString: string): JsonPreview {
  try {
    const parsed = JSON.parse(jsonString);
    const meta = parsed.meta || {};
    const paths = extractPathsFromMeta(meta);

    return {
      content: jsonString,
      meta: meta,
      paths: {
        windowsPath: paths.windowsPath,
        normalizedWindowsPath: paths.normalizedWindowsPath,
        repoUrl: paths.repoUrl,
        normalizedRepoUrl: paths.normalizedRepoUrl,
      },
    };
  } catch (error) {
    return {
      content: jsonString,
      meta: {},
      paths: {
        windowsPath: undefined,
        normalizedWindowsPath: undefined,
        repoUrl: undefined,
        normalizedRepoUrl: undefined,
      },
    };
  }
}

export function extractPathsFromJsonPreview(jsonString: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(jsonString);
    const meta = parsed.meta || {};
    const paths = extractPathsFromMeta(meta);

    return {
      windowsPath: paths.windowsPath,
      normalizedWindowsPath: paths.normalizedWindowsPath,
      repoUrl: paths.repoUrl,
      normalizedRepoUrl: paths.normalizedRepoUrl,
    };
  } catch {
    return {};
  }
}