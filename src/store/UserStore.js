import { apiController } from "@app/api/apiController";
import {
  API_GRAVATAR_IMAGE_PATH,
  AUTHENTICATE_TOKEN_LINK,
  IMAGES_SIZES,
  MEDIA_TYPES,
} from "@app/utils/constants";
import { autorun, flow, makeAutoObservable } from "mobx";

class UserStore {
  requestToken = null;
  requestTokenExpiresAt = null;
  accessToken = null;
  // accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NzQwNjQzNTksImF1ZCI6ImU4MGI3NDdkMTYwMjEzNjFlMTI5ZWQyODI2MWEzYzZlIiwianRpIjoiNTQ2ODEyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCIsImFwaV93cml0ZSJdLCJ2ZXJzaW9uIjoxLCJzdWIiOiI2M2I1MDFjMTVhZDc2YjAwYWU5MjkzYzMifQ.SV3OmCy55dNIoTwL-cevtV8Ul5iDcXq4crQlSD-ItGI";
  //since session and timeout are never set outside this class,
  //it's not necessary make getters and setters for them. but YOLO
  _sessionId = null;
  // _sessionId = "ec83a386033de200e59ce13b93e5bd1c924d0768";
  accountId = null;
  // accountId = 16827403;
  _timeoutId = null;
  avatar = null;
  name = null;
  username = null;
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
      createNewRequestToken: flow,
      createNewSession: flow,
      deleteSession: flow,
      fetchAccountDetails: flow,
      fetchListItems: flow,
      createNewList: flow,
      markAsFavorite: flow,
      fetchAllFavorites: flow,
      fetchNextPageFavorites: flow,
      fetchListsNextPage: flow,
      createNewAccessToken: flow,
      deleteList: flow,
      deleteMediasFromList: flow,
    });
    autorun(() => {
      if (this._sessionId) {
        console.log("20: this.session >>>", this.sessionId);
        console.log("56: this.accessToken >>>", this.accessToken);
      }
    });
  }

  *deleteMediasFromList(listId, medias) {
    console.log("65: medias >>>", medias);
    const result = yield apiController.deleteMediaFromList(listId, medias);
    console.log("67: result >>>", result);
    if (result.success === true) {
      yield this.fetchListItems(listId);
    }
    return result;
  }

  *deleteList(listId) {
    const result = yield apiController.deleteList(listId);
    if (result.success === true) {
      this.lists.delete(listId);
    }
    return result;
  }

  *addItemToList(listId, mediaType, mediaId) {
    const result = yield apiController.addItemToList(listId, {
      mediaType,
      mediaId,
    });
    if (result.success !== true) {
      return result;
    }
    yield this.fetchListItems(listId);
    return result;
  }

  *markAsFavorite(mediaType, mediaId, favorite) {
    const result = yield apiController.markMediaAsFavorite(
      this.accountId,
      this.sessionId,
      mediaType,
      mediaId,
      favorite
    );
    if (result.success !== true) {
      console.error(
        `Could not mark as ${
          favorite ? "favorite" : "not favorite"
        } mediaId: ${mediaId}, mediaType: ${mediaType}`
      );
      return result;
    }
    const favorites = this.chooseFavorites(mediaType);
    if (favorite) {
      //there must be a better way to add a new favorite than this
      this.clearFavorites(mediaType);
      yield this.fetchAllFavorites(mediaType);
    } else {
      favorites.list.delete(mediaId);
    }
    return result;
  }

  chooseFavorites(mediaType) {
    return mediaType === MEDIA_TYPES.movie
      ? this.favoritesMovies
      : this.favoritesTvShows;
  }

  clearFavorites(mediaType) {
    const favorite = this.chooseFavorites(mediaType);
    favorite.list.clear();
    favorite.page = 0;
    favorite.totalPages = Infinity;
  }

  *fetchAllFavorites(mediaType) {
    const favorites = this.chooseFavorites(mediaType);
    while (favorites.page < favorites.totalPages) {
      yield this.fetchNextPageFavorites(mediaType);
    }
  }

  *fetchNextPageFavorites(mediaType) {
    const favorites = this.chooseFavorites(mediaType);
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
    apiController.setNewBearer(this.accessToken);
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

  validRequestToken() {
    if (!this.requestToken) return false;
    return this.requestTokenExpiresAt - new Date() > 0;
  }

  clearAll() {
    this.requestTokenExpiresAt = null;
    this.sessionId = null;
    this.requestToken = null;
    this.timeoutId = null;
  }

  periodicCreateAccessToken() {
    this.timeoutId = setTimeout(async () => {
      if (!this.validRequestToken()) {
        this.clearAll();
        return;
      }
      const result = await this.createNewAccessToken();
      if (!result.success) {
        this.periodicCreateAccessToken();
        return;
      }
      this.timeoutId = null;
      this.createNewSession();
    }, 3000);
  }

  *createNewAccessToken() {
    const result = yield apiController.createNewAccessToken(this.requestToken);
    if (result.success === true) {
      this.accessToken = result.value;
    }
    return result;
  }

  attemptUntilCreateAccessToken() {
    if (this.timeoutId && this.validRequestToken()) {
      return;
    }
    this.periodicCreateAccessToken();
  }

  *createNewRequestToken() {
    if (this.validRequestToken()) {
      return { success: true };
    }
    const result = yield apiController.getNewRequestToken();
    if (result.success === true) {
      this.requestToken = result.value.token;
      this.requestTokenExpiresAt = result.value.expiresAt;
    }
    return result;
  }

  *createNewSession() {
    const result = yield apiController.createNewSession(this.accessToken);
    if (result.success === true) {
      this.sessionId = result.value;
    }
    return result;
  }

  *deleteSession() {
    const result = yield apiController.deleteSession(this.sessionId);
    if (result.success === true) {
      this.sessionId = null;
      this.requestToken = null;
      this.requestTokenExpiresAt = null;
      this.timeoutId = null;
    }
    return result;
  }

  get authenticateTokenLink() {
    return AUTHENTICATE_TOKEN_LINK(this.requestToken);
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
