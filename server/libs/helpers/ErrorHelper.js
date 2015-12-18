class ErrorHelper {

    constructor() {

    }

    validationError(res, statusCode) {
        statusCode = statusCode || 422;
        return function(err) {
            res.status(statusCode).json(err);
        }
    }
    handleError(res, statusCode) {
    statusCode = statusCode || 500;
        return function(err) {
            res.status(statusCode).send(err);
        };
    }
    respondWith(res, statusCode) {
        statusCode = statusCode || 200;
        return function () {
            res.status(statusCode).end();
        };
    }
}

export default ErrorHelper;








}
