import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main-page/main-page';
import FilmDetails from '../film-details/film-details';

const App = (props) => {
  const getPageScreen = ({films}) => {
    switch (location.pathname) {
      case `/`:
        return <MainPage
          films={films}
        />;
      case `/details`:
        return <FilmDetails
          film={films[0]}
        />;
    }
    return null;
  };
  return <React.Fragment>{getPageScreen(props)}</React.Fragment>;
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })),
};

export default App;
