import * as React from 'react';

const withValidated = ((Component) => {
  const WithValidated = (props) => {
    const [isRadioPressed, setIsRadioPressed] = React.useState(false);
    const [isValidated, setIsValidated] = React.useState(false);

    const handleRadioClick = () => {
      setIsRadioPressed(true);
    };

    const handleTextareaChange = (evt) => {
      evt.preventDefault();

      if (evt.target.value.length >= 50 && evt.target.value.length <= 400) {
        if (isRadioPressed) {
          setIsValidated(true);
        }
      } else {
        setIsValidated(false);
      }
    };

    return <Component
      {...props}
      isValidated={isValidated}
      onRadioClick={handleRadioClick}
      onTextareaChange={handleTextareaChange}
    />;
  };

  WithValidated.propTypes = {};

  return WithValidated;
});

export default withValidated;
