const errorHandler = (err, _req, res, next) => {
  const { statusCode, message } = err;
  res
    .status(statusCode)
    .send({ message });
  next();
};

module.exports = errorHandler;
