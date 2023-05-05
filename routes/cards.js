const cardsRouter = require('express').Router();

const { cardValidation, idCardValidation } = require('../middlewares/validate');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', cardValidation, createCard);
cardsRouter.delete('/:cardId', idCardValidation, deleteCard);
cardsRouter.put('/:cardId/likes', idCardValidation, likeCard);
cardsRouter.delete('/:cardId/likes', idCardValidation, dislikeCard);

module.exports = cardsRouter;
