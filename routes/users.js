const usersRouter = require('express').Router();

const { userAboutValidation, avatarValidation, idValidation } = require('../middlewares/validate');

const {
  createUser,
  getUserId,
  getUsers,
  getUserProfile,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserProfile);
usersRouter.get('/:_id', idValidation, getUserId);
usersRouter.post('/', createUser);
usersRouter.patch('/me', userAboutValidation, updateUser);
usersRouter.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = usersRouter;
