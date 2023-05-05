const usersRouter = require('express').Router();

const { userAboutValidation, avatarValidation, idValidation } = require('../middlewares/validate');

const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:_id', idValidation, getUser);
usersRouter.get('/me', idValidation, getUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me', userAboutValidation, updateUser);
usersRouter.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = usersRouter;
