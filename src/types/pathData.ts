export interface PathData {

  normalizedWindowsPath?: string;
  normalizedRepoUrl?: string;
}

export type PathDataMap = Record<string, PathData>;

export function normalizeWindowsPath(path: string): string {
  // Normalize Windows paths: C:\ -> C:/ for consistency
  return path.replace(/\\/g, '/');
}

export function normalizeRepoUrl(url: string): string {
  // Normalize repo URLs: ensure trailing slash consistency
  if (url.endsWith('/')) {
    return url;
  }
  return url + '/';
}

export function isWindowsPath(path: string): boolean {
  return /^[A-Za-z]:/.test(path);
}

export function isRepoUrl(url: string): boolean {
  return /^(https?:\/\/)?(git\.)?github\.com\/|gitlab\.com\/|bitbucket\.org\//.test(url);
}
