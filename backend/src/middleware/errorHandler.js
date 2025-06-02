// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err); // For development

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }

    if (err.name === 'MongoServerError' && err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate key error';
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        statusCode = 400;
        message = 'File too large. Max size is 2MB.';
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
    next()
};

export default errorHandler;
