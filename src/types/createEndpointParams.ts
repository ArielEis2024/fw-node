export interface ICreateEndpointParams {
  name: string;
  execute: (request: any, response: any) => Promise<any>;
  normalizeData?: (data: any) => any;
  headers?: {[key: string]: string};
  withOwnResponse?: boolean;
}