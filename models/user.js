const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { isUrl } = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля - 2 символа'],
      maxlength: [30, 'Максимальная длина поля - 30 символов'],
      required: [true, 'Поле "name" должно быть заполнено'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля - 2 символа'],
      maxlength: [30, 'Максимальная длина поля - 30 символов'],
      required: [true, 'Поле "about" должно быть заполнено'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: [true, 'Поле "avatar" должно быть заполнено'],
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: isUrl,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: isEmail,
      },
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
