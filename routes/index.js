const mainRouter = require('express').Router();

const { loginValidation, userValidation } = require('../middlewares/validate');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const NotFoundError = require('../errors/NotFoundError');

// Регистрация и вход
mainRouter.post('/signup', userValidation, createUser);
mainRouter.post('/signin', loginValidation, login);

// С защитой авторизации
mainRouter.use('/cards', auth, cardsRouter);
mainRouter.use('/users', auth, usersRouter);

mainRouter.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = mainRouter;
