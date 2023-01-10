import { makeObservable, observable } from "mobx";
import PropTypes from "prop-types";
export class Media {
  videos = [];
  constructor({
    id,
    name,
    poster,
    media_type,
    backdrop,
    baseImageUrl,
    genres,
    homepage,
    overview,
    status,
    averageVote,
    productionCompanies,
    mediaType,
  }) {
    makeObservable(this, {
      videos: observable,
    });
    this.id = id;
    this.name = name;
    this.poster = poster;
    this.mediaType = media_type;
    this.backdrop = backdrop;
    this.baseImageUrl = baseImageUrl;
    this.genres = genres;
    this.homepage = homepage;
    this.overview = overview;
    this.status = status;
    this.averageVote = averageVote;
    this.mediaType = mediaType;
    this.productionCompanies = productionCompanies;
  }

  getPoster(size) {
    return `${this.baseImageUrl}${this.poster.posterSizes[size]}${this.poster.posterPath}`;
  }

  getBackdrop(size) {
    return `${this.baseImageUrl}${this.backdrop.backdropSizes[size]}${this.backdrop.backdropPath}`;
  }

  // set videos(vid) {
  //   this._videos = vid;
  // }

  // get videos() {
  //   return this._videos;
  // }
}

export class Genre {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

export const mediaPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  poster: PropTypes.object.isRequired,
});

export class Poster {
  constructor({ posterPath, posterSizes }) {
    this.posterPath = posterPath;
    this.posterSizes = posterSizes;
  }
}

export class Backdrop {
  constructor({ backdropPath, backdropSizes }) {
    this.backdropPath = backdropPath;
    this.backdropSizes = backdropSizes;
  }
}
