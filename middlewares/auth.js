const jwt = require('jsonwebtoken');

const UnAuthorizedError = require('../errors/UnAuthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'jwt-secret');
  } catch (err) {
    next(new UnAuthorizedError('Необходимо авторизироваться'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
