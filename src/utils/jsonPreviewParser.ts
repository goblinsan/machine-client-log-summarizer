import { PreviewParseResult, PreviewParserOptions } from '../types';

/**
 * Parse preview content whether it appears inside ```json fences or as bare JSON.
 * On valid parse, store preview_json and extract status (pass|fail); otherwise retain preview_raw.
 */
export function parsePreviewContent(
  content: string,
  options: PreviewParserOptions = {}
): PreviewParseResult {
  const { maxDepth = 10, timeout = 5000 } = options;

  // Check for JSON fence markers
  const fenceRegex = /^```(?:json)?\s*\n([\s\S]*?)\n```$/;
  const fenceMatch = content.match(fenceRegex);

  let jsonContent: string | undefined;

  if (fenceMatch) {
    // Extract content between fences
    jsonContent = fenceMatch[1].trim();
  } else {
    // Try to find bare JSON at the start of content
    // JSON must start with { or [
    const bareJsonRegex = /^[\s]*[{[]/;
    if (bareJsonRegex.test(content)) {
      jsonContent = content;
    }
  }

  if (!jsonContent) {
    // No valid JSON found, return raw content with fail status
    return {
      preview_raw: content,
      status: 'fail',
    };
  }

  // Validate JSON syntax
  let parsed: any;
  try {
    parsed = JSON.parse(jsonContent);
  } catch (error) {
    // JSON parse failed, return raw content with fail status
    return {
      preview_raw: content,
      status: 'fail',
    };
  }

  // Validate JSON structure (must be an object or array)
  if (typeof parsed !== 'object' || parsed === null) {
    return {
      preview_raw: content,
      status: 'fail',
    };
  }

  // Determine status based on content
  // For now, default to 'pass' if JSON is valid
  // Future: could check for specific fields like 'status', 'result', etc.
  const status: 'pass' | 'fail' = 'pass';

  return {
    preview_json: parsed,
    status,
  };
}

/**
 * Extract JSON from preview content with fence support.
 * Returns the raw JSON string if extraction fails.
 */
export function extractJsonFromPreview(
  content: string,
  options: PreviewParserOptions = {}
): string {
  const result = parsePreviewContent(content, options);

  if (result.preview_json) {
    return JSON.stringify(result.preview_json, null, 2);
  }

  return result.preview_raw || '';
}

/**
 * Check if content contains valid JSON (with or without fences).
 */
export function hasValidJson(
  content: string,
  options: PreviewParserOptions = {}
): boolean {
  const result = parsePreviewContent(content, options);
  return result.status === 'pass';
}

/**
 * Get the status of a parsed preview.
 */
export function getPreviewStatus(
  content: string,
  options: PreviewParserOptions = {}
): 'pass' | 'fail' {
  const result = parsePreviewContent(content, options);
  return result.status || 'fail';
}

/**
 * Get the parsed JSON from preview content.
 * Returns undefined if parsing failed.
 */
export function getPreviewJson(
  content: string,
  options: PreviewParserOptions = {}
): any | undefined {
  const result = parsePreviewContent(content, options);
  return result.preview_json;
}

/**
 * Get the raw preview content.
 */
export function getPreviewRaw(
  content: string,
  options: PreviewParserOptions = {}
): string {
  const result = parsePreviewContent(content, options);
  return result.preview_raw || '';
}