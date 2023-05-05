const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const UnAuthorizedError = require('../errors/UnAuthorizedError');

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
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (link) => validator.isURL(link),
        message: 'Ошибка при передаче ссылки для аватара',
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Почта пользователя введена неверно',
      },
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

// eslint-disable-next-line
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnAuthorizedError('Неправильные email или password');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnAuthorizedError('Неправильные email или passwoed');
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
