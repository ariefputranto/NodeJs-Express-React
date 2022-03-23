const HttpStatus = require('http-status-codes');
const logger = require('../config/winston');

/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
function notFound(req, res, next) {
    res.status(HttpStatus.NOT_FOUND)
        .json({
            status: 'error',
            message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
            data: []
        });
}

/**
 * METHOD_NOT_ALLOWED(405) middleware to catch error response.
 * It should be placed at the very bottom of the middleware stack.
 *
 * @param {Object} req
 * @param {Object} res
 */
function methodNotAllowed(req, res) {
    res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
        status: 'error',
        message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
        data: []
    });
}

/**
 * Generic error response middleware
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
function genericErrorHandler(err, req, res, next) {
    logger.error(err);
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
            status: 'error',
            message: err.message || HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
            data: []
        });
}

module.exports = {
    notFound: notFound,
    methodNotAllowed: methodNotAllowed,
    genericErrorHandler: genericErrorHandler
};