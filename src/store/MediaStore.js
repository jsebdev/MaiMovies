import { apiController } from "@app/api/apiController";
import { action, autorun, makeObservable, observable, runInAction } from "mobx";

class MediaStore {
  medias = {};

  constructor() {
    makeObservable(this, {
      medias: observable,
      fetchMedia: action,
      fetchMediaVideos: action,
    });
    autorun(() => {
      // console.log("29: this.medias >>>", this.medias);
    });
  }

  getMedia(mediaType, mediaId) {
    if (!this.medias[mediaType] || !this.medias[mediaType][mediaId]) {
      return null;
    }
    return this.medias[mediaType][mediaId];
  }

  async fetchMedia(mediaType, mediaId) {
    if (
      this.medias[mediaType] &&
      Object.keys(this.medias[mediaType]).includes(mediaId)
    ) {
      return;
    }
    const result = await apiController.getMedia(mediaType, mediaId);
    if (!result.success) return;
    runInAction(() => {
      if (!this.medias[mediaType]) {
        this.medias[mediaType] = {};
      }
      this.medias[mediaType][mediaId] = result.value;
    });
  }

  async fetchMediaVideos(mediaType, mediaId) {
    const result = await apiController.getMediaVideos(mediaType, mediaId);
    if (!result.success) return;
    runInAction(() => {
      this.medias[mediaType][mediaId].videos = result.value;
    });
  }
}

export const mediaStore = new MediaStore();

// const delay = (t) => {
//   return new Promise((resolve) => setTimeout(() => resolve("ya"), t));
// };
