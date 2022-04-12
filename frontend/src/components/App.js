import React from 'react';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Main from './Main';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { Switch, Route, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import doneImage from '../images/done.svg';
import falseImage from '../images/false.svg';
import * as auth from '../utils/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isRendering, setIsRendering] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isFalsePopupOpen, setIsFalsePopupOpen] = React.useState(false);
  const [isDonePopupOpen, setIsDonePopupOpen] = React.useState(false);
  const [deleteCardId, setDeleteCardId] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setIsLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    api
      .getProfileData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleOpenFalsePopup() {
    setIsFalsePopupOpen(true);
  }

  function handleOpenDonePopup() {
    setIsDonePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsFalsePopupOpen(false);
    setIsDonePopupOpen(false);
  }

  //Ф-я принимает на вход объект с данными и на основе них отправляет PATCH запрос к api. Объявляем ее тут, а потом передаем в EditProfilePopup прокидывая через пропс. Затем из EditProfilePopup прокидываем ее в PopupWithForm, чтобы все запускалось при сабмите формы.
  function handleUpdateUser({ name, about }) {
    setIsSubmitting(true);
    api
      .editProfile(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
        setIsSubmitting(false);
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsSubmitting(true);
    api
      .editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
        setIsSubmitting(false);
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }

  //Большой блок работы с карточками. Тут используем технику поднятия стейта, чтобы прокинуть все в нижестоящие компоненты

  React.useEffect(() => {
    api
      .getCardsData()
      .then((data) => {
        setCards(data);
      })
      .then(() => {
        setIsRendering(false);
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }, []);

  //Добавляем ф-ю постановки like на карточки
  function handleCardLike(id, isLiked) {
    api
      .changeLikeCardStatus(id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((card) => (card._id === id ? newCard : card)));
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }

  //Ф-я добавления новой карточки
  function handleAddPlaceSubmit({ name, link }) {
    setIsSubmitting(true);
    api
      .addNewCard(name, link)
      //обновляем стейт с помощью расширеной копии существуещего массива стейта, используем для этого spread-оператор
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsSubmitting(false);
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }

  //Добавляем ф-ю удаления собственных карточек, ее прокидываем в DeleteCardPopup. В качестве id будем использовать стейт-переменную deleteCardId, которую прокидываем в тот же компонент.
  function handleCardDelete(id) {
    setIsSubmitting(true);
    api
      .deleteCard(id)
      .then(() => {
        const arr = cards.filter((card) => card._id !== id);
        setCards(arr);
        closeAllPopups();
        setIsSubmitting(false);
      })
      .catch((err) => {
        alert(`Возникла ошибка: ${err}`);
      });
  }

  //Работаем c popup удаления карточек. Вначале устанавливаем стейт для открытия DeleteCardPopup. Потом меняем значение стейт-переменной deleteCardId. Все это передаем в компонент Main, где прокинем дальше в компонент Card.
  function handleDeleteCardClick(cardId) {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setDeleteCardId(cardId);
  }

  //Работает с аутентификацией
  function handleLogin(email, password) {
    setIsLoggedIn(true);

    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          //Меняем стейт email чтобы обновить информацию в Header
          setEmail(email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        handleOpenFalsePopup();
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        //400 это код ошибки, если его нет, то переходим на страницу авторизации и меняем стейт для открытия попапа
        if (res.statusCode !== 400) {
          history.push('/sign-in');
          handleOpenDonePopup();
        }
      })
      .catch((err) => {
        console.log(err);
        handleOpenFalsePopup();
      });
  }

  //Хендлер для задания стейта email пользователя при авторизации(чтобы email сразу попадал в блок Header)
  function handleUpdateUserEmail(mail) {
    setEmail(mail);
  }

  return (
    <div className="page__container-global">
      {/* Подписываем компоненты на контекст текущего пользователя */}
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          {/* В защищенный маршрут складываем компонент Main и все его props */}
          <ProtectedRoute
            component={Main}
            exact
            path="/"
            isLoggedIn={isLoggedIn}
            isRendering={isRendering}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            email={email}
          />
          <Route path="/sign-up">
            <Register onSubmit={handleRegister} onDone={handleOpenDonePopup} />
          </Route>
          <Route path="/sign-in">
            <Login onSubmit={handleLogin} updateUserEmail={handleUpdateUserEmail} />
          </Route>
        </Switch>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSubmitting={isSubmitting}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isSubmitting={isSubmitting}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isSubmitting={isSubmitting}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          //Используем стейт, чтобы передать id удаляемой карточки
          cardId={deleteCardId}
          isSubmitting={isSubmitting}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
        <InfoTooltip
          isOpen={isFalsePopupOpen}
          onClose={closeAllPopups}
          image={falseImage}
          title="Что-то пошло не так! Попробуйте еще раз."
          alt="Что-то пошло не так. Попробуйте еще раз."
        />
        <InfoTooltip
          isOpen={isDonePopupOpen}
          onClose={closeAllPopups}
          image={doneImage}
          title="Вы успешно зарегистрировались!"
          alt="Вы успешно зарегистрировались."
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
