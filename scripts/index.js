import { initialCards, validationParameters } from './contstants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

/**имя профиля*/
const userName = document.querySelector('.profile__name');
/**профессия профиля*/
const userJob = document.querySelector('.profile__vocation');
/**попап редактирования профиля*/
const popupEditProfile = document.querySelector('.popup_type_edit');
/**кнопка редактирования профиля*/
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
/**кнопка закрытия попапа редактирования профиля*/
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button');
/**форма попапа изменения профиля*/
const formElementProfile = popupEditProfile.querySelector('.form');
/**инпут редактирования имени профиля*/
const nameInput = popupEditProfile.querySelector('.form__input_type_user-name');
/**инпут редактирования профессии профиля*/
const jobInput = popupEditProfile.querySelector('.form__input_type_vocation');
/**попап добавления карточки*/
const popupAddNewCard = document.querySelector('.popup_type_new-card');
/**кнопка добавления карточки*/
const buttonOpenAddNewCard = document.querySelector('.profile__add-button');
/**кнопка закрытия попапа добавления карточки*/
const buttonCloseAddNewCard = popupAddNewCard.querySelector('.popup__close-button');
/**форма попапа добавления карточки*/
const formElementCard = popupAddNewCard.querySelector('.form');
/**инпут добавления названия карточки*/
const imageNameInput = formElementCard.querySelector('.form__input_type_image-name');
/**инпут добавления ссылки на картинку*/
const imageLinkInput = formElementCard.querySelector('.form__input_type_image-link');
/**попап открытия карточки*/
const popupOpenImage = document.querySelector('.popup_type_image');
/**кнопка закрытия попапа открытия карточки*/
const buttonCloseImage = popupOpenImage.querySelector('.popup__close-button');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupImageTitle = popupOpenImage.querySelector('.popup__image-title');
/**галерея карточек*/
const cardsGalegy = document.querySelector('.photo__list');

const editProfileFormValidator = new FormValidator (validationParameters, popupEditProfile);
const addCardFormValidator = new FormValidator (validationParameters, popupAddNewCard);

/**открыть попап*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}

/**закрыть попап*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', closePopupByOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
}

/**закрыть попап по клику на оверлей*/
function closePopupByOverlay(evt) {
  if (evt.target == evt.currentTarget) {
		closePopup(document.querySelector('.popup_opened'));
  }
}

/**закрыть попап нажатием на Esc*/
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

/**загрузить данные из профиля*/
function initProfileForm() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

/**сохранить данные профиля*/
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

/**открыть попап с картинкой карточки*/
function handleClickCard(name, link) {
  popupImage.src = link;
  popupImageTitle.textContent = name;
  popupImage.alt = name;

  openPopup(popupOpenImage);
}

/**создать карточку (новая из формы или из массива)*/
function createCard(name, link) {
  const card = new Card(name, link, handleClickCard);
  const cardElement = card.generateCard();

  return cardElement;
}

/**добавить карточку*/
function addCard(cardElement) {
  cardsGalegy.prepend(cardElement);
}

/**добавить новую карточку*/
function addNewCard(evt) {
  evt.preventDefault();
  const cardElement = createCard(imageNameInput.value, imageLinkInput.value);
  addCard(cardElement, cardsGalegy);
  closePopup(popupAddNewCard);
  formElementCard.reset();
}

/**перебрать массив под существующие функции карточки (добавление/удаление/лайк)*/
initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link);
  addCard(cardElement);
})

buttonOpenEditProfile.addEventListener('click', () => {
  editProfileFormValidator.toggleButtonState();
  openPopup(popupEditProfile);
  initProfileForm();
});
buttonCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
  formElementProfile.reset();
  editProfileFormValidator.clearValidation();
});
formElementProfile.addEventListener('submit', handleFormSubmitProfile);

buttonOpenAddNewCard.addEventListener('click', () => {
  addCardFormValidator.toggleButtonState();
  openPopup(popupAddNewCard);
});
buttonCloseAddNewCard.addEventListener('click', () => {
  closePopup(popupAddNewCard);
  formElementCard.reset();
  addCardFormValidator.clearValidation();
 });
formElementCard.addEventListener('submit', addNewCard);

buttonCloseImage.addEventListener('click', () => {
  closePopup(popupOpenImage);
});

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
