const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/classes/NotFoundError');

router.use('/', require('./auth'));

router.use(auth);

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.all('*', (_req, _res, next) => {
  next(new NotFoundError('Некорректный адрес запроса'));
});

module.exports = router;
