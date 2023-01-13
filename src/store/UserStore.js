import { apiController } from "@app/api/apiController";
import { AUTHENTICATE_TOKEN_LINK } from "@app/utils/constants";
import { parseStringToDate } from "@app/utils/utils";
import { autorun, flow, makeAutoObservable, runInAction } from "mobx";

class UserStore {
  token = null;
  expiresAt = null;
  session = null;
  intervalId = null;

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

  validToken() {
    console.log("validing token");
    return this.expiresAt - new Date() > 0;
  }

  clearAll() {
    this.expiresAt = null;
    this.session = null;
    this.token = null;
    this.intervalId = null;
  }

  periodicCreateSession() {
    if (this.intervalId) {
      console.log("inteval exists");
      return;
    }
    this.intervalId = setInterval(async () => {
      console.log("in the interval");
      if (!this.validToken()) {
        console.log("token is not valid anymore");
        clearInterval(this.intervalId);
        this.clearAll();
        return;
      }
      const result = await apiController.createNewSession(this.token);
      if (!result.success) return;
      clearInterval(this.intervalId);
      runInAction(() => {
        this.session = result.value;
        this.intervalId = null;
      });
    }, 3000);
  }

  *createNewToken() {
    if (this.token) {
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
      this.intervalId = null;
    }
    return result;
  }

  get authenticateTokenLink() {
    return AUTHENTICATE_TOKEN_LINK(this.token);
  }
}

export const userStore = new UserStore();
