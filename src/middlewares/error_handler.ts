import { ErrorRequestHandler } from "express";
import Joi from "joi";
import { AppError } from "../utils/error_handler.js";
const { ValidationError } = Joi;

/**
 * Custom error-handling middleware
 * 
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  console.error('Error occurred:', err); // Log the entire error object for debugging

  let status = 500;
  let message = "Internal Server Error";

  if (err instanceof SyntaxError) {
    status = 400;
    message = "Syntax Error" + message;
  } else if (err instanceof RangeError) {
    status = 500;
    message = "Range Error" + message;
  } else if (err instanceof ReferenceError) {
    status = 500;
    message = "Reference Error" + message;
  } else if (err instanceof URIError) {
    status = 400;
    message = "URI Error" + message;
  } else if (err instanceof TypeError) {
    status = 400;
    message = "Type Error" + message;
  } else if (err instanceof AppError) {
    status = err.statusCode || 422;
    message = err.message;
  } else if (err instanceof Error) {
    status = 422;
    message = err.message;
  }

  res.status(status).json({ "message": message });
};

export default errorHandler;

/**
 * Middleware for handling Joi validation errors.
 * 
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
export const validationErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(422).json({ message: err.message });
  } else {
    next(err);
  }
};


