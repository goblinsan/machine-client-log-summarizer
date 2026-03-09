export interface HashRecord {
  hash: string;
  ts?: string;
  msg?: string;
  persona?: string;
  workflowId?: string;
  corrId?: string;
  preview_raw?: string;
}

export interface PreviewParseResult {
  preview_raw?: string;
  preview_json?: any;
  status?: 'pass' | 'fail';
}

export type PreviewContent = string;

export interface PreviewParserOptions {
  maxDepth?: number;
  timeout?: number;
}