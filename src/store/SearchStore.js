import { apiController } from "@app/api/apiController";
import { MEDIA_TYPES } from "@app/utils/constants";
import { autorun, flow, makeAutoObservable } from "mobx";

class SearchStore {
  _searchText = "";
  pendingResults = 0;
  movies = {
    list: new Map(),
    page: 0,
    totalPages: Infinity,
  };
  tv = {
    list: [],
    page: 0,
    totalPages: Infinity,
  };

  constructor() {
    makeAutoObservable(this, {
      fetchNextPageMediaSearch: flow,
    });
    // autorun(() => {
    //   console.log("23: this.movies.page >>>", this.movies.page);
    //   console.log("24: this.tv.page >>>", this.tv.page);
    // });
  }

  get searchText() {
    return this._searchText;
  }
  set searchText(searchText) {
    this._searchText = searchText;
    this.movies = {
      list: new Map(),
      page: 0,
      totalPages: Infinity,
    };
    this.tv = {
      list: new Map(),
      page: 0,
      totalPages: Infinity,
    };
  }

  *fetchNextPageMediaSearch(mediaType) {
    const media = mediaType === MEDIA_TYPES.movie ? this.movies : this.tv;
    if (media.page >= media.totalPages) return;
    media.page++;
    this.pendingResults++;
    const result = yield apiController.searchMedia(
      media.page,
      mediaType,
      this.searchText
    );
    if (result.success === true) {
      media.totalPages = result.totalPages;
      result.value
        .filter((m) => m.poster.posterPath)
        .forEach((m) => {
          media.list.set(m.id, m);
        });
    }
    this.pendingResults--;
  }
}

export const searchStore = new SearchStore();
