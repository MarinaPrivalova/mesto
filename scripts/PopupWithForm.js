import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._formInputList = this._form.querySelectorAll('.form__input');
    this._handleFormSubmit = handleFormSubmit;
    this.setEventListeners();
  }

  _getInputValues() {
    this._formValues = {};

    this._formInputList.forEach(input => {
      this._formValues[input.name] = input.value});

    return this._formValues;
  }

  setEventListeners() {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })

    super.setEventListeners();
  }

  close() {
    this._form.reset();

    super.close();
  }
}