import React from 'react';
import Popup from './Popup';

function ImagePopup({ card, onClose, isOpen }) {
  return (
    //Если мы получили значение имени и ссылки карточки, то можно открыть popup
    <Popup onClose={onClose} name="pic" isOpen={isOpen}>
      <div className="popup__container-pic">
        <button className="popup__button-close" onClick={onClose} type="button" aria-label="Закрыть"></button>
        <img className="popup__pic" src={card.link} alt={card.name} />
        <h2 className="popup__title-pic">{card.name}</h2>
      </div>
    </Popup>
  );
}

export default ImagePopup;
