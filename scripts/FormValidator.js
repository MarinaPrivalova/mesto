export class FormValidator {
  constructor(validationParameters, formElement) {
    this._validationParameters = validationParameters;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._validationParameters.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationParameters.inputSelector));
  }

/**показать сообщение об ошибке*/
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationParameters.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationParameters.inputErrorActive);
  }

/**скрыть сообщение об ошибке*/
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationParameters.inputErrorClass);
    errorElement.classList.remove(this._validationParameters.inputErrorActive);
    errorElement.textContent = '';
  }

/**проверить валидность поля*/
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

/**проверить массив полей*/
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

/**блокировать и активировать кнопку "Сохранить"*/
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.removeAttribute('disabled');
    }
  }

  /**очистить ошибки валидации*/
  clearValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
}
