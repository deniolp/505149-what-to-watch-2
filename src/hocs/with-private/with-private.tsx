import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

interface Props {
  isAuthorizationRequired: boolean;
}

const withPrivate = ((Component: React.SFC): React.SFC => {
  const WithPrivate = (props: Props): React.SFC => {
    const {isAuthorizationRequired} = props;
    if (isAuthorizationRequired) {
      return <Redirect to="/login" />;
    } else {
      return <Component
        {...props}
      />;
    }
  };

  const mapStateToProps = (state, ownProps): void => Object.assign({}, ownProps, {
    isAuthorizationRequired: state.isAuthorizationRequired,
  });

  return connect(mapStateToProps, null)(WithPrivate);
});

export default withPrivate;
