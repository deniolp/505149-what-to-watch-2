import React from 'react';
import renderer from 'react-test-renderer';

import BigPlayer from './big-player';
import filmsMocks from '../../mocks/films';

describe(`BigPlayer`, () => {
  const filmMock = filmsMocks[0];

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BigPlayer
          playingFilm={filmMock}
          onOpenCloseVideoButtonClick={jest.fn()}
          isPlaying={false}
          setIsPlaying={jest.fn()}
          progress={0}
          setProgress={jest.fn()}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
