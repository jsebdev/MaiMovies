import { types } from "mobx-state-tree";

const { Media } = require("./MediaType");

const TvShowProperties = types.model({
  createdBy: types.maybe(types.string),
  firstAired: types.maybe(types.string),
  lastAired: types.maybe(types.string),
  inProduction: types.maybe(types.boolean),
  lastEpisode: types.maybe(types.string),
  nextEpisode: types.maybe(types.model({})),
  episodesNumber: types.maybe(types.number),
  seasonsNumber: types.maybe(types.number),
  originCountry: types.maybe(types.string),
  originalLanguage: types.maybe(types.string),
  seasons: types.maybe(types.array(types.model({}))),
});

export const TvShow = types.compose(Media, TvShowProperties);
