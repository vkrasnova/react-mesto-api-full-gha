const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/classes/UnauthorizedError');

module.exports = (req, _res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError());
    return;
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new UnauthorizedError());
    return;
  }

  req.user = payload;

  next();
};
