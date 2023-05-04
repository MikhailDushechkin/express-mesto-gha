const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { CodeError } = require('./errors/errorCode');
const { login, createUser } = require('./controllers/users');
const { loginValidation, userValidation } = require('./middlewares/validate');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);

app.use('/', auth, userRouter);
app.use('/', auth, cardsRouter);

app.use('*', (req, res) => {
  res.status(CodeError.NOT_FOUND).send({ message: 'Страница не найдена' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log('Сервер запущен и работает в штатном режиме');
});
