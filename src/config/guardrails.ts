/**
 * Guardrails for Multi-Agent Log Summarizer
 * Defines safety limits, escalation rules, and behavioral constraints
 * for all agent personas.
 */

export interface Guardrail {
  name: string;
  description: string;
  enabled: boolean;
  severity: 'info' | 'warning' | 'error';
  action: 'log' | 'warn' | 'block' | 'escalate';
  trigger: string;
  message: string;
}

export interface EscalationRule {
  condition: string;
  targetPersona: 'coordinator' | 'lead-engineer' | 'security';
  priority: number;
}

export const GUARDRAILS: Guardrail[] = [
  {
    name: 'PII_EXPOSURE',
    description: 'Prevent exposure of personally identifiable information',
    enabled: true,
    severity: 'error',
    action: 'block',
    trigger: 'email|phone|ssn|credit_card|api_key|password',
    message: 'PII detected - redact before output',
  },
  {
    name: 'COMMAND_INJECTION',
    description: 'Block shell command injection attempts',
    enabled: true,
    severity: 'error',
    action: 'block',
    trigger: 'cmd|exec|shell|system|eval',
    message: 'Potential command injection - block',
  },
  {
    name: 'SQL_INJECTION',
    description: 'Block SQL injection patterns',
    enabled: true,
    severity: 'error',
    action: 'block',
    trigger: 'SELECT|INSERT|UPDATE|DELETE|DROP|UNION',
    message: 'SQL injection pattern detected',
  },
  {
    name: 'XSS_ATTACK',
    description: 'Block cross-site scripting patterns',
    enabled: true,
    severity: 'error',
    action: 'block',
    trigger: '<script>|javascript:|onerror=|onclick=',
    message: 'XSS pattern detected',
  },
  {
    name: 'PATH_TRAVERSAL',
    description: 'Block directory traversal attempts',
    enabled: true,
    severity: 'error',
    action: 'block',
    trigger: '\\.\\./|\\.\\.\\\\|/etc/passwd|/etc/shadow',
    message: 'Path traversal attempt detected',
  },
  {
    name: 'RATE_LIMIT',
    description: 'Prevent excessive request rates',
    enabled: true,
    severity: 'warning',
    action: 'warn',
    trigger: 'request_count > 100/minute',
    message: 'Rate limit approaching',
  },
  {
    name: 'CONTEXT_WINDOW',
    description: 'Enforce maximum context window size',
    enabled: true,
    severity: 'warning',
    action: 'warn',
    trigger: 'context_tokens > 8000',
    message: 'Context window limit approaching',
  },
  {
    name: 'OUTPUT_LENGTH',
    description: 'Enforce maximum output length',
    enabled: true,
    severity: 'info',
    action: 'log',
    trigger: 'output_tokens > 2000',
    message: 'Output length limit reached',
  },
  {
    name: 'TIMEOUT',
    description: 'Prevent infinite loops and long-running operations',
    enabled: true,
    severity: 'error',
    action: 'block',
    trigger: 'operation_duration > 30s',
    message: 'Operation timeout exceeded',
  },
  {
    name: 'MEMORY_LIMIT',
    description: 'Enforce memory usage limits',
    enabled: true,
    severity: 'warning',
    action: 'warn',
    trigger: 'memory_usage > 80%',
    message: 'Memory usage high',
  },
];

export const ESCALATION_RULES: EscalationRule[] = [
  {
    condition: 'security_violation',
    targetPersona: 'security',
    priority: 1,
  },
  {
    condition: 'pii_detected',
    targetPersona: 'security',
    priority: 2,
  },
  {
    condition: 'rate_limit_exceeded',
    targetPersona: 'coordinator',
    priority: 3,
  },
  {
    condition: 'context_overflow',
    targetPersona: 'coordinator',
    priority: 4,
  },
  {
    condition: 'complex_analysis',
    targetPersona: 'lead-engineer',
    priority: 5,
  },
];

export const PERSONA_CONSTRAINTS = {
  coordinator: {
    maxDecisionsPerTurn: 3,
    requireConfirmation: true,
    escalationThreshold: 'critical',
  },
  leadEngineer: {
    maxAnalysisDepth: 5,
    requireValidation: true,
    escalationThreshold: 'error',
  },
  qa: {
    maxReviewItems: 10,
    requireCoverage: true,
    escalationThreshold: 'warning',
  },
  security: {
    maxAlertsPerMinute: 5,
    requireInvestigation: true,
    escalationThreshold: 'immediate',
  },
};

export const GUARDRAIL_CONFIG = {
  enabled: true,
  logLevel: 'info',
  metricsEnabled: true,
  auditLogPath: './logs/guardrails.log',
};

export default {
  guardrails: GUARDRAILS,
  escalationRules: ESCALATION_RULES,
  personaConstraints: PERSONA_CONSTRAINTS,
  config: GUARDRAIL_CONFIG,
};