const User = require('../models/user');
const { CodeError } = require('../errorCode');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(CodeError.BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(CodeError.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        res
          .status(CodeError.NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch(() => {
      res.status(CodeError.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(CodeError.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res.status(CodeError.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res.status(CodeError.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};
