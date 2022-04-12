import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  //Для получения доступа к input используем хук и получаем ref
  const inputRef = React.useRef({});

  // Передаем функцию onUpdateAvatar которая пошлет запрос к api с текущим состояниям ref, т.е. возьмет значение из input и пробросит в App.js, где находится обращение к api
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  //Очищаем значени input в зависимости от открытия popup
  React.useEffect(() => {
    inputRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      isSubmitting={props.isSubmitting}
    >
      <fieldset className="popup__inputs">
        <input
          className="popup__input popup__input_type_avatar"
          id="type_avatar"
          type="url"
          placeholder="Ссылка на аватар"
          name="link"
          required
          minLength="2"
          maxLength="200"
          autoComplete="off"
          //Подписываем ref и получаем прямой доступ к этому элементу, чтобы вытащить значение
          ref={inputRef}
        />
        <span className="popup__input-error popup__input-error_type_avatar"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
