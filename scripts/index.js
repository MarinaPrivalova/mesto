/**имя профиля*/
const userName = document.querySelector(".profile__name");
/**профессия профиля*/
const userJob = document.querySelector(".profile__vocation");
/**попап редактирования профиля*/
const popupEditProfile = document.querySelector(".popup_type_edit");
/**кнопка редактирования профиля*/
const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
/**кнопка закрытия попапа редактирования профиля*/
const buttonCloseEditProfile = popupEditProfile.querySelector(".popup__close-button");
/**форма попапа изменения профиля*/
const formElementProfile = popupEditProfile.querySelector(".form");
/**инпут редактирования имени профиля*/
const nameInput = popupEditProfile.querySelector(".form__input_type_user-name");
/**инпут редактирования профессии профиля*/
const jobInput = popupEditProfile.querySelector(".form__input_type_vocation");
/**попап добавления карточки*/
const popupAddNewCard = document.querySelector(".popup_type_new-card");
/**кнопка добавления карточки*/
const buttonOpenAddNewCard = document.querySelector(".profile__add-button");
/**кнопка закрытия попапа добавления карточки*/
const buttonCloseAddNewCard = popupAddNewCard.querySelector(".popup__close-button");
/**форма попапа добавления карточки*/
const formElementCard = popupAddNewCard.querySelector(".form");
/**инпут добавления названия карточки*/
const imageNameInput = formElementCard.querySelector(".form__input_type_image-name");
/**инпут добавления ссылки на картинку*/
const imageLinkInput = formElementCard.querySelector(".form__input_type_image-link");
/**попап открытия карточки*/
const popupOpenImage = document.querySelector(".popup_type_image");
/**кнопка закрытия попапа открытия карточки*/
const buttonCloseImage = popupOpenImage.querySelector(".popup__close-button");
const popupImage = popupOpenImage.querySelector(".popup__image");
const popupImageTitle = popupOpenImage.querySelector(".popup__image-title");
/**получить содержимое template*/
const cardTemplate = document.querySelector("#card").content.querySelector('.card');
/**галерея карточек*/
const cardsGalegy = document.querySelector(".photo__list");

/**открыть попап*/
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
}

/**закрыть попап*/
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", closePopupByOverlay);
  document.removeEventListener("keydown", closePopupByEsc);
}

/**закрыть попап по клику на оверлей*/
function closePopupByOverlay(evt) {
  if (evt.target == evt.currentTarget) {
		closePopup(document.querySelector('.popup_opened'));
  }
}

/**закрыть попап нажатием на Esc*/
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
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

/**добавить готовые карточки*/
function createCard(cardData) {
  /**клонировать элементы карточки*/
  const cardElement = cardTemplate.cloneNode(true);
  const cardPhoto = cardElement.querySelector(".card__photo");
  const cardName = cardElement.querySelector(".card__title");
  const cardAltText = `На фото ${cardData.name}`;
  const buttonLike = cardElement.querySelector(".card__button-like");
  const buttonTrash = cardElement.querySelector(".card__button-trash");
  /**получить данные из initialCards*/
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardAltText;
  cardName.textContent = cardData.name;

  /**лайк фото*/
  buttonLike.addEventListener("click", () => {
    buttonLike.classList.toggle("card__button-like_active");
  });

  /**удаление карточки*/
  buttonTrash.addEventListener("click", () => {
    cardElement.remove();
  });

  /**открыть попап с картинкой*/
  cardPhoto.addEventListener("click", () => {
    popupImage.src = cardData.link;
    popupImageTitle.textContent = cardData.name;
    popupImage.alt = cardAltText;

    openPopup(popupOpenImage);
  });

  return cardElement;
}

/**функция отрисовки контейнера с карточками*/
function renderInitialCards() {
  const cards = initialCards.map(createCard);
  cardsGalegy.append(...cards);
}

/**добавить новую карточку*/
function addNewCard() {
  const nameInput = imageNameInput.value;
  const linkInput = imageLinkInput.value;
  const newCard = createCard({ name: nameInput, link: linkInput });
  cardsGalegy.prepend(newCard);
  formElementCard.reset();
}

/**сохранить новую карточку*/
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAddNewCard);
}

buttonOpenEditProfile.addEventListener("click", () => {
  const buttonElement = formElementProfile.querySelector('.form__save-button');
  buttonElement.setAttribute('disabled', true);
  openPopup(popupEditProfile);
  initProfileForm();
});
buttonCloseEditProfile.addEventListener("click", () => {
  closePopup(popupEditProfile);
  formElementProfile.reset();
  clearValidation(formElementProfile, validationParameters);
});
formElementProfile.addEventListener("submit", handleFormSubmitProfile);

buttonOpenAddNewCard.addEventListener("click", () => {
  const buttonElement = formElementCard.querySelector('.form__save-button');
  buttonElement.setAttribute('disabled', true);
  openPopup(popupAddNewCard);
});
buttonCloseAddNewCard.addEventListener("click", () => {
  closePopup(popupAddNewCard);
  formElementCard.reset();
  clearValidation(formElementCard, validationParameters);
});
formElementCard.addEventListener("submit", handleFormCardSubmit);

buttonCloseImage.addEventListener("click", () => {
  closePopup(popupOpenImage);
});

renderInitialCards();
