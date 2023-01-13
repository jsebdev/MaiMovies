import { apiController } from "@app/api/apiController";
import { AUTHENTICATE_TOKEN_LINK } from "@app/utils/constants";
import { autorun, flow, makeAutoObservable, runInAction } from "mobx";

class UserStore {
  token = null;
  expiresAt = null;
  session = null;

  constructor() {
    makeAutoObservable(this, {
      createNewToken: flow,
      createNewSession: flow,
      deleteSession: flow,
    });
    autorun(() => {
      console.log("UserStore is: ", this);
    });
  }

  periodicCreateSession() {
    const intervalId = setInterval(async () => {
      const result = await apiController.createNewSession(this.token);
      if (!result.success) return;
      runInAction(() => {
        this.session = result.value;
      });
      clearInterval(intervalId);
    }, 3000);
  }

  *createNewToken() {
    const result = yield apiController.getNewToken();
    if (result.success === true) {
      this.token = result.value.token;
      this.expiresAt = result.value.expiresAt;
    }
    return result;
  }

  *createNewSession() {
    const result = yield apiController.createNewSession(this.token);
    if (result.success === true) {
      this.session = result.value;
    }
    return result;
  }

  *deleteSession() {
    const result = yield apiController.deleteSession(this.session);
    if (result.success === true) {
      this.session = null;
      this.token = null;
      this.expiresAt = null;
    }
    return result;
  }

  get authenticateTokenLink() {
    return AUTHENTICATE_TOKEN_LINK(this.token);
  }
}

export const userStore = new UserStore();
