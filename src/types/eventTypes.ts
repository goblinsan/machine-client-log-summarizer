/**
 * Type definitions for log event types
 */

export type WorkerReadyEvent = {
  workerId: string;
  timestamp: number;
};

export type RequestStartedEvent = {
  requestId: string;
  timestamp: number;
};

export type GitOpEvent = {
  operation: 'clone' | 'push' | 'pull' | 'commit' | 'branch';
  repository?: string;
  timestamp: number;
};

export type PersonaResponseEvent = {
  personaId: string;
  response: string;
  timestamp: number;
};

export type PersonaApplyEvent = {
  personaId: string;
  applied: boolean;
  timestamp: number;
};

export type PersonaCompletedEvent = {
  personaId: string;
  status: 'success' | 'failed';
  timestamp: number;
};