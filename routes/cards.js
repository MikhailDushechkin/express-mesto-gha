const cardsRouter = require('express').Router();

const { cardValidation, idValidation } = require('../middlewares/validate');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', cardValidation, createCard);
cardsRouter.delete('/:cardId', idValidation, deleteCard);
cardsRouter.put('/:cardId/likes', idValidation, likeCard);
cardsRouter.delete('/:cardId/likes', idValidation, dislikeCard);

module.exports = cardsRouter;
