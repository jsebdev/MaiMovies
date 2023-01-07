import PropTypes from "prop-types";
export class Media {
  constructor({
    id,
    name,
    poster,
    media_type,
    backdrop,
    baseImageUrl,
    genres,
    budget,
    homepage,
    overview,
    releaseDate,
    revenue,
    runtime,
    status,
    tagline,
    averageVote,
  }) {
    this.id = id;
    this.name = name;
    this.poster = poster;
    this.mediaType = media_type;
    this.backdrop = backdrop;
    this.baseImageUrl = baseImageUrl;
    this.genres = genres;
    this.budget = budget;
    this.homepage = homepage;
    this.overview = overview;
    this.releaseDate = releaseDate;
    this.revenue = revenue;
    this.runtime = runtime;
    this.status = status;
    this.tagline = tagline;
    this.averageVote = averageVote;
  }

  getPoster(size) {
    return `${this.baseImageUrl}${this.poster.posterSizes[size]}${this.poster.posterPath}`;
  }

  getBackdrop(size) {
    return `${this.baseImageUrl}${this.backdrop.backdropSizes[size]}${this.backdrop.backdropPath}`;
  }
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
