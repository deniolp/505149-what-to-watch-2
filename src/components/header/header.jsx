import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Avatar from '../avatar/avatar';

const Header = (props) => {
  const {user} = props;

  const path = location.pathname === `/` ? null : `/`;

  return <React.Fragment>
    <h1 className="visually-hidden">WTW</h1>
    <header className="page-header movie-card__head">
      <div className="logo">
        <a className="logo__link" href={path}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>
      <Avatar user={user}/>
    </header>
  </React.Fragment>;
};

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: state.user,
});

export {Header};
export default connect(mapStateToProps, null)(Header);
