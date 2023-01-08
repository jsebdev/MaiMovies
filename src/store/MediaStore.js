import { apiController } from "@app/api/apiController";
import { action, autorun, makeObservable, observable, runInAction } from "mobx";

class MediaStore {
  medias = {};

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      medias: observable,
      fetchMedia: action,
    });
    autorun(() => console.dir(this.medias, { depth: 1 }));
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
      return this.medias[mediaType][mediaId];
    }

    const result = await apiController.getMedia(mediaId, mediaType);

    if (!result.success) return;

    runInAction(() => {
      if (!this.medias[mediaType]) this.medias[mediaType] = {};
      this.medias[mediaType][mediaId] = result.value;
    });
  }
}

export const mediaStore = new MediaStore();
