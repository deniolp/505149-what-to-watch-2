import * as React from 'react';

const withError = ((Component: React.SFC): React.SFC => {
  const WithError = (props): React.SFC => {
    const [error, setError] = React.useState(null);
    return <Component
      {...props}
      error={error}
      setError={setError}
    />;
  };

  WithError.propTypes = {};

  return WithError;
});

export default withError;
