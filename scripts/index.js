import { initialCards, validationParameters } from './contstants.js';
import Card from './Card.js';
import Section from './Section.js';
import Popup from './Popup.js';
import FormValidator from './FormValidator.js';

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

const editProfileFormValidator = new FormValidator (validationParameters, popupEditProfile);
const addCardFormValidator = new FormValidator (validationParameters, popupAddNewCard);

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
};

/**Загрузить карточки на страницу из массива через создание новой секции*/
const cardsGalegy = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsGalegy.addItem(createCard(item.name, item.link));
  },
}, '.card');

/**Добавить новую карточку на страницу*/
function addCard(cardElement) {
  cardsGalegy.addItem(cardElement);
}

cardsGalegy.renderItems();

buttonOpenEditProfile.addEventListener('click', () => {
  editProfileFormValidator.toggleButtonState();
  openPopup(popupEditProfile);
  initProfileForm();
});

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

buttonOpenAddNewCard.addEventListener('click', () => {
  addCardFormValidator.toggleButtonState();
  openPopup(popupAddNewCard);
});

formElementCard.addEventListener('submit', addCard);


editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
