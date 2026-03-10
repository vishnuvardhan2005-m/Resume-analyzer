// Global error handling middleware
// Ensures consistent JSON error responses
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);

  const statusCode = err.statusCode || 500;
  const message =
    err.message || 'An unexpected error occurred while processing your request.';

  return res.status(statusCode).json({
    message,
    // Only expose stack in development
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
};

export default errorHandler;

