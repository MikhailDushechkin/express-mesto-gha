const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line
const linkRegExp = /(http:\/\/|https:\/\/)(www)*[a-z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+#*/;

const idValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(20),
    avatar: Joi.string().pattern(linkRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userAboutValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(20),
  }),
});

const avatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegExp),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkRegExp),
  }),
});

module.exports = {
  linkRegExp,
  idValidation,
  loginValidation,
  userAboutValidation,
  userValidation,
  avatarValidation,
  cardValidation,
};
