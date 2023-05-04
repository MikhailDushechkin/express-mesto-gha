const cardsRouter = require('express').Router();

const { cardValidation, idValidation } = require('../middlewares/validate');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', cardValidation, createCard);
cardsRouter.delete('/cards/:cardId', idValidation, deleteCard);
cardsRouter.put('/cards/:cardId/likes', idValidation, likeCard);
cardsRouter.delete('/cards/:cardId/likes', idValidation, dislikeCard);

module.exports = cardsRouter;
