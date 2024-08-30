import { defineStore } from "pinia";
import { container } from "tsyringe";

import { accountRepository } from "@/repositories/accountRepository";
import type { account, accountEnroll } from "@/entities/account";
import { router } from "@/router";

interface accountState {
  account: account | null;
  isLoading: boolean;
}

export const useAccountData = defineStore('account', {
  state: (): accountState => {
    return {
      account: JSON.parse(localStorage.getItem("user")|| ""),
      isLoading: false
    }
  },
  getters: {
    isEnroll(state) {
      return !state.account?.volunteer;
    },
  },
  actions: {
    updateUserData(user: account) {
      this.account = user;

      localStorage.setItem("user", JSON.stringify(this.account));

    },
    async uploadPhoto (file: Blob) {      
      const repository = container.resolve(accountRepository);
      return await repository.patchPhoto(file);
      
    },
    async setEnroll(user: accountEnroll) {
      const repository = container.resolve(accountRepository);  
      return repository.update(user);
    }
  },
})

