import { apiController } from "@app/api/apiController";
import { AUTHENTICATE_TOKEN_LINK } from "@app/utils/constants";
import { parseStringToDate } from "@app/utils/utils";
import { autorun, flow, makeAutoObservable } from "mobx";

class UserStore {
  token = null;
  expiresAt = null;
  _session = null;
  _timeoutId = null;

  constructor() {
    makeAutoObservable(this, {
      createNewToken: flow,
      createNewSession: flow,
      deleteSession: flow,
    });
    // autorun(() => {
    //   console.log("UserStore is: ", this);
    // });
  }

  get session() {
    return this._session;
  }
  set session(session) {
    this._session = session;
  }
  get timeoutId() {
    return this._timeoutId;
  }
  set timeoutId(timeoutId) {
    this._timeoutId = timeoutId;
  }

  validToken() {
    if (!this.token) return false;
    return this.expiresAt - new Date() > 0;
  }

  clearAll() {
    this.expiresAt = null;
    this.session = null;
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
      this.session = result.value;
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
      this.timeoutId = null;
    }
    return result;
  }

  get authenticateTokenLink() {
    return AUTHENTICATE_TOKEN_LINK(this.token);
  }
}

export const userStore = new UserStore();
