import { Media } from "@app/domain/MediaType";

const getMediaName = (media) => media.original_title || media.original_name;

export const apiMedia2Media = (media, postersBaseLinks) => {
  const poster = {};
  Object.keys(postersBaseLinks).forEach((size) => {
    poster[size] = `${postersBaseLinks[size]}${media.poster_path}`;
  });
  return new Media({
    name: getMediaName(media),
    id: media.id,
    poster,
  });
};
