const initialCards = [
    {
      name: 'Алтай',
      link: 'https://images.unsplash.com/photo-1598394188724-cdeb618eb4e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80'
    },
    {
      name: 'Озеро Байкал',
      link: 'https://images.unsplash.com/photo-1548130729-90d4d11826f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Карачаево-Черкессия',
      link: 'https://images.unsplash.com/photo-1627327719562-f1f61e8364fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Ладожское озеро',
      link: 'https://images.unsplash.com/photo-1632212383828-78d78ea41d8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
    },
    {
      name: 'Сихотэ-Алинь',
      link: 'https://images.unsplash.com/photo-1644543419167-2cc7a5738665?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Сулакский каньон',
      link: 'https://images.unsplash.com/photo-1598535348425-e76a7cc312d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
  ]; // 6 готовых карточек
const buttonOpenEditProfile = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const buttonOpenAddNewCard = document.querySelector('.profile__add-button'); //кнопка добавления карточки
const buttonClose = document.querySelector('.popup__close-button');

/*const buttonCloseEditProfile = document.querySelector('.popup__close-button'); //кнопка закрытия попапа редактирования профиля
const buttonCloseAddNewCard = document.querySelector('.popup__close-button'); //кнопка закрытия попапа добавления карточки*/

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit'); //попап редактирования профиля
const popupAddNewCard = document.querySelector('.popup_type_new-card'); //попап добаления карточки
const userName = document.querySelector('.profile__name'); //имя профиля
const userJob = document.querySelector('.profile__vocation'); //профессия профиля
const cardName = document.querySelector ('.card__title'); //название карточки
const cardPhoto = document.querySelector ('.card__photo'); //фотография карточки
const formElement = document.querySelector('.popup__form'); //форма попапа
const nameInput = document.querySelector('.popup__input_type_user-name'); //инпут редактирования имени профиля
const jobInput = document.querySelector('.popup__input_type_vocation'); //инпут редактирования профессии профиля
const cardNameInput = document.querySelector('.popup__input_type_image-name'); //инпут добавления названия карточки
const cardLinkInput = document.querySelector('.popup__input_type_image-link'); //инпут добавления ссылки на фото
const cardGalegy =document.querySelector('.photo__list'); //галерея карточек

//открыть попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
};

//закрыть попап
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//загрузить данные из профиля
function popupLoadData() {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

//удалить несохранённые данные
function deleteUnsavedData() {
  nameInput.value = '';
  jobInput.value = '';
}

//сохранить данные
function handleFormSubmit (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(popup)
}

//добавить карточки
const getCard = initialCards.forEach(function getCardElement(item) {
    const cardTemplate = document.querySelector('#card').content; //получить содержимое template
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //клонировать элементы карточки
    const link = cardElement.querySelector('.card__photo');
    const name = cardElement.querySelector('.card__title');
    const buttonLike = cardElement.querySelector('.card__button-like');
    const buttonTrash = cardElement.querySelector('.card__button-trash');

    link.src = item.link; //получить данные из initialCards
    link.alt = item.name;
    name.textContent = item.name;

    buttonLike.addEventListener('click', function(evt) {
      evt.target.classList.toggle('card__button-like_active'); //лайк фото
    });

    buttonTrash.addEventListener('click', function(evt) {
      const targetItem = evt.target.closest('.card'); //удаление карточки
      targetItem.remove();
    });  

    cardGalegy.append(cardElement); //добавление элементов в список
  }); 



buttonOpenEditProfile.addEventListener('click', () => {openPopup(popupEditProfile); popupLoadData()});
buttonClose.addEventListener('click', () => {closePopup(popupEditProfile); deleteUnsavedData()});
formElement.addEventListener('submit', handleFormSubmit, closePopup(popupEditProfile));

buttonOpenAddNewCard.addEventListener('click', () => {openPopup(popupAddNewCard);});
buttonClose.addEventListener('click', () => {closePopup(popupAddNewCard);});




/*formElement.addEventListener('submit', handleFormSubmit, closePopup(popupAddNewCard));*/
/*cardName.textContent = cardNameInput.value;
    cardPhoto.textContent = cardLinkInput.value;*/
