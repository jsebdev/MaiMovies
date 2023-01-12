import { types } from "mobx-state-tree";
import { IMAGES_SIZES } from "@app/utils/constants";

export const Media = types
  .model({
    id: types.maybe(types.identifier),
    name: types.maybe(""),
    poster: types.maybe(types.model(Poster)),
    media_type: types.maybe(types.string),
    backdrop: types.maybe(types.model(Backdrop)),
    baseImageUrl: types.maybe(types.string),
    genres: types.maybe(types.model(Genre)),
    homepage: types.maybe(types.string),
    overview: types.maybe(types.string),
    status: types.maybe(types.string),
    averageVote: types.maybe(types.number),
    productionCompanies: types.maybe(types.model({})),
    mediaType: types.maybe(types.string),
    stillBaseSizes: types.maybe(types.model(ImageSizes)),
    logoBaseSizes: types.maybe(types.model(ImageSizes)),
  })
  .views((self) => ({
    getStillBaseUrl(size) {
      return `${self.baseImageUrl}${self.stillBaseSizes[size]}`;
    },
    getLogoBaseUrl(size) {
      return `${self.baseImageUrl}${self.logoBaseSizes[size]}`;
    },
    getPosterBaseUrl(size) {
      return `${self.baseImageUrl}${self.poster.posterSizes[size]}`;
    },
    getPoster(size) {
      return `${self.baseImageUrl}${self.poster.posterSizes[size]}${self.poster.posterPath}`;
    },
    getBackdrop(size) {
      return `${self.baseImageUrl}${self.backdrop.backdropSizes[size]}${self.backdrop.backdropPath}`;
    },
  }));

export const Genre = types.model({
  id: types.identifier,
  name: types.string,
});

export const Poster = types.model({
  posterPath: types.maybe(types.string),
  posterSizes: types.maybe(types.model(ImageSizes)),
});

export const Backdrop = types.model({
  backdropPath: types.maybe(types.string),
  backdropSizes: types.maybe(types.model(ImageSizes)),
});

export const ImageSizes = types.model({
  [IMAGES_SIZES.small]: types.string,
  [IMAGES_SIZES.medium]: types.string,
  [IMAGES_SIZES.large]: types.string,
  [IMAGES_SIZES.original]: types.string,
});
