import * as React from 'react';
import {Link} from 'react-router-dom';

import VideoPlayer from '../video-player/video-player';
import {Film} from "../../types";

interface Props {
  film: Film;
  setIsPreviewPlaying: (isPreviewPlaying: boolean) => void;
  isPreviewPlaying: boolean;
}

const FilmCard = (props: Props): React.SFC => {
  const {film, isPreviewPlaying, setIsPreviewPlaying} = props;

  let timerId;
  const cardMouseEnterHandler = (): void => setIsPreviewPlaying(true);
  const clearTimer = (): void => timerId && clearTimeout(timerId);

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={(): void => {
      timerId = setTimeout(cardMouseEnterHandler, 1000);
    }}
    onMouseLeave={(): void => {
      clearTimer();
      setIsPreviewPlaying(false);
    }}
  >
    <Link
      to={`/film/${film.id}`}
      onClick={(): void => clearTimer()}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          preview={film.previewVideoLink}
          poster={film.posterImage}
          isPreviewPlaying={isPreviewPlaying}
        >
        </VideoPlayer>
      </div>
    </Link>
    <h3 className="small-movie-card__title">
      <Link
        to={`/film/${film.id}`}
        onClick={(): void => clearTimer()}
        className="small-movie-card__link"
      >
        {film.name}
      </Link>
    </h3>
  </article>;
};

export default React.memo(FilmCard);
