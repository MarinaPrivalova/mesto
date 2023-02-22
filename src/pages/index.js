import './index.css';

import {
  initialCards,
  validationParameters,
  buttonOpenPopupProfile,
  formElementProfile,
  nameInput,
  jobInput,
  buttonOpenAddNewCard,
  formElementCard,
  imageNameInput,
  imageLinkInput
} from '../utils/contstants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

/**Валидация форм*/
const editProfileFormValidator = new FormValidator (validationParameters, formElementProfile);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator (validationParameters, formElementCard);
addCardFormValidator.enableValidation();

/**Создать новый элемент класса UserInfo */
const newUser = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__vocation'
});

/**Создать новый элемент PopupWithImage для попапа редактирования профиля*/
const popupEditProfile = new PopupWithForm('.popup_type_edit', formSubmitProfile);

/**Создать новый элемент для попапа с картинкой */
const popupOpenImage = new PopupWithImage('.popup_type_image');

/**Создать новый элемент PopupWithImage для попапа добавления карточки*/
const popupAddCard = new PopupWithForm('.popup_type_new-card', formSubmitCard);

/**Загрузить карточки на страницу из массива через создание новой секции*/
const cardsGalegy = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsGalegy.addItem(createCard(item.name, item.link));
  },
}, '.photo__list');

/**создать карточку (новая из формы или из массива)*/
function createCard(name, link) {
  const card = new Card(name, link, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

/**Добавить новую карточку на страницу*/
function addCard(cardElement) {
  cardsGalegy.addItem(cardElement);
}
cardsGalegy.renderItems();

/**Добавить новую карточку через форму*/
function formSubmitCard(evt) {
  const cardElement = createCard(imageNameInput.value, imageLinkInput.value);
  addCard(cardElement);
  popupAddCard.close();
}

/**Открыть попап с картинкой*/
function handleCardClick(name, link) {
  popupOpenImage.open(name, link);
}

/**Добавить первоначальные значения в форму*/
function handleProfile() {
  const userData = newUser.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
};

/**Заполнить форму Профиля новыми данными, которые вводит пользователь*/
function formSubmitProfile(formData) {
  newUser.setUserInfo(formData);
  popupEditProfile.close();
  }

buttonOpenPopupProfile.addEventListener('click', () => {
  editProfileFormValidator.toggleButtonState();
  popupEditProfile.open();
  handleProfile();
});

buttonOpenAddNewCard.addEventListener('click', () => {
  formElementCard.reset();
  popupAddCard.open();
  addCardFormValidator.clearValidation();
})
