// const JWT_SECRET = 'JWT_SECRET';
const { NODE_ENV, JWT_SECRET } = process.env;
const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';
const SALT_ROUNDS = 10;
const regEx = /(https*:\/\/)([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#*/m;

module.exports = { SALT_ROUNDS, regEx, jwtKey };
