import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const withPrivate = ((Component) => {
  const WithPrivate = (props) => {
    const {isAuthorizationRequired} = props;
    if (isAuthorizationRequired) {
      return <Redirect to="/login" />;
    } else {
      return <Component
        {...props}
      />;
    }
  };

  WithPrivate.propTypes = {
    isAuthorizationRequired: PropTypes.bool.isRequired,
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    isAuthorizationRequired: state.isAuthorizationRequired,
  });

  return connect(mapStateToProps, null)(WithPrivate);
});

export default withPrivate;
