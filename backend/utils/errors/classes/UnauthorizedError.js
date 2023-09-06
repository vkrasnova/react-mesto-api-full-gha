const CustomError = require('./CustomError');
const { UNAUTHORIZED_ERR } = require('../../statusCodes');

class UnauthorizedError extends CustomError {
  constructor(message = 'Пользователь не авторизован') {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = UNAUTHORIZED_ERR;
  }
}

module.exports = UnauthorizedError;
