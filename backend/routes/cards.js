const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { regExpURL } = require('../utils/validation');

router.get('/', getAllCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string()
      .required()
      .min(2)
      .pattern(regExpURL),
  }),
}), createCard);

router.delete('/:cardID', celebrate({
  params: Joi.object().keys({
    cardID: Joi.string()
      .required()
      .hex()
      .length(24),
  }),
}), deleteCard);

router.put('/:cardID/likes', celebrate({
  params: Joi.object().keys({
    cardID: Joi.string()
      .required()
      .hex()
      .length(24),
  }),
}), likeCard);

router.delete('/:cardID/likes', celebrate({
  params: Joi.object().keys({
    cardID: Joi.string()
      .required()
      .hex()
      .length(24),
  }),
}), dislikeCard);

module.exports = router;
