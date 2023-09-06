const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const { regExpURL } = require('../utils/validation');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .min(2)
      .pattern(regExpURL),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
}), login);

router.get('/signout', logout);

module.exports = router;
