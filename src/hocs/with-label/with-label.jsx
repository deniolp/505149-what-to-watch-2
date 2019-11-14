import React, {useState} from 'react';

const withLabel = ((Component) => {
  const WithLabel = (props) => {
    const [label, setLabel] = useState(`Overview`);
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
