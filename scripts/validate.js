/**все нужные функциям классы и селекторы элементов*/
const parameters = {
  formSelector: '.form',
  setSelector: 'form__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inputErrorClass: 'form__input_type_error',
  inputErrorActive: 'form__input-error_active'
};

/**показать сообщение об ошибке*/
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

/**скрыть сообщение об ошибке*/
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

/**проверить валидность поля*/
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

/**добавить слушатели на все поля*/
const setEventListeners  = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__save-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    checkInputValidity(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
  });
};

/**очистить ошибки валидации*/
const clearValidation  = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__save-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
};

/**включить проверку на все формы*/
const enableValidation = (parameters) => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

  const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
  fieldsetList.forEach((fieldset) => {
    setEventListeners(fieldset);
  });
  });
};

/**проверить массива полей*/
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/**блокировать и активировать кнопку "Сохранить"*/
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};

enableValidation(parameters);
