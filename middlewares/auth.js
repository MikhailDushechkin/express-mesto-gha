const jwt = require('jsonwebtoken');

const UnAuthorizedError = require('../errors/UnAuthorizedError');

module.exports = (req, res, next) => {
  const { authrization } = req.headers;

  if (!authrization || !authrization.startWith('Bearer ')) {
    next(new UnAuthorizedError('Необходимо авторизоваться'));
  }

  const token = authrization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'jwt-secret-key');
  } catch (err) {
    next(new UnAuthorizedError('Необходимо авторизироваться'));
  }

  req.user = payload;
  next();
};
