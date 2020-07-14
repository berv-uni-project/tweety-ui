import { Vue } from 'vue-property-decorator';
import createAuth0Client, { RedirectLoginOptions, GetIdTokenClaimsOptions, GetTokenSilentlyOptions, GetTokenWithPopupOptions, LogoutOptions } from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

let instance: any;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

export class Auth0 extends Vue {
  public loading: boolean = true;
  public isAuthenticated: boolean = false;
  public user: any = {};
  public auth0Client: Auth0Client | null = null;
  public popupOpen: boolean = false;
  public error: any = null;

  constructor(options: any, redirectUri: any, onRedirectCallback: any) {
    super();
    this.setup(options, redirectUri, onRedirectCallback);
  }

  public async loginWithPopup(o: any | null) {
    if (this.auth0Client) {
      this.popupOpen = true;
      try {
        await this.auth0Client.loginWithPopup(o);
      } catch (e) {
        // eslint-disable-next-line
        // console.error(e);
      } finally {
        this.popupOpen = false;
      }

      this.user = await this.auth0Client.getUser();
      this.isAuthenticated = true;
    }
  }

  public async handleRedirectCallback() {
    if (this.auth0Client) {
      this.loading = true;
      try {
        await this.auth0Client.handleRedirectCallback();
        this.user = await this.auth0Client.getUser();
        this.isAuthenticated = true;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }

    }
  }

  public async loginWithRedirect(o?: RedirectLoginOptions | undefined) {
    if (this.auth0Client) {
      return await this.auth0Client.loginWithRedirect(o);
    } else {
      return;
    }
  }

  public async getIdTokenClaims(o?: GetIdTokenClaimsOptions | undefined) {
    if (this.auth0Client) {
      return await this.auth0Client.getIdTokenClaims(o);
    } else {
      return null;
    }
  }

  public async getTokenSilently(o?: GetTokenSilentlyOptions | undefined) {
    if (this.auth0Client) {
      return this.auth0Client.getTokenSilently(o);
    } else {
      return null;
    }
  }

  public async getTokenWithPopup(o?: GetTokenWithPopupOptions | undefined) {
    if (this.auth0Client) {
      return await this.auth0Client.getTokenWithPopup(o);
    } else {
      return null;
    }
  }

  public logout(o?: LogoutOptions | undefined) {
    if (this.auth0Client) {
      return this.auth0Client.logout(o);
    } else {
      return;
    }
  }

  private async setup(options: any, redirectUri: any, onRedirectCallback: any) {
    this.auth0Client = await createAuth0Client({
      domain: options.domain,
      client_id: options.clientId,
      audience: options.audience,
      redirect_uri: redirectUri
    });

    try {
      // If the user is returning to the app after authentication..
      if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        // handle the redirect and retrieve tokens
        const { appState } = await this.auth0Client.handleRedirectCallback();

        // Notify subscribers that the redirect callback has happened, passing the appState
        // (useful for retrieving any pre-authentication state)
        onRedirectCallback(appState);
      }
    } catch (e) {
      this.error = e;
    } finally {
      // Initialize our internal authentication state
      this.isAuthenticated = await this.auth0Client.isAuthenticated();
      this.user = await this.auth0Client.getUser();
      this.loading = false;
    }
  }
}


/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) { return instance; }
  // The 'instance' is simply a Vue object
  instance = new Auth0(options, redirectUri, onRedirectCallback);
  return instance;
};

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
  install(vue: any, options: any) {
    vue.prototype.$auth = useAuth0(options);
  }
};
