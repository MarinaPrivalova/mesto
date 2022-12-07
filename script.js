const buttonShow = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_opened');
    
}

buttonShow.addEventListener('click', openPopup); 

сonsole.log('test') 




function closePopup() {
    popup.classList.remove('popup_opened');
}