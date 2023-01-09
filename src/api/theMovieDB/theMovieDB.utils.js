import { Backdrop, Genre, Media, Poster } from "@app/domain/MediaClass";
import { Video } from "@app/domain/VideoClass";

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
    ...media,
    name: getMediaName(media),
    id: media.id,
    poster: new Poster({ posterPath: media.poster_path, posterSizes }),
    backdrop: new Backdrop({
      backdropPath: media.backdrop_path,
      backdropSizes,
    }),
    baseImageUrl,
    genres: media.genres?.map((genre) => new Genre(genre)),
    budget: media.budget,
    homepage: media.homepage,
    overview: media.overview,
    releaseDate: media.release_date,
    revenue: media.revenue,
    runtime: media.runtime,
    status: media.status,
    tagline: media.tagline,
    averageVote: media.vote_average,
  });
};

export const throwError = (err, consoleMessage = "No consoleMessage") => {
  console.error(consoleMessage);
  console.error(err);
  throw err;
};

export const apiVideo2Video = ({ name, key, site, type, official, id }) => {
  return new Video({ name, key, site, type, official, id });
};
