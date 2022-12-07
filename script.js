const buttonShow = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__close-button');

const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__vocation');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#vocation');


function openPopup() {
    popup.classList.add('popup_opened');
}
buttonShow.addEventListener('click', openPopup); 

function closePopup() {
    popup.classList.remove('popup_opened');
}
buttonClose.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);    
