/**6 готовых карточек*/
const initialCards = [
  {
    name: "Алтай",
    link: "https://images.unsplash.com/photo-1598394188724-cdeb618eb4e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80",
  },
  {
    name: "Озеро Байкал",
    link: "https://images.unsplash.com/photo-1548130729-90d4d11826f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Карачаево-Черкессия",
    link: "https://images.unsplash.com/photo-1627327719562-f1f61e8364fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Ладожское озеро",
    link: "https://images.unsplash.com/photo-1632212383828-78d78ea41d8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
  },
  {
    name: "Сихотэ-Алинь",
    link: "https://images.unsplash.com/photo-1644543419167-2cc7a5738665?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Сулакский каньон",
    link: "https://images.unsplash.com/photo-1598535348425-e76a7cc312d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

/**все нужные функциям классы и селекторы элементов*/
const validationParameters = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inputErrorClass: 'form__input_type_error',
  inputErrorActive: 'form__input-error_active'
};
