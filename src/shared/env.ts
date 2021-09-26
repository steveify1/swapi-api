import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

/**
 * Gets the value of an environment variable if it's available.
 * The goal of this helper module is to have the `dotenv.config()` call
 * only in this file.
 * 
 * @param { string } variable - The name of an environment "variable". Duhh..lol
 */
export const env = (variable: string): string => process.env[variable];
