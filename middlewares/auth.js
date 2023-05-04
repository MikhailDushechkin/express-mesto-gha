const jwt = require('jsonwebtoken');

const UnAuthorizedError = require('../errors/UnAuthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnAuthorizedError('Необходимо авторизироваться'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'jwt-secret');
  } catch (err) {
    throw new UnAuthorizedError('Необходимо авторизироваться');
  }

  req.user = payload;
  next();
};

module.exports = auth;
