export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscAndOverlayClose = this._handleEscAndOverlayClose.bind(this);
  }

  _handleEscAndOverlayClose(evt) {
    if (evt.key === 'Escape' || evt.target == evt.currentTarget) {
      this.close()
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscAndOverlayClose);
    this._popup.addEventListener('mousedown', this._handleEscAndOverlayClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscAndOverlayClose);
    this._popup.removeEventListener('mousedown', this._handleEscAndOverlayClose);
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');

    closeButton.addEventListener('click', () => {
      this.close();
    })
  }
}