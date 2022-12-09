const buttonShow = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__close-button');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__vocation');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#vocation');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
    nameInput.value = '';
    jobInput.value = '';
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    return closePopup();
}

buttonShow.addEventListener('click', openPopup); 
buttonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);