import { Backdrop, Genre, Poster } from "@app/domain/MediaClass";
import { Movie } from "@app/domain/MovieClass";
import { TvShow } from "@app/domain/TvShowClass";
import { Video } from "@app/domain/VideoClass";
import { MEDIA_TYPES } from "@app/utils/constants";

const getMediaName = (media) =>
  media.name || media.title || media.original_name || media.original_title;

export const apiMedia2Media = (
  media,
  mediaType,
  { baseImageUrl, postersBaseSizes, backdropBaseSizes, stillBaseSizes }
) => {
  const mediaProps = {
    name: getMediaName(media),
    id: media.id,
    poster: new Poster({
      posterPath: media.poster_path,
      posterSizes: postersBaseSizes,
    }),
    backdrop: new Backdrop({
      backdropPath: media.backdrop_path,
      backdropSizes: backdropBaseSizes,
    }),
    baseImageUrl,
    genres: media.genres?.map((genre) => new Genre(genre)),
    homepage: media.homepage,
    overview: media.overview,
    status: media.status,
    tagline: media.tagline,
    averageVote: media.vote_average,
    productionCompanies: media.production_companies,
    mediaType,
    stillBaseSizes,
  };

  const mediaClass = specificMediaClasses[mediaType];

  return new mediaClass({
    ...mediaProps,
    ...specificMediaProps[mediaType](media),
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

const specificMediaClasses = {
  [MEDIA_TYPES.movie]: Movie,
  [MEDIA_TYPES.tv]: TvShow,
};

const specificMediaProps = {
  [MEDIA_TYPES.movie]: (media) => ({
    budget: media.budget,
    runtime: media.runtime,
    releaseDate: media.release_date,
    revenue: media.revenue,
  }),
  [MEDIA_TYPES.tv]: (media) => ({
    createdBy: media.created_by,
    firstAired: media.first_air_date,
    lastAired: media.last_air_date,
    inProduction: media.in_production,
    lastEpisode: media.last_episode_to_air,
    nextEpisode: media.next_episode_to_air,
    episodesNumber: media.number_of_episodes,
    seasonsNumber: media.number_of_seasons,
    originCountry: media.origin_country,
    originalLanguage: media.original_language,
    seasons: media.seasons,
  }),
};
