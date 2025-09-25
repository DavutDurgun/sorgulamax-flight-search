interface ApiErrorParams {
  message: string;
  code?: string;
  details?: any;
}

export class ApiError extends Error {
  code?: string;
  details?: any;
  constructor({ message, code, details }: ApiErrorParams) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.details = details;
  }
}
