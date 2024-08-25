import { defineStore } from "pinia";
import { container } from "tsyringe";

import { accountRepository } from "@/repositories/accountRepository";
import type { account, accountEnroll } from "@/entities/account";

interface accountState {
  account: account | null;
  isLoading: boolean;
  isEnroll: boolean;
}

export const useAccountData = defineStore('account', {
  state: (): accountState => {
    return {
      account: null,
      isLoading: false,
      isEnroll: true
    }
  },
  getters: {
    getAccount(state) {
      return state.account;
    },
    getVolunteerData(state) {
      return state.account.volunteer;
    },
  },
  actions: {
    // any amount of arguments, return a promise or not
    getAccountData() {
      // you can directly mutate the state
      this.isLoading = true;

      const data = JSON.parse(localStorage.getItem("user")|| "");

      // caso o objeto volunteer venha preenchido, considerar que não é processo de enroll
      if (data.volunteer) this.isEnroll = false;
      this.account = data;
      this.isLoading = false;
    },
    updateUserData() {

    },
    async uploadPhoto (file: Blob) {      
      const repository = container.resolve(accountRepository);
      return await repository.patchPhoto(file);
      
    },
    async setEnroll(user: accountEnroll) {
      this.isLoading = true;
      const repository = container.resolve(accountRepository);
  
      console.log({
        name: user?.name,
        photo: user?.photo,
        nickname: user?.nickname,
        address: user?.address,
        city: user?.city,
        state: user?.state,
        zip: user?.zip,
        birthDate: user?.birthDate,
        identifier: user?.identifier,
        availability: user?.availability,
      });

      const response = await repository.update(user);
      console.log('setEnroll', response);

      //localStorage.setItem("user", response.data)
      //router.push({ path: "/dashboard", replace: true });
    }
  },
})

