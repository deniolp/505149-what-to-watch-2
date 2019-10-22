import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main-page/main-page';

const App = ({films}) => {
  return <MainPage films={films} />;
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })),
};

export default App;
