import './index.css';

import {
  validationParameters,
  profileUser,
  buttonOpenPopupProfile,
  formElementProfile,
  nameInput,
  jobInput,
  formAddAvatar,
  avatar,
  buttonOpenAddNewCard,
  formElementCard,
  apiParameters
} from '../utils/contstants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

/**Валидация форм*/
const editProfileFormValidator = new FormValidator (validationParameters, formElementProfile);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator (validationParameters, formElementCard);
addCardFormValidator.enableValidation();
const addAvatarFormValidator = new FormValidator (validationParameters, formAddAvatar);
addAvatarFormValidator.enableValidation();

/**Создать новый элемент класса UserInfo */
const userProfile = new UserInfo(profileUser);

/**Создать новый элемент PopupWithForm для попапа редактирования профиля*/
const popupEditProfile = new PopupWithForm('.popup_type_edit', formSubmitProfile);

/**Создать новый элемент для попапа с картинкой */
const popupOpenImage = new PopupWithImage('.popup_type_image');

/**Создать новый элемент PopupWithForm для попапа добавления карточки*/
const popupAddCard = new PopupWithForm('.popup_type_new-card', formSubmitCard);

/**Создать новый элемент PopupWithForm для попапа обновления аватара*/
const popupAddAvatar = new PopupWithForm('.popup_type_avatar', formSubmitAvatar);

/**Создать новый элемент PopupWithForm для попапа удаления карточки*/
const popupDeleteCard = new PopupWithConfirm('.popup_type_confirm');

const api = new Api(apiParameters);

/**Промисы*/
Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([data, items]) => {
    userProfile.setUserInfo(data);
    userProfile.setUserAvatar(data);
    cardsGalegy.renderItems(items);
  })
  .catch ((err) => {
    console.log (err);
  })

/**Создать карточку (новая из формы или из массива)*/
function createCard(cardData) {
  cardData.currentUser = userProfile.getUserInfo();
  const card = new Card(cardData, '#card', {
    onClick: handleCardClick,

    onLike: (currentCardData, likeCallback) => {
      if (card.isLike()) {
        api
          .deleteLike(currentCardData._id)
          // вызов  функции из класса Card, которая меняет html
          .then((updatedCard) => likeCallback(updatedCard.likes))
          .catch((err) => {
            console.log('Ошибка', err);
          })
      } else {
        api
          .setLike(currentCardData._id)
          // вызов  функции из класса Card, которая меняет html
          .then((updatedCard) => likeCallback(updatedCard.likes))
          .catch((err) => {
            console.log('Ошибка', err);
          })
      }
    },

    onDelete: (currentCardData, deleteCallback) => {
      popupDeleteCard.open();
      popupDeleteCard.setConfirmAction(() => {
        api
        .deleteCard(currentCardData._id)

        .then(() => {
          popupDeleteCard.close();
          deleteCallback()
        })
        .catch((err) => {
          console.log('ERROR', err);
        })
      });
    }
  });

  /**Задать элемент "карта" и вызвать метод генерации у новой карточки*/
  const cardElement = card.generateCard();

  /**Вернуть созданную карточку*/
  return cardElement;
}

/**Загрузить карточки на страницу из массива через создание новой секции*/
const cardsGalegy = new Section({
  renderer: (cardData) => {
    cardsGalegy.addItem(createCard(cardData));
  },
}, '.photo__list');

/**Открыть попап с картинкой*/
function handleCardClick(name, link) {
  popupOpenImage.open(name, link);
};

/**Добавить первоначальные значения в форму редактирования профиля*/
function handleProfile() {
  const userData = userProfile.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
};

/**Заполнить форму профиля новыми данными, которые вводит пользователь*/
function formSubmitProfile({ name, about }) {
  popupEditProfile.setSavingMode();
  api.updateUserInfo({ name: name, about: about })
    .then((data) => {
      userProfile.setUserInfo(data)
    })
    .catch((err) => {
      console.log('ERROR', err);
    })
    .finally(() => popupEditProfile.removeSavingMode())
};

/**Обновить аватар через форму*/
function formSubmitAvatar({ avatar }) {
  popupAddAvatar.setSavingMode();
  api.updateUserAvatar({ avatar: avatar })
    .then((data) => {
      userProfile.setUserAvatar(data)
    })
    .catch((err) => {
      console.log('ERROR', err);
    })
    .finally(() => popupAddAvatar.removeSavingMode())
}

/**Добавить новую карточку через форму*/
function formSubmitCard(data) {
  popupAddCard.setSavingMode();
  api.addNewCard({ name: data.name, link: data.link })
    .then((res) => {
      cardsGalegy.addItem(createCard(res));
    })
    .catch((err) => {
      console.log('ERROR', err);
    })
    .finally(() => popupAddCard.removeSavingMode())
};

popupDeleteCard.setEventListeners();
popupEditProfile.setEventListeners();
popupAddAvatar.setEventListeners();
popupAddCard.setEventListeners();

buttonOpenPopupProfile.addEventListener('click', () => {
  editProfileFormValidator.toggleButtonState();
  popupEditProfile.open();
  handleProfile();
});

buttonOpenAddNewCard.addEventListener('click', () => {
  popupAddCard.open();
  addCardFormValidator.clearValidation();
})

avatar.addEventListener('click', () => {
  popupAddAvatar.open();
  addAvatarFormValidator.clearValidation();
})
