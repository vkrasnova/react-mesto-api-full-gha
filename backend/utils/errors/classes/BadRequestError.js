const CustomError = require('./CustomError');
const { BAD_REQUEST_ERR } = require('../../statusCodes');

class BadRequestError extends CustomError {
  constructor(message = 'Некорректный запрос') {
    super(message);
    this.name = 'BadRequest';
    this.statusCode = BAD_REQUEST_ERR;
  }
}

module.exports = BadRequestError;
