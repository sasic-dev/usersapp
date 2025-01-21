export const getErrorMessage = (err: unknown, msg: string = "") => {
  let message: string = msg;

  if (err instanceof Error) {
    message = err.message;
  } 

  return message;
};

export class AppError extends Error {
  public statusCode: number;
  
  constructor(message: string, statusCode: number) {
      super(message);
      this.name = "AppError";
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
  }
}