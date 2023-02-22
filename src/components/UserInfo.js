export default class UserInfo {
  constructor({ userNameSelector, userJobSelector}) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userJobSelector = document.querySelector(userJobSelector);
  }

  /**Вернуть данные пользователя (возможность подставить в форму)*/
  getUserInfo() {
    const userData = {
      name: this._userNameSelector.textContent,
      job: this._userJobSelector.textContent
    };
    return userData;
  }

  /**Принять новые данные и добавить на страницу*/
  setUserInfo({ name, job }) {
    this._userNameSelector.textContent = name;
    this._userJobSelector.textContent = job;
  }
}