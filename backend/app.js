require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const cors = require('cors');

const { routes } = require('./routes/app');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./erros/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;
// const { PORT = 3001 } = process.env;

// app.use(cors());
// app.options('*', cors());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://mesto.bakay.students.nomoredomains.work',
      'https://mesto.bakay.students.nomoredomains.work',
    ],
    credentials: true,
  }),
);

app.use(bodyParser.json()); // сборка json-формата
app.use(bodyParser.urlencoded({ extended: true })); // прием web-страниц

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресур не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(errorHandler);

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (err) {
    console.log(err);
  }

  app.listen(PORT, () => {
    console.log(`Starting app on port ${PORT}`);
  });
}

main();
