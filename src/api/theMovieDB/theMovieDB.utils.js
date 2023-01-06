import { Backdrop, Media, Poster } from "@app/domain/MediaClass";

const getMediaName = (media) => media.original_title || media.original_name;

export const apiMedia2Media = (
  media,
  postersBaseSizes,
  backdropBaseSizes,
  baseImageUrl
) => {
  const posterSizes = {};
  Object.keys(postersBaseSizes).forEach((size) => {
    posterSizes[size] = postersBaseSizes[size];
  });
  const backdropSizes = {};
  Object.keys(backdropBaseSizes).forEach((size) => {
    backdropSizes[size] = backdropBaseSizes[size];
  });
  return new Media({
    name: getMediaName(media),
    id: media.id,
    poster: new Poster({ posterPath: media.poster_path, posterSizes }),
    backdrop: new Backdrop({
      backdropPath: media.backdrop_path,
      backdropSizes,
    }),
    baseImageUrl,
    ...media,
  });
};
