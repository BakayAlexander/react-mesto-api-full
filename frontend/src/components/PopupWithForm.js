import React from 'react';
import BouncingLoader from '../utils/BouncingLoader';
import Popup from './Popup';

function PopupWithForm({ name, title, button, onClose, children, isOpen, onSubmit, isSubmitting }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={`form-${name}`} className="popup__form" onSubmit={onSubmit}>
          {children}
          <button className="popup__button-save" type="submit">
            {!isSubmitting ? button : <BouncingLoader />}
          </button>
        </form>
        <button className="popup__button-close" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
