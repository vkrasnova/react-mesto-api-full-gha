const CustomError = require('./CustomError');
const { NOT_FOUND_ERR } = require('../../statusCodes');

class NotFoundError extends CustomError {
  constructor(message = 'Объект с указанным ID не найден') {
    super(message);
    this.name = 'NotFound';
    this.statusCode = NOT_FOUND_ERR;
  }
}

module.exports = NotFoundError;
