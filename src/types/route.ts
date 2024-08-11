import { METHODS } from '../constants/methods';
import { Endpoint } from '../endpoint';

export interface IRoute { 
  method: typeof METHODS[number]
  path: string;
  endpoint: typeof Endpoint;
  withBinaryUpload?: boolean;
}