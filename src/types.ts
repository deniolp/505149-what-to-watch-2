export interface Film {
  id: number,
  name: string,
  posterImage: string,
  previewVideoLink: string,
  videoLink: string,
  backgroundColor: string,
  backgroundImage: string,
  previewImage: string,
  genre: string,
  released: number,
  rating: number,
  scoresCount: number,
  runTime: number,
  description: string,
  director: string,
  starring: Array<string>,
  isFavorite: boolean,
}

export interface User {
  id: number,
  name: string,
  email: string,
  avatarUrl: string,
}
