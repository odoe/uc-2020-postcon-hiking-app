import { loadModules } from 'esri-loader';

export let credential = null;

let oauthInfo = null;

/**
 * Register application ID and Portal URL
 * with the IdentityManager
 * @param appId
 * @param portalUrl
 */
export const initialize = async (appId, portalUrl) => {
  const [IdentityManager, OAuthInfo] = await loadModules([
    'esri/identity/IdentityManager',
    'esri/identity/OAuthInfo',
  ]);
  if (!oauthInfo) {
    oauthInfo = new OAuthInfo({
      appId,
      portalUrl,
      popup: true,
    });
    IdentityManager.registerOAuthInfos([oauthInfo]);
  }
};

/**
 * Check current logged in status for current portal
 */
export const checkCurrentStatus = async () => {
  const [IdentityManager] = await loadModules([
    'esri/identity/IdentityManager',
  ]);
  IdentityManager.checkSignInStatus(`${oauthInfo.portalUrl}/sharing`);
};

/**
 * Attempt to sign in,
 * first check current status
 * if not signed in, then go through
 * steps to get credentials
 */
export const signIn = async () => {
  if (!credential) {
    try {
      credential = await checkCurrentStatus();
    } catch (error) {
      credential = await fetchCredentials();
    }
  }
  return credential;
};

/**
 * Sign the user out, but if we checked credentials
 * manually, make sure they are registered with
 * IdentityManager, so it can destroy them properly
 */
export const signOut = async () => {
  const [IdentityManager] = await loadModules([
    'esri/identity/IdentityManager',
  ]);
  // make sure the IdentityManager has
  // the credential so it can destroy it
  await signIn();
  IdentityManager.destroyCredentials();
};

/**
 * Get the credentials for the provided portal
 */
export const fetchCredentials = async () => {
  const [IdentityManager] = await loadModules([
    'esri/identity/IdentityManager',
  ]);
  credential = await IdentityManager.getCredential(
    `${oauthInfo.portalUrl}/sharing`,
    {
      error: null,
      oAuthPopupConfirmation: false,
      token: null,
    }
  );

  return credential;
};
