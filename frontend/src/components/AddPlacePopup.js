import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function changeName(e) {
    setName(e.target.value);
  }

  function changeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name, link });
  }

  //Очищаем значени input в зависимости от открытия popup
  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      button="Создать"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      isSubmitting={props.isSubmitting}
    >
      <fieldset className="popup__inputs">
        <input
          className="popup__input popup__input_type_image-name"
          id="type_image-name"
          type="text"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          autoComplete="off"
          value={name ?? ''}
          onChange={changeName}
        />
        <span className=" popup__input-error popup__input-error_type_image-name"></span>
        <input
          className="popup__input popup__input_type_image-url"
          id="type_image-url"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off"
          value={link ?? ''}
          onChange={changeLink}
        />
        <span className="popup__input-error popup__input-error_type_image-url"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
