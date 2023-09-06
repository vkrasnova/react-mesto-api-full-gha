const CustomError = require('./classes/CustomError');
const DefaultError = require('./classes/DefaultError');
const BadRequestError = require('./classes/BadRequestError');
const ConflictError = require('./classes/ConflictError');

function errorCatcher(fn) {
  return (req, res, next) => {
    fn(req, res, next)
      .catch((err) => {
        const { code, name } = err;
        if (err instanceof CustomError) {
          next(err);
          return;
        }
        if (code === 11000) {
          next(new ConflictError());
          return;
        }
        if (name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные'));
          return;
        }
        if (name === 'CastError') {
          next(new BadRequestError('Объект с указанным ID не найден'));
          return;
        }
        next(new DefaultError());
      });
  };
}

module.exports = errorCatcher;
