import PropTypes from "prop-types";
export class Media {
  constructor({ id, name, poster, media_type, backdrop, baseImageUrl }) {
    this.id = id;
    this.name = name;
    this.poster = poster;
    this.mediaType = media_type;
    this.backdrop = backdrop;
    this.baseImageUrl = baseImageUrl;
  }

  getPoster(size) {
    return `${this.baseImageUrl}${this.poster.posterSizes[size]}${this.poster.posterPath}`;
  }

  getBackdrop(size) {
    return `${this.baseImageUrl}${this.backdrop.backdropSizes[size]}${this.backdrop.backdropPath}`;
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
