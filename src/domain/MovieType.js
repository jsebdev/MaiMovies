import { types } from "mobx-state-tree";

const { Media } = require("./MediaType");

const MovieProperties = types.model({
  budget: types.maybe(types.number),
  releaseDate: types.maybe(types.string),
  revenue: types.maybe(types.number),
  runtime: types.maybe(types.number),
});

export const Movie = types.compose(Media, MovieProperties);
