const { Media } = require("./MediaClass");

export class Movie extends Media {
  constructor({ budget, releaseDate, revenue, runtime, ...rest }) {
    super(rest);
    this.budget = budget;
    this.releaseDate = releaseDate;
    this.revenue = revenue;
    this.runtime = runtime;
  }
}
