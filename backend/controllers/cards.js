const Card = require('../models/cards');
const errorCatcher = require('../utils/errors/errorCatcher');
const NotFoundError = require('../utils/errors/classes/NotFoundError');
const ForbiddenError = require('../utils/errors/classes/ForbiddenError');
const { CREATED } = require('../utils/statusCodes');

const getAllCards = errorCatcher(async (_req, res) => {
  const cards = await Card.find({});
  res.send(cards);
});

const createCard = errorCatcher(async (req, res) => {
  const { name, link } = req.body;
  const card = await Card.create({
    name, link, owner: req.user._id,
  });
  res.status(CREATED).send(card);
});

const deleteCard = errorCatcher(async (req, res) => {
  const card = await Card.findById(req.params.cardID);
  if (!card) {
    throw new NotFoundError();
  }
  if (card.owner.toString() !== req.user._id) {
    throw new ForbiddenError('Нельзя удалить чужую карточку');
  }
  await card.deleteOne();
  res.send({ message: 'Карточка удалена' });
});

const likeCard = errorCatcher(async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.cardID,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  );
  if (!card) {
    throw new NotFoundError();
  }
  res.send(card);
});

const dislikeCard = errorCatcher(async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.cardID,
    { $pull: { likes: req.user._id } },
    { new: true },
  );
  if (!card) {
    throw new NotFoundError();
  }
  res.send(card);
});

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
