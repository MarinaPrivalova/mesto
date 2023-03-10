export default class Card {
  constructor(cardData, cardSelector, handler) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handler.onClick;
    this._handleCardLike = handler.onLike;
    this._handleCardDelete = handler.onDelete;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  /**Метод, возвращающий готовую разметку карточек*/
  generateCard() {
    this._element = this._getTemplate();
    const cardPhoto = this._element.querySelector('.card__photo');
    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
    this._cardPhoto = cardPhoto;
    const cardName = this._element.querySelector('.card__title');
    cardName.textContent = this._name;
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._likeCounter.textContent = this._likes.length;
    this._buttonLike = this._element.querySelector('.card__button-like');
    this._buttonTrash = this._element.querySelector('.card__button-trash');
    this._setEventListeners();

    return this._element;
  }

  /**Определить принадлежность лайка по id*/
  isLike() {
    return this._cardData.likes.some((item) => {
      return item._id === this._cardData.currentUser._id;
    })
  }

  /**Поставить лайк*/
  _handleLike() {
    this._handleCardLike(this._cardData, (updatedLikes) => {
      this._cardData.likes = updatedLikes;
      if (this.isLike()) {
        this._likeButton.classList.add('.card__button-like_active');
      } else {
        this._likeButton.classList.remove('.card__button-like_active');
      }
      this._likeCounter.textContent = this._cardData.likes.length;
    });
    }

  /**Удалить значок корзины, если карточка не моя*/
  _isOwnerCard() {
    return this._cardData.currentUser._id === this._cardData.owner._id;
  }

  /**Метод удаления карточки*/
  _deleteCard() {
    this._element.remove();
    this._element = null;
    this._cardPhoto = null;
    this._buttonLike = null;
    this._buttonTrash = null;
  }

  /**Общий слушатель на все методы в карточке*/
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLike();
    });

    this._buttonTrash.addEventListener('click', () => {
      this._handleCardDelete(this._cardData, () => {
        this._deleteCard();
      })
    });

    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
