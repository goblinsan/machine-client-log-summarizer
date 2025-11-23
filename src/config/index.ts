import { defaultConfig } from "./defaultConfig";
import fs from "fs";
import path from "path";
import { z } from "zod";

// Load and validate config
export function loadConfig(): any {
  const schema = z.object({
    logPath: z.string().optional(),
    store: z
      .object({
        type: z.enum(["memory", "file"]).optional(),
      })
      .optional(),
    lmStudioEndpoint: z.string().optional(),
  });

  // Load from file if exists
  let configFromFile = {};
  const configPath = path.join(process.cwd(), "config.json");
  if (fs.existsSync(configPath)) {
    const fileContent = fs.readFileSync(configPath, "utf-8");
    configFromFile = JSON.parse(fileContent);
  }

  // Load from environment variables
  const configFromEnv = {
   logPath: process.env.LOG_PATH,
   store: {
     type: process.env.STORE_TYPE,
   },
   lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT,
 };

  // Load from CLI arguments (mocked here)
  const configFromCLI = {};

  // Merge in order of precedence: env > file > CLI > defaults
  const mergedConfig = {
   ...defaultConfig,
   ...configFromFile,
   ...configFromEnv,
   ...configFromCLI,
 };

  // Validate against schema
  const validatedConfig = schema.parse(mergedConfig);

  return validatedConfig;
}