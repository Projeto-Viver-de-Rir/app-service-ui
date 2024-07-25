import { defineStore } from "pinia";
import { router } from "@/router";
import { container } from "tsyringe";
import axios from "axios";
import { accountRepository } from "../repositories/accountRepository";

const API_URL = "https://institutional-app-iwaxs.ondigitalocean.app/api";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    // @ts-ignore
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
    session: localStorage.getItem("session"),
    returnUrl: null,
  }),
  actions: {
    async login(email: string, password: string) {
      axios
        .post(
          `${API_URL}/identity/login`,
          {
            email: email,
            password: password,
            twoFactorCode: "string",
            twoFactorRecoveryCode: "string",
          }
        )
        .then(async (response) => {
          (async () => {
            const { accessToken, refreshToken } = response.data;

            await localStorage.setItem("token", accessToken);
            await localStorage.setItem("refreshToken", refreshToken);
          })();

          const repository = container.resolve(accountRepository);

          var data = await repository.getCurrentUserWithToken(
            response.data.accessToken
          );
          this.user = data;
          this.user.photo = this.user.photo || "";

          // store user details and jwt in local storage to keep user logged in between page refreshes
          (async () =>
            await localStorage.setItem("user", JSON.stringify(this.user)))();

          // redirect to previous url or default to home page
          router.push({ path: "/Dashboard", replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    startSession() {
      localStorage.setItem("session", new Date());
    },
    clearSession() {
      localStorage.removeItem("session");
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("session");
      router.push({ path: "/auth/login", replace: true });
    },
    async register(email: string, password: string) {
      axios
        .post(
          `${API_URL}/identity/register`,
          {
            email: email,
            password: password
          }
        ).then((res) => {
          console.log('register response', res);
        })
    }
  },
});
