export interface InfoLogs {
  method: string;
  url: string;
  params: any;
  body: any;
  executionTime: string;
  error?: {
    message: string;
    stack?: string;
  };
}
