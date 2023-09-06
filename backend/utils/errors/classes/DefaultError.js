const { INTERNAL_SERVER_ERR } = require('../../statusCodes');

class DefaultError extends Error {
  constructor(message = 'Ошибка сервера – Что-то пошло не так') {
    super(message);
    this.isCustom = true;
    this.name = 'DefaultError';
    this.statusCode = INTERNAL_SERVER_ERR;
  }
}

module.exports = DefaultError;
