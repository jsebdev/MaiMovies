import PropTypes from "prop-types";
export class Media {
  constructor({ id, name, poster }) {
    this.id = id;
    this.name = name;
    this.poster = poster;
  }
}

export const mediaPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  poster: PropTypes.object.isRequired,
});
