export interface ApiError {
  code: string;
  message: string;
  fields: FieldError[];
}

export interface FieldError {
  key: string;
  attemptedValue: string;
  messages: string[];
}
