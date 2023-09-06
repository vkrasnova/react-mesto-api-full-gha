const CustomError = require('./CustomError');
const { FORBIDDEN_ERR } = require('../../statusCodes');

class ForbiddenError extends CustomError {
  constructor(message = 'Доступ запрещен') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN_ERR;
  }
}

module.exports = ForbiddenError;
