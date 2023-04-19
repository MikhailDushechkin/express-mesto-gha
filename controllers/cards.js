const Card = require('../models/card');
const { CodeError } = require('../errorCode');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(CodeError.BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res
        .status(CodeError.SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res
        .status(CodeError.SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { userId } = req.user;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res
          .status(CodeError.NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
        return;
      }

      if (card.owner._id === userId) {
        Card.findByIdAndRemove(cardId).then((data) => res.send(data));
      }
    })
    .catch(() => {
      res
        .status(CodeError.SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((likes) => {
      if (!likes) {
        return res
          .status(CodeError.NOT_FOUND)
          .send({ message: 'Лайк не найден' });
      }
      return res.send({ data: likes });
    })
    .catch((err) => {
      if (err) {
        return res
          .status(CodeError.BAD_REQUEST)
          .send({ message: 'Неверный запрос' });
      }
      return res
        .status(CodeError.SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((likes) => {
      if (!likes) {
        res.status(CodeError.NOT_FOUND).send({ message: 'Лайк не найден' });
      }
      res.send({ data: likes });
    })
    .catch((err) => {
      if (err) {
        return res.status(CodeError.BAD_REQUEST).send({ message: 'Лайк не найден' });
      }
      return res
        .status(CodeError.SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};
