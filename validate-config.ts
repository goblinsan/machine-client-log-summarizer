import { validate } from 'jsonschema';

export function validateConfig(config: any): boolean {
  const schema = require('./schema.json');
  return validate(config, schema).valid;