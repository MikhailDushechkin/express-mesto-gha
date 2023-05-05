const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля - 2 символа'],
      maxlength: [30, 'Максимальная длина поля - 30 символов'],
      required: [true, 'Поле "name" должно быть заполнено'],
    },
    link: {
      type: String,
      required: [true, 'Поле "link" должно быть заполнено'],
      validate: {
        validator: (link) => validator.isURL(link),
        message: 'Ошибка при передаче ссылки',
      },
    },
    owner: {
      ref: 'user',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    likes: [{
      ref: 'user',
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
