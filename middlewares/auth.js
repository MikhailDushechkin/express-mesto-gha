const jwt = require('jsonwebtoken');

const UnAuthorizedError = require('../errors/UnAuthorizedError');

// eslint-disable-next-line
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnAuthorizedError('Необходимо авторизироваться'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(UnAuthorizedError('Необходимо авторизироваться'));
  }

  req.user = payload;
  next();
};
