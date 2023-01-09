import { YOUTUBE_SITE } from "@app/utils/constants";
import { makeAutoObservable } from "mobx";

export class Video {
  constructor({ name, key, site, type, official, id }) {
    makeAutoObservable(this);
    this.name = name;
    this.key = key;
    this.site = site;
    this.type = type;
    this.official = official;
    this.id = id;
  }

  getUrl() {
    if (this.site !== YOUTUBE_SITE) {
      console.error("video site is not supported, site: ", this.site);
      return null;
    }
    return `https://www.youtube.com/watch?v=${this.key}`;
  }
}
