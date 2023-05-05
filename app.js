const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const mainRouter = require('./routes/index');

const responseError = require('./middlewares/response');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/mestodbnew', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(helmet());

app.use(mainRouter);

app.use(errors());
app.use(responseError);

app.listen(PORT, () => {
  console.log('Сервер запущен и работает в штатном режиме');
});
