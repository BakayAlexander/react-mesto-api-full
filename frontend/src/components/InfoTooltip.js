import React from 'react';
import Popup from './Popup';

function InfoTooltip(props) {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose} name="info-tooltip">
      <div className="popup__container_info-tooltip">
        <img className="popup__info-tooltip-image" src={props.image} alt={props.alt} />
        <h2 className="popup__title_info-tooltip">{props.title}</h2>
        <button className="popup__button-close" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
