import React from 'react';
import * as auth from '../utils/auth';
import { useHistory } from 'react-router-dom';
import Header from './Header';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(email, password);
  }

  function handleGoToSignUp() {
    history.push('/sign-up');
  }

  return (
    <>
      <Header>
        <div className="header__user-container">
          <button className="header__button" onClick={handleGoToSignUp}>
            Зарегистрироваться
          </button>
        </div>
      </Header>
      <section className="login">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <fieldset className="auth__inputs">
            <input
              className="auth__input"
              type="email"
              minLength="4"
              maxLength="30"
              placeholder="Email"
              required
              value={email ?? ''}
              onChange={handleChangeEmail}
            />
            <input
              className="auth__input"
              type="password"
              minLength="5"
              maxLength="20"
              placeholder="Пароль"
              required
              value={password ?? ''}
              onChange={handleChangePassword}
            />
          </fieldset>
          <button className="auth__button" type="submit">
            Войти
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
