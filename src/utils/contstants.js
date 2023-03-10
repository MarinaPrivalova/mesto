/**все нужные функциям классы и селекторы элементов*/
const validationParameters = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inputErrorClass: 'form__input_type_error',
  inputErrorActive: 'form__input-error_active'
};

/**Селекторы для профиля пользователя*/
const profileUser = {
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__vocation',
  userAvatarSelector: '.profile__avatar'
}

/**Профиль пользователя */
const popupProfile = document.querySelector('.popup_type_edit');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formElementProfile = popupProfile.querySelector('.form');
const nameInput = popupProfile.querySelector('.form__input_type_user-name');
const jobInput = popupProfile.querySelector('.form__input_type_vocation');
const popupAddAvatar = document.querySelector('.popup_type_avatar');
const formAddAvatar = popupAddAvatar.querySelector('.form');
const avatar = document.querySelector('.profile__vector-avatar');
/**Добавление карточки*/
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const buttonOpenAddNewCard = document.querySelector('.profile__add-button');
const formElementCard = popupAddNewCard.querySelector('.form');

/**API*/
const apiParameters = {
  url: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    "Content-Type": "application/json",
    "authorization": "24558064-73eb-443e-9166-c200ecf9cdc1",
  }
};

export {
  validationParameters,
  profileUser,
  popupProfile,
  buttonOpenPopupProfile,
  formElementProfile,
  nameInput,
  jobInput,
  popupAddNewCard,
  formAddAvatar,
  avatar,
  buttonOpenAddNewCard,
  formElementCard,
  apiParameters
};
