import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Operation} from '../../reducer/reducer';

interface Props {
  submitForm: (email: string, password: string) => void;
  isAuthorizationRequired: boolean;
  error: string;
  setError: (error: string) => void;
}

const SignIn = (props: Props): React.SFC => {
  const {submitForm, isAuthorizationRequired, error, setError} = props;
  const handleFormSubmit = (email, password = null): void => {
    if (!password) {
      setError(`Error! What about enter password? :-)`);
    } else {
      submitForm(email, password);
    }
  };

  return isAuthorizationRequired ? <div className="user-page">
    <header className="page-header user-page__head">
      <div className="logo">
        <a href="/" className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <h1 className="page-title user-page__title">Sign in</h1>
    </header>

    <div className="sign-in user-page__content">
      <form action="#" className="sign-in__form" onSubmit={(evt): void => {
        evt.preventDefault();
        const data = new FormData(evt.currentTarget);
        handleFormSubmit(data.get(`user-email`), data.get(`user-password`));
      }}>
        <div className="sign-in__fields">
          <div className="sign-in__field">
            <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
            <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
          </div>
          <div className="sign-in__field">
            <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
            <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
          </div>
        </div>
        <div className="sign-in__submit">
          <button className="sign-in__btn" type="submit">Sign in</button>
        </div>
      </form>
      {error && <div>{error}</div>}
    </div>

    <footer className="page-footer">
      <div className="logo">
        <a href="main.html" className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  </div> : <Redirect to="/"></Redirect>;
};

const mapDispatchToProps = (dispatch): object => ({
  submitForm: (email, password): void => dispatch(Operation.logIn(email, password)),
});

export {SignIn};
export default connect(null, mapDispatchToProps)(React.memo(SignIn));
