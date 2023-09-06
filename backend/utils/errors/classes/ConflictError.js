const CustomError = require('./CustomError');
const { CONFLICT_ERR } = require('../../statusCodes');

class ConflictError extends CustomError {
  constructor(message = 'Конфликтующий запрос') {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = CONFLICT_ERR;
  }
}

module.exports = ConflictError;
