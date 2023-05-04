const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
const { loginValidation, userValidation } = require('./middlewares/validate');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(cookieParser());

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodbnew', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log('Сервер запущен и работает в штатном режиме');
});
