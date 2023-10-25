import appAxios from "../../helpers/axios";
import authDefaultConfig from "./authConfig";
import { loginEndPoint, MyToken, registerEndPoint } from "./types";
import jwtDecode, { JwtPayload } from "jwt-decode";
export default class JwtService {
  authConfig = { ...authDefaultConfig };

  isAlreadyFetchingAccessToken = false;

  constructor() {
    appAxios.interceptors.request.use(
      (config) => {
        const accessToken = this.getToken();

        if (accessToken) {
          config.headers.Authorization = `${this.authConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    appAxios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
        } else {
          Promise.reject(
            (error.response && error.response.data) || "Something went wrong"
          );
        }
      }
    );
    appAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          this.refreshToken().then((r) => {
            this.isAlreadyFetchingAccessToken = false;

            this.setToken(r.data.accessToken);

            this.setRefreshToken(r.data.refreshToken);
          });

          return appAxios(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }

  getToken() {
    return localStorage.getItem(this.authConfig.storageTokenKeyName);
  }
  isValidToken(token: string) {
    if (!token) {
      return false;
    }

    const decoded = jwtDecode<MyToken>(token);
    const currentTime = Date.now() / 1000;
    const user = this.getMe();
    return decoded.exp > currentTime && user;
  }
  getRefreshToken() {
    return localStorage.getItem(this.authConfig.storageRefreshTokenKeyName);
  }

  setToken(value: string) {
    localStorage.setItem(this.authConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value: any) {
    localStorage.setItem(this.authConfig.storageRefreshTokenKeyName, value);
  }

  login(body: loginEndPoint) {
    return appAxios.post(this.authConfig.loginEndpoint, body);
  }

  register(body: registerEndPoint) {
    return appAxios.post(this.authConfig.registerEndpoint, body);
  }

  getMe() {
    return appAxios.get(this.authConfig.getMeEndpoint);
  }

  resetPassword(password: object, token: string | null = "") {
    return appAxios.post(`${this.authConfig.resetEndpoint}/${token}`, password);
  }
  forgetPassword(email: object) {
    return appAxios.post(this.authConfig.forgetEndpoint, email);
  }

  refreshToken() {
    return appAxios.post(this.authConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    });
  }
}
