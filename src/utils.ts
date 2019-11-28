import {Film} from './types';

const snakeToCamel = (word: string): string => word.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());

const normalizeKeys = (obj: object): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeKeys(item));
  }

  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => Object.assign(acc, {
      [snakeToCamel(key)]: normalizeKeys(obj[key]),
    }), {});
  }

  return obj;
};

const changeFilm = (films: Film[], newFilm: Film): Film[] => {
  return films.map((item) => {
    return item.id === newFilm.id ? newFilm : item;
  });
};

const changeVideoUrl = (films: Film[]): Film[] => films.map((item) => {
  item.previewVideoLink = `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`;
  return item;
});

export {normalizeKeys, changeFilm, changeVideoUrl};
