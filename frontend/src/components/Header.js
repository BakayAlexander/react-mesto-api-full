import React from 'react';
import logoPic from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header page__container-header">
      <img className="header__logo" src={logoPic} alt="Логотип проекта" />
      {props.children}
    </header>
  );
}

export default Header;
