import { fileIngest } from './fileIngest';
import fs from 'fs';
import path from 'path';

  const mockFileContent = `
  [2023-01-01 12:00:00] INFO: Application started
  [2023-01-01 12:00:01] ERROR: Failed to connect to database
  [2023-01-01 12:00:02] WARN: Low disk space
  [2023-01-01 12:00:03] INFO: User logged in
  `;

  it('should parse logs with different timestamp formats', () => {
    const mockFileContent = `
      [2023-01-01 12:00:00] INFO: Application started
      [2023-01-01 12:00:01] ERROR: Failed to connect to database
      [2023-01-01 12:00:02] WARN: Low disk space
      [2023-01-01 12:00:03] INFO: User logged in
      [2023-01-01 12:00:04] DEBUG: Debug message
    `;

  it('should handle empty files gracefully', () => {
    const mockFileContent = '';
    const result = fileIngest(mockFileContent);
    expect(result).toEqual([]);
  });

  it('should handle files with only whitespace', () => {
  it('should handle files with only whitespace', () => {
    const mockFileContent = '   \n  \n\t\n  ';
    const result = fileIngest(mockFileContent);
    expect(result).toEqual([]);
  });

  it('should parse logs with different timestamp formats', () => {
  it('should parse logs with different timestamp formats', () => {
    const mockFileContent = `
      [2023-01-01 12:00:00] INFO: Application started
      [2023-01-01 12:00:01] ERROR: Failed to connect to database
      [2023-01-01 12:00:02] WARN: Low disk space
      [2023-01-01 12:00:03] INFO: User logged in
      [2023-01-01 12:00:04] DEBUG: Debug message
    `;

  it('should parse logs with different timestamp formats', () => {
    const result = fileIngest(mockFileContent);
    expect(result).toHaveLength(5);
    expect(result[0]).toEqual({
      timestamp: '2023-01-01 12:00:00',
      level: 'INFO',
      message: 'Application started'
    });
    expect(result[1]).toEqual({
      timestamp: '2023-01-01 12:00:01',
      level: 'ERROR',
      message: 'Failed to connect to database'
    });
  });

  it('should parse logs with different timestamp formats', () => {
  it('should parse logs with different timestamp formats', () => {
    const result = fileIngest(mockFileContent);
    expect(result).toHaveLength(5);
    expect(result[2]).toEqual({
      timestamp: '2023-01-01 12:00:02',
      level: 'WARN',
      message: 'Low disk space'
    });
    expect(result[3]).toEqual({
      timestamp: '2023-01-01 12:00:03',
      level: 'INFO',
      message: 'User logged in'
    });
    expect(result[4]).toEqual({
      timestamp: '2023-01-01 12:00:04',
      level: 'DEBUG',
      message: 'Debug message'
    });
  });

  it('should parse logs with different timestamp formats', () => {
  it('should parse logs with different timestamp formats', () => {
    const result = fileIngest(mockFileContent);
    expect(result).toHaveLength(5);
    expect(result[0]).toEqual({
      timestamp: '2023-01-01 12:00:00',
      level: 'INFO',
      message: 'Application started'
    });
    expect(result[1]).toEqual({
      timestamp: '2023-01-01 12:00:01',
      level: 'ERROR',
      message: 'Failed to connect to database'
    });
  });

  it('should parse logs with different timestamp formats', () => {
  it('should parse logs with different timestamp formats', () => {
    const result = fileIngest(mockFileContent);
    expect(result).toHaveLength(5);
    expect(result[2]).toEqual({
      timestamp: '2023-01-01 12:00:02',
      level: 'WARN',
      message: 'Low disk space'
    });
    expect(result[3]).toEqual({
      timestamp: '2023-01-01 12:00:03',
      level: 'INFO',
      message: 'User logged in'
    });
  });

  it('should parse logs with different timestamp formats', () => {
  it('should parse logs with different timestamp formats', () => {
    const result = fileIngest(mockFileContent);
    expect(result).toHaveLength(5);
    expect(result[4]).toEqual({
      timestamp: '2023-01-01 12:00:04',
      level: 'DEBUG',
      message: 'Debug message'
    });
  });

  it('should parse logs with different timestamp formats', () => {