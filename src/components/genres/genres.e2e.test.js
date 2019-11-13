import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import filmsMocks from '../../mocks/films';
import Genres from './genres';

Enzyme.configure({adapter: new Adapter()});

describe(`In Genres`, () => {
  const genreClickHandler = jest.fn();
  const genresSet = new Set().add(`All genres`);
  filmsMocks.forEach((film) => genresSet.add(film.genre));

  const GenresWrapper = mount(<Genres
    activeGenre={`Thriller`}
    onGenreClick={genreClickHandler}
    genres={genresSet}
  />);
  const linkElements = GenresWrapper.find(`a`);

  it(`clicking on different links calling onGenreClick with proper genre`, () => {
    expect(GenresWrapper.prop(`activeGenre`)).toEqual(`Thriller`);
    linkElements.at(3).simulate(`click`);
    expect(genreClickHandler).toHaveBeenCalledTimes(1);
    expect(genreClickHandler).toHaveBeenCalledWith(linkElements.at(3).text());
    linkElements.at(1).simulate(`click`);
    expect(genreClickHandler).toHaveBeenCalledTimes(2);
    expect(genreClickHandler).toHaveBeenCalledWith(linkElements.at(1).text());
    linkElements.at(0).simulate(`click`);
    expect(genreClickHandler).toHaveBeenCalledTimes(3);
    expect(genreClickHandler).toHaveBeenCalledWith(linkElements.at(0).text());
  });
});
