import React from 'react';
import editButton from '../images/edit_button.svg';
import addButton from '../images/add_button.svg';
import Card from './Card';
import Header from './Header';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

//Эти значения мы прокидываем из App, если мы не деструктурируем, то при прокидывании дальше через props. допустим в Card полетят undefined. Деструктурировать обязательно. ...props в конце добавляем для того чтобы не потерять оставшиеся вне деструктуризации пропсы
function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete, ...props }) {
  //Подписка на контекст текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);

  const history = useHistory();

  function signOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
    <>
      <Header>
        <div className="header__user-container">
          <p className="header__user-email">{props.email}</p>
          <button className="header__button" onClick={signOut}>
            Выйти
          </button>
        </div>
      </Header>
      <main className="content">
        <section className="profile page__container-profile">
          <div className="profile__container">
            <div className="profile__pic-container">
              <button className="profile__pic-button" onClick={onEditAvatar} type="button" aria-label="Редактировать">
                <img
                  src={currentUser?.avatar ?? 'https://anatomised.com/wp-content/uploads/2016/05/spinner-test4.gif'}
                  alt="Фото профиля"
                  className="profile__pic"
                />
              </button>
            </div>
            <div className="profile__info">
              <div className="profile__name-container">
                <h1 className="profile__name">{currentUser?.name ?? '... getting data'}</h1>
                <button
                  className="profile__edit-button"
                  onClick={onEditProfile}
                  type="button"
                  aria-label="Редактировать"
                >
                  <img src={editButton} alt="Кнопка Редактировать" className="profile__edit-pic" />
                </button>
              </div>
              <p className="profile__description">{currentUser?.about ?? ''}</p>
            </div>
          </div>
          <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Добавить карточку">
            <img src={addButton} alt="Кнопка Добавления" className="profile__add-pic" />
          </button>
        </section>
        <section className="elements page__container-elements">
          {/* Сюда добавляем карточки. Нужно пройтись по массиву с карточками, сразу делаем деструктуризацию. Отдельно пробрасываем id, а все остальные пропсы собираем spread-оператором   */}
          {props.cards.map(({ _id, ...props }) => (
            <Card
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={_id}
              id={_id}
              {...props}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
