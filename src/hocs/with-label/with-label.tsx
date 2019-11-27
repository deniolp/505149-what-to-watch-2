import * as React from 'react';

const withLabel = ((Component: React.SFC): React.SFC => {
  const WithLabel = (props): React.SFC => {
    const [label, setLabel] = React.useState(`Overview`);
    return <Component
      {...props}
      label={label}
      setLabel={setLabel}
    />;
  };

  WithLabel.propTypes = {};

  return WithLabel;
});

export default withLabel;
