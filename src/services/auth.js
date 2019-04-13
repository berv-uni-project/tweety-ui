import auth0 from "auth0-js";
import decode from "jwt-decode";
import EventEmitter from "events";
import authConfig from "../../auth_config.json";

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  redirectUri: `${window.location.origin}/callback`,
  clientID: authConfig.clientId,
  responseType: "id_token",
  scope: "openid profile email"
});

const ID_TOKEN_KEY = "id_token";
const loginEvent = "loginEvent";

class AuthService extends EventEmitter {
  idToken = null;
  profile = null;
  tokenExpiry = null;
  // Starts the user login flow
  login(customState) {
    webAuth.authorize({
      appState: customState
    });
  }
  // Handles the callback request from Auth0
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
        }
      });
    });
  }

  localLogin(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;

    // Convert the JWT expiry time from seconds to milliseconds
    this.tokenExpiry = new Date(this.profile.exp * 1000);

    window.localStorage.setItem(ID_TOKEN_KEY, authResult.idToken);
    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {}
    });
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (!this.isAuthenticated()) {
        return reject("Not logged in");
      }
      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult);
        }
      });
    });
  }

  logOut() {
    this.clearIdToken();
    this.idToken = null;
    this.tokenExpiry = null;
    this.profile = null;
    webAuth.logout({
      returnTo: window.location.origin
    });

    this.emit(loginEvent, { loggedIn: false });
  }

  getIdToken() {
    return window.localStorage.getItem(ID_TOKEN_KEY);
  }

  clearIdToken() {
    window.localStorage.removeItem(ID_TOKEN_KEY);
  }

  getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);
    return date;
  }

  getNonce() {
    const encodedToken = this.getIdToken();
    if (encodedToken) {
      const token = decode(encodedToken);
      return token.nonce;
    } else {
      return null;
    }
  }

  isAuthenticated() {
    const idToken = this.getIdToken();
    return !!idToken && !this.isTokenExpired(idToken);
  }

  isTokenExpired(token) {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate < new Date();
  }
}

export default new AuthService();
