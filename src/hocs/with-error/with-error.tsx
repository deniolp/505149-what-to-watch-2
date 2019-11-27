import * as React from 'react';

const withError = ((Component) => {
  const WithError = (props) => {
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
