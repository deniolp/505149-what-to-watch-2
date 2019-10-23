import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';

import MainPage from '../main-page/main-page';
import FilmDetails from '../film-details/film-details';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
    };

    this._handleFilmTitleClick = this._handleFilmTitleClick.bind(this);
  }

  render() {
    const {films} = this.props;
    return <Switch>
      <Route path="/" exact render={() => {
        return <MainPage
          films={films}
          onFilmTitleClick={this._handleFilmTitleClick}
        />;
      }}
      />
      <Route path="/film/:id" render={(routerProps) => {
        return <FilmDetails
          film={films[this.state.id]}
          {...routerProps}
        />;
      }}
      />
      <Redirect from='*' to='/' />
    </Switch>;
  }

  _handleFilmTitleClick(id) {
    this.setState({
      id: id - 1,
    });
  }
}

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  })),
};

export default App;
