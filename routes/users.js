const usersRouter = require('express').Router();

const { userAboutValidation, avatarValidation, idValidation } = require('../middlewares/validate');

const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:_id', idValidation, getUser);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', userAboutValidation, updateUser);
usersRouter.patch('/users/me', idValidation, getUser);
usersRouter.patch('/users/me/avatar', avatarValidation, updateAvatar);

module.exports = usersRouter;
