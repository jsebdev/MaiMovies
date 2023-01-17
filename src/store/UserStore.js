import { apiController } from "@app/api/apiController";
import {
  API_GRAVATAR_IMAGE_PATH,
  AUTHENTICATE_TOKEN_LINK,
  IMAGES_SIZES,
  MEDIA_TYPES,
} from "@app/utils/constants";
import { parseStringToDate } from "@app/utils/utils";
import { autorun, flow, makeAutoObservable } from "mobx";

class UserStore {
  token = null;
  expiresAt = null;
  //since session and timeout are never set outside this class,
  //it's not necessary make getters and setters for them. but YOLO
  // _sessionId = null;
  _sessionId = "f64250417a99663e66ffff4a194fdffd9e0dbf67";
  _timeoutId = null;
  avatar = null;
  name = null;
  username = null;
  accountId = 16827403;
  // accountId = null;
  lists = new Map();
  listTotalPages = Infinity;
  listsPage = 0;
  favoritesTvShows = {
    list: new Map(),
    page: 0,
    totalPages: Infinity,
  };
  favoritesMovies = {
    list: new Map(),
    page: 0,
    totalPages: Infinity,
  };

  constructor() {
    makeAutoObservable(this, {
      createNewToken: flow,
      createNewSession: flow,
      deleteSession: flow,
      fetchAccountDetails: flow,
      fetchLists: flow,
      fetchListItems: flow,
      createNewList: flow,
    });
    autorun(() => {
      if (this._sessionId) {
        console.log("20: this.session >>>", this.sessionId);
      }
    });
  }

  *fetchNextPageFavorites(mediaType) {
    const favorites =
      mediaType === MEDIA_TYPES.movie
        ? this.favoritesMovies
        : this.favoritesTvShows;
    if (favorites.page >= favorites.totalPages) return;
    favorites.page++;
    const result = yield apiController.getFavorites(
      this.accountId,
      mediaType,
      this.sessionId,
      favorites.page
    );
    if (result.success === true) {
      result.value.forEach((m) => {
        favorites.list.set(m.id, m);
      });
      favorites.totalPages = result.totalPages;
    }
  }

  *createNewList(listInfo) {
    const result = yield apiController.createNewList(this.sessionId, listInfo);
    if (result.success === true) {
      this.lists.clear();
      this.listTotalPages = Infinity;
      this.listPage = 0;
      this.fetchListsNextPage();
    }
    return result;
  }

  *fetchListItems(listId) {
    const result = yield apiController.getList(listId);
    if (result.success === false) return result;
    const items = result.value.items;
    this.lists.get(listId).items = items;
    if (items.length > 0) {
      this.lists.get(listId).background = items[items.length - 1].getBackdrop(
        IMAGES_SIZES.large
      );
    }
  }

  *fetchListsNextPage() {
    this.listsPage++;
    const result = yield apiController.getLists(
      this.accountId,
      this.sessionId,
      this.listsPage
    );
    if (result.success === false) return result;
    this.listTotalPages = result.totalPages;
    result.value.forEach((list) => {
      this.lists.set(list.id, list);
    });
  }

  *fetchAccountDetails() {
    const result = yield apiController.getAccountDetails(this.sessionId);
    if (result.success !== true) {
      if (result.rawValue.status_code === 3) {
        this.sessionId = null;
      }
      return result;
    }
    if (result.avatar.tmdb?.avatar_path) {
      this.avatar = `${apiController.imageBaseUrl}${
        apiController.profileBaseSizes[IMAGES_SIZES.medium]
      }${result.avatar.tmdb.avatar_path}`;
    } else {
      this.avatar = API_GRAVATAR_IMAGE_PATH(result.avatar.gravatar.hash);
    }
    this.name = result.name;
    this.username = result.username;
    this.accountId = result.accountId;
    return result;
  }

  validToken() {
    if (!this.token) return false;
    return this.expiresAt - new Date() > 0;
  }

  clearAll() {
    this.expiresAt = null;
    this.sessionId = null;
    this.token = null;
    this.timeoutId = null;
  }

  periodicCreateSession() {
    this.timeoutId = setTimeout(async () => {
      if (!this.validToken()) {
        this.clearAll();
        return;
      }
      const result = await this.createNewSession();
      if (!result.success) {
        this.periodicCreateSession();
        return;
      }
      this.sessionId = result.value;
      this.timeoutId = null;
    }, 3000);
  }

  attemptUntilCreateSession() {
    if (this.timeoutId && this.validToken()) {
      return;
    }
    this.periodicCreateSession();
  }

  *createNewToken() {
    if (this.validToken()) {
      return { success: true };
    }
    const result = yield apiController.getNewToken();
    if (result.success === true) {
      this.token = result.value.token;
      this.expiresAt = parseStringToDate(result.value.expiresAt);
    }
    return result;
  }

  *createNewSession() {
    const result = yield apiController.createNewSession(this.token);
    if (result.success === true) {
      this.sessionId = result.value;
    }
    return result;
  }

  *deleteSession() {
    const result = yield apiController.deleteSession(this.sessionId);
    if (result.success === true) {
      this.sessionId = null;
      this.token = null;
      this.expiresAt = null;
      this.timeoutId = null;
    }
    return result;
  }

  get authenticateTokenLink() {
    return AUTHENTICATE_TOKEN_LINK(this.token);
  }
  get sessionId() {
    return this._sessionId;
  }
  set sessionId(session) {
    this._sessionId = session;
  }
  get timeoutId() {
    return this._timeoutId;
  }
  set timeoutId(timeoutId) {
    this._timeoutId = timeoutId;
  }
}

export const userStore = new UserStore();
