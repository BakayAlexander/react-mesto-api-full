import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  // Чтобы подставить текущией данные с api в форму используем хук useEffect, и подставим контекст.Также посдтавляем данные в случае если пользователь закрыл попап не сохранив изменения.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      button="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      isSubmitting={props.isSubmitting}
    >
      <fieldset className="popup__inputs">
        <input
          className="popup__input popup__input_type_name"
          id="type_name"
          type="text"
          name="fullname"
          required
          minLength="2"
          maxLength="40"
          autoComplete="off"
          //Прописываем выбор, чтобы в консоль не падало предупреждение о ошибке
          value={name ?? ''}
          onChange={handleChangeName}
        />
        <span className="popup__input-error popup__input-error_type_name"></span>
        <input
          className="popup__input popup__input_type_description"
          id="type_description"
          type="text"
          name="description"
          required
          minLength="2"
          maxLength="200"
          autoComplete="off"
          //Прописываем выбор, чтобы в консоль не падало предупреждение о ошибке
          value={description ?? ''}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error popup__input-error_type_description"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
