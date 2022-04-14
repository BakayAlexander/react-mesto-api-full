const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config');
// const {JWT_SECRET} = require('../config');
const UnathoriazedError = require('../erros/UnathoriazedError');
// const { NODE_ENV, JWT_SECRET } = process.env;
// const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

const auth = (req, res, next) => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return next(new UnathoriazedError('Нет прав доступа'));
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, jwtKey);
    console.log(payload);
  } catch (err) {
    return next(new UnathoriazedError('Нет прав доступа'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
