export class ApiController {
  constructor() {
    // This is an abstract class, Can't be instantiated
    if (new.target === ApiController) {
      throw new TypeError("Cannot construct ApiController instances directly");
    }
  }

  //Todo: Research how to force methods like this one in all classes that inherit from this class
  getWeeklyTrendingMedia = () => {
    throw new Error("getWeeklyTrendingMedia not implemented");
  };
}
