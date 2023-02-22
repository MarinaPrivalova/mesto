export default class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

/**метод, возвращающий готовую разметку карточек*/
  generateCard() {
    this._cardPhoto = this._element.querySelector('.card__photo');
    const cardName = this._element.querySelector('.card__title');

    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    cardName.textContent = this._name;

    this._buttonLike = this._element.querySelector('.card__button-like');
    this._buttonTrash = this._element.querySelector('.card__button-trash');

    this._setEventListeners();

    return this._element;
  }

/**метод лайка карточки*/
  _getLike() {
    this._buttonLike.classList.toggle("card__button-like_active");
  }

/**метод удаления карточки*/
  _deleteCard() {
    this._element.remove();
    this._element = null;
    this._cardPhoto = null;
    this._buttonLike = null;
    this._buttonTrash = null;
  }

/**общий слушатель на все методы в карточке*/
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._getLike();
    });

    this._buttonTrash.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}