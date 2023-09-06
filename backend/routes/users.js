const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const { regExpURL } = require('../utils/validation');

router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

router.get('/:userID', celebrate({
  params: Joi.object().keys({
    userID: Joi.string()
      .required()
      .hex()
      .length(24),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    about: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(regExpURL),
  }),
}), updateUserAvatar);

module.exports = router;
