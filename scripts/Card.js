export class Card {
  constructor(name, link, handleClickCard) {
    this._name = name;
    this._link = link;
    this._element = this._getTemplate();
    this._handleClickCard = handleClickCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#card')
      .content
      .querySelector('.card')
      .cloneNode(true);

      return cardElement;
  }

/**метод, возвращающий готовую разметку карточек*/
  generateCard() {
    const cardPhoto = this._element.querySelector('.card__photo');
    const cardName = this._element.querySelector('.card__title');

    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
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
  }

/**общий слушатель на все методы в карточке*/
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._getLike();
    });

    this._buttonTrash.addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.card__photo').addEventListener('click', () => {
      this._handleClickCard(this._name, this._link);
    });
  }
}
