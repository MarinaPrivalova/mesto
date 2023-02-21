export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._overlayClose = this._overlayClose.bind(this);
  }

  _handleEscClose() {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _overlayClose(evt) {
    if (evt.target == evt.currentTarget) {
      this.close()
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._overlayClose);
  }

  close() {
    this_.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._overlayClose);
  }

  addEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');

    closeButton.addEventListener('click', () => {
      this.close();
    })
  }
}