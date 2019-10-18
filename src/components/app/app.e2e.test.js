import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../app/app';

Enzyme.configure({adapter: new Adapter()});

describe(`In App`, () => {
  const filmsListMock = [`Aviator`, `Shutter Island`, `Macbeth`, `Revenant`];

  it(`onclick calling by clicking on button`, () => {
    const clickHandler = jest.fn();
    const app = shallow(<App
      films={filmsListMock}
      onTitleClick={clickHandler}
    />);

    const titleButtons = app.find(`.small-movie-card__title`);
    titleButtons.forEach((button) => button.simulate(`click`));

    expect(clickHandler).toHaveBeenCalledTimes(filmsListMock.length);
  });
});
