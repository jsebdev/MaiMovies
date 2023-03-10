import { apiController } from "@app/api/apiController";
import { action, makeObservable, observable, runInAction } from "mobx";

class MediaStore {
  medias = {};

  constructor() {
    makeObservable(this, {
      medias: observable,
      fetchMedia: action,
      fetchMediaVideos: action,
    });
    // autorun(() => {
    // });
  }

  getMedia(mediaType, mediaId) {
    if (!this.medias[mediaType] || !this.medias[mediaType].has(mediaId)) {
      return null;
    }
    return this.medias[mediaType].get(mediaId);
  }

  async fetchMedia(mediaType, mediaId) {
    if (this.medias[mediaType] && this.medias[mediaType].has(mediaId)) {
      return;
    }
    const result = await apiController.getMedia(mediaType, mediaId);
    if (!result.success) return;
    runInAction(() => {
      if (!this.medias[mediaType]) {
        this.medias[mediaType] = new Map();
      }
      this.medias[mediaType].set(mediaId, result.value);
    });
  }

  async fetchMediaVideos(mediaType, mediaId) {
    const result = await apiController.getMediaVideos(mediaType, mediaId);
    if (!result.success) return;
    runInAction(() => {
      this.medias[mediaType].get(mediaId).videos = result.value;
    });
  }
}

export const mediaStore = new MediaStore();

// const delay = (t) => {
//   return new Promise((resolve) => setTimeout(() => resolve("ya"), t));
// };
