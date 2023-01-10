const { Media } = require("./MediaClass");

export class TvShow extends Media {
  constructor({
    createdBy,
    firstAired,
    lastAired,
    inProduction,
    lastEpisode,
    nextEpisode,
    episodesNumber,
    seasonsNumber,
    originCountry,
    originalLanguage,
    seasons,
    ...rest
  }) {
    super(rest);
    this.createdBy = createdBy;
    this.firstAired = firstAired;
    this.lastAired = lastAired;
    this.inProduction = inProduction;
    this.lastEpisode = lastEpisode;
    this.episodesNumber = episodesNumber;
    this.seasonsNumber = seasonsNumber;
    this.originCountry = originCountry;
    this.originalLanguage = originalLanguage;
    this.seasons = seasons;
    this.nextEpisode = nextEpisode;
  }
}
