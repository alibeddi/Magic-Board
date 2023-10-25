export interface configType {
  loginEndpoint: string;
  registerEndpoint: string;
  refreshEndpoint: string;
  logoutEndpoint: string;
  storageRefreshTokenKeyName: string;
  tokenType: string;
  storageTokenKeyName: string;
}

const config = {
  loginEndpoint: "/auth/login",
  registerEndpoint: "/auth/signup",
  refreshEndpoint: "/auth/refresh",
  logoutEndpoint: "/auth/logout",
  getMeEndpoint: "/auth/getLoggenInUser",
  resetEndpoint: "/auth/resetPassword",
  forgetEndpoint: "/auth/forgetPassword",
  storageRefreshTokenKeyName: "",
  //Bearer
  tokenType: "Bearer",

  //in localstorage
  storageTokenKeyName: "token",
};

export default config;
