const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const errorCatcher = require('../utils/errors/errorCatcher');
const NotFoundError = require('../utils/errors/classes/NotFoundError');
const { CREATED } = require('../utils/statusCodes');

const getAllUsers = errorCatcher(async (_req, res) => {
  const users = await User.find({});
  res.send(users);
});

const getUser = errorCatcher(async (req, res) => {
  const user = await User.findById(req.params.userID);
  if (!user) {
    throw new NotFoundError();
  }
  res.send(user);
});

const createUser = errorCatcher(async (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    email, password: hash, name, about, avatar,
  });
  res.status(CREATED).send({
    _id: user._id,
    email: user.email,
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  });
});

const login = errorCatcher(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUserByCredentials(email, password);
  const token = jwt.sign(
    { _id: user._id },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    { expiresIn: '7d' },
  );
  res
    .cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    })
    .send({ message: 'Вы успешно авторизованы' });
});

const logout = (_req, res) => {
  res
    .clearCookie('jwt')
    .send({ message: 'Выход из аккаунта выполнен' });
};

const getCurrentUser = errorCatcher(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

const updateUserInfo = errorCatcher(async (req, res) => {
  const { name, about } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  );
  if (!user) {
    throw new NotFoundError();
  }
  res.send(user);
});

const updateUserAvatar = errorCatcher(async (req, res) => {
  const { avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  );
  if (!user) {
    throw new NotFoundError();
  }
  res.send(user);
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  login,
  logout,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
};
