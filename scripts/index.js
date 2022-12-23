// 6 готовых карточек
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
  ];
const userName = document.querySelector('.profile__name'); //имя профиля
const userJob = document.querySelector('.profile__vocation'); //профессия профиля
const popup = document.querySelector('.popup');
//попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button'); //кнопка закрытия попапа редактирования профиля
const formElementProfile = popupEditProfile.querySelector('.form'); //форма попапа изменения профиля
const nameInput = popupEditProfile.querySelector('.form__input_type_user-name'); //инпут редактирования имени профиля
const jobInput = popupEditProfile.querySelector('.form__input_type_vocation'); //инпут редактирования профессии профиля
//попап добавления карточки
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const buttonOpenAddNewCard = document.querySelector('.profile__add-button'); //кнопка добавления карточки
const buttonCloseAddNewCard = popupAddNewCard.querySelector('.popup__close-button'); //кнопка закрытия попапа добавления карточки
const formElementCard = popupAddNewCard.querySelector('.form'); //форма попапа добавления карточки
//попап открытия карточки
const popupOpenImage = document.querySelector('.popup_type_image');
const buttonCloseImage = popupOpenImage.querySelector('.popup__close-button'); //кнопка закрытия попапа открытия карточки
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupImageTitle = popupOpenImage.querySelector('.popup__image-title');

const cardTemplate = document.querySelector('#card').content; //получить содержимое template
const cardName = cardTemplate.querySelector ('.card__title');
const cardPhoto = cardTemplate.querySelector ('.card__photo');

const cardGalegy = document.querySelector('.photo__list'); //галерея карточек

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

//сохранить данные профиля
function handleFormSubmitProfile (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(popupEditProfile)
}

//добавить готовые карточки
function getCardElement(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //клонировать элементы карточки
    const link = cardElement.querySelector('.card__photo');
    const name = cardElement.querySelector('.card__title');
    const buttonLike = cardElement.querySelector('.card__button-like');
    const buttonTrash = cardElement.querySelector('.card__button-trash');

    link.src = item.link; //получить данные из initialCards
    link.alt = `На фото ${item.name}`;
    name.textContent = item.name;

    //лайк фото
    buttonLike.addEventListener('click', function(evt) {
      evt.target.classList.toggle('card__button-like_active');
    });

    //удаление карточки
    buttonTrash.addEventListener('click', function(evt) {
      const targetItem = evt.target.closest('.card');
      targetItem.remove();
    });  

    cardGalegy.append(cardElement); //добавление элементов в список
    return(cardElement);
  };

/*initialCards.forEach(getCardElement); //перебор массива - заменён на function render()*/

//функция отрисовки контейнера с карточками
function render() {
  const html = initialCards.map(getCardElement);
  cardGalegy.append(...html);
}; 

//добавить новую карточку
function addNewCard() {
    const linkInput = formElementCard.querySelector('.form__input_type_image-link').value;
    const nameInput = formElementCard.querySelector('.form__input_type_image-name').value;
    const newCard = getCardElement({name: nameInput, link: linkInput});
    cardGalegy.prepend(newCard);
    formElementCard.reset();
}

//сохранить новую карточку
function handleFormSubmitCard (evt) {
    evt.preventDefault();
    addNewCard();
    closePopup(popupAddNewCard);
}

//открыть попап с картинкой
function openCardImage(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageTitle.textContent = evt.target.alt;
    
    openPopup(popupOpenImage);
};

buttonOpenEditProfile.addEventListener('click', () => {openPopup(popupEditProfile); popupLoadData()});
buttonCloseEditProfile.addEventListener('click', () => {closePopup(popupEditProfile); deleteUnsavedData()});
formElementProfile.addEventListener('submit', handleFormSubmitProfile);

buttonOpenAddNewCard.addEventListener('click', () => {openPopup(popupAddNewCard);});
buttonCloseAddNewCard.addEventListener('click', () => {closePopup(popupAddNewCard);});
formElementCard.addEventListener('submit', handleFormSubmitCard);

cardPhoto.addEventListener('click', openCardImage);
buttonCloseImage.addEventListener('click', () => {closePopup(popupOpenImage);});

render();