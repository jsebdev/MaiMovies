import PropTypes from "prop-types";
export class Media {
  constructor({ id, name, poster, media_type }) {
    this.id = id;
    this.name = name;
    this.poster = poster;
    this.mediaType = media_type;
  }
}

export const mediaPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  poster: PropTypes.object.isRequired,
});
