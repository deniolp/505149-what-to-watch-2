import * as React from 'react';

const withLabel = ((Component) => {
  const WithLabel = (props) => {
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
