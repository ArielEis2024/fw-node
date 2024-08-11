import { LOG_LEVELS } from '../constants/logLevel';

export interface IFrameworkConfig {
  port: string | number;
  jsonLimitSize?: string;
  name?: string;
  uploadLimitSize?: string;
  logLevel?: typeof LOG_LEVELS[number]
}