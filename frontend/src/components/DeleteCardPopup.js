import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ onDeleteCard, card, ...props }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(props.cardId);
  }

  return (
    <PopupWithForm
      name="card-delete"
      title="Вы уверены?"
      button="Да"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      isSubmitting={props.isSubmitting}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
