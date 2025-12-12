import ErrorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.name === "CastError") {
    const message = "No record found against the requested id";
    error = new ErrorResponse(message, 404);
  }
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 500);
  }
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(messages, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
};

export default errorHandler;
