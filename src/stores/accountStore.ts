import { defineStore } from "pinia";
import { container } from "tsyringe";

import { accountRepository } from "@/repositories/accountRepository";
import type { account, accountEnroll } from "@/entities/account";

interface accountState {
  account: account | null;
}

export const useAccountData = defineStore('account', {
  state: (): accountState => {
    return {
      account: JSON.parse(localStorage.getItem("user") || ""),
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
    async uploadPhoto(file: Blob) {      
      const repository = container.resolve(accountRepository);
      await repository.patchPhoto(file).then((res) => {
        if (res && res.status === 200) {
          this.account.photo = res.data;
        }
      })
      
    },
    async setEnroll(volunteer: any) {
      const user : accountEnroll = {
          name: volunteer.name || "",
          photo: this.account?.photo || "",
          nickname: volunteer.nickname || "",
          address: volunteer.address || "",
          city: volunteer.city || "",
          state: volunteer.state || "",
          country: volunteer.country || "",
          zip: volunteer.zip || "",
          birthDate: new Date(volunteer.birthDate || ""),
          identifier: volunteer.identifier || "",
          availability: volunteer.availability || "",
        };

      const repository = container.resolve(accountRepository);  
      return repository.update(user)
        .then((response) => {
          if (!response || response?.status !== 200) {
            return { errors: response?.response?.data || "Ocorreu um erro geral." };
          }
                
          const userDataUpdated: account = {
            id: response.data?.id,
            phone: this.account?.phone || "",
            email: this.account?.email || "",
            volunteer: response.data
          };

          this.updateUserData(userDataUpdated);
        })
        .catch((err) => {
          return { errors: err.response.data };
        })
    }
  },
})

