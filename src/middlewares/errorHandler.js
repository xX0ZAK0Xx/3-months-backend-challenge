const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Joi Validation Error
    if (err.isJoi) {
        return res.status(400).json({
            success: false,
            from: 'Validation',
            message: 'Validation failed',
            errors: err.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message.replace(/["]/g, ''),
            })),
        });
    }

    // Custom API Error
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            from: 'API ERROR',
            message: err.message,
            ...(err.details && { errors: err.details }),
        });
    }

    // Fallback Error
    res.status(500).json({
        success: false,
        from: 'SERVER ERROR',
        message: 'Something went wrong',
    });
};

export default errorHandler;
