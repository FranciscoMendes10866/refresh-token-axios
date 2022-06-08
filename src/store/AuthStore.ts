import { action, computed, makeObservable, observable } from "mobx";

const threeMinutes = 60 * 3;

export class AuthStore {
  user;
  session;
  timer;

  constructor() {
    this.user = null;
    this.session = null;
    this.timer = threeMinutes;

    makeObservable(this, {
      user: observable,
      session: observable,
      timer: observable,
      currentUser: computed,
      currentSession: computed,
      isLoggedIn: computed,
      currentTimer: computed,
      setUser: action.bound,
      setSession: action.bound,
      clearStore: action.bound,
      tickTimer: action.bound,
      resetTimer: action.bound
    });
  }

  get currentUser() {
    return this.user;
  }

  get currentSession() {
    return this.session;
  }

  get isLoggedIn() {
    return !!this.user;
  }

  setUser = (data) => {
    this.user = data;
    localStorage.setItem("user", JSON.stringify(data));
  };

  setSession = (data) => {
    this.session = data;
    localStorage.setItem("session", JSON.stringify(data));
  };

  clearStore = () => {
    this.user = null;
    this.session = null;
    this.resetTimer();
    localStorage.removeItem("user");
    localStorage.removeItem("session");
  };

  get currentTimer() {
    return this.timer;
  }
  
  tickTimer = () => {
    this.timer = this.timer - 1;
  }

  resetTimer = () => {
    this.timer = threeMinutes;
  }
}
