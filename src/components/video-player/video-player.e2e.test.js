import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VideoPlayer from './video-player';
import filmsListMock from '../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

describe(`In VideoPlayer`, () => {
  const preview = filmsListMock[0].previewVideoLink;
  const poster = filmsListMock[0].posterImage;
  const playStub = jest.spyOn(window.HTMLMediaElement.prototype, `play`).mockImplementation(() => {});
  const pauseStub = jest.spyOn(window.HTMLMediaElement.prototype, `pause`).mockImplementation(() => {});
  const loadStub = jest.spyOn(window.HTMLMediaElement.prototype, `load`).mockImplementation(() => {});

  const videoPlayer = mount(<VideoPlayer
    preview={preview}
    poster={poster}
    isPreviewPlaying={true}
  />);

  it(`if isPreviewPlaying is true, playing of video should start`, () => {
    expect(videoPlayer.prop(`isPreviewPlaying`)).toEqual(true);
    expect(playStub).toHaveBeenCalled();
  });

  it(`if isPreviewPlaying is false, playing of video should be paused and got reset`, () => {
    videoPlayer.setProps({isPreviewPlaying: false});
    expect(videoPlayer.prop(`isPreviewPlaying`)).toEqual(false);
    expect(pauseStub).toHaveBeenCalled();
    expect(loadStub).toHaveBeenCalled();
  });
});
