import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Operation} from '../../reducer/reducer';

const SignIn = (props) => {
  const {submitForm, isAuthorizationRequired} = props;
  const handleFormSubmit = (email, password) => {
    submitForm(email, password);
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
      <form action="#" className="sign-in__form" onSubmit={(evt) => {
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

SignIn.propTypes = {
  submitForm: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitForm: (email, password) => dispatch(Operation.logIn(email, password)),
});

export {SignIn};
export default connect(null, mapDispatchToProps)(SignIn);
