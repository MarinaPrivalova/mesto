/**показать сообщение об ошибке*/
const showInputError = (formElement, inputElement, errorMessage, validationParameters) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationParameters.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationParameters.inputErrorActive);
};

/**скрыть сообщение об ошибке*/
const hideInputError = (formElement, inputElement, validationParameters) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParameters.inputErrorClass);
  errorElement.classList.remove(validationParameters.inputErrorActive);
  errorElement.textContent = '';
};

/**проверить валидность поля*/
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationParameters);
  } else {
    hideInputError(formElement, inputElement, validationParameters);
  }
};

/**добавить слушатели на все поля*/
const setEventListeners  = (formElement, validationParameters) => {
  const inputList = Array.from(formElement.querySelectorAll(validationParameters.inputSelector));
  const buttonElement = formElement.querySelector(validationParameters.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    checkInputValidity(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
  });
};

/**очистить ошибки валидации*/
const clearValidation  = (formElement, validationParameters) => {
  const inputList = Array.from(formElement.querySelectorAll(validationParameters.inputSelector));
  const buttonElement = formElement.querySelector(validationParameters.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationParameters);
  });
};

/**включить проверку на все формы*/
const enableValidation = (validationParameters) => {
  const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationParameters);
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
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation(validationParameters);
