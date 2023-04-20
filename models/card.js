const mongoose = require('mongoose');

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
    },
    owner: {
      ref: 'user',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    likes: {
      type: [
        {
          ref: 'user',
          type: mongoose.Schema.Types.ObjectId,
          default: [],
        },
      ],
    },
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
