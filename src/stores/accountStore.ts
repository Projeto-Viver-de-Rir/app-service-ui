import { defineStore } from "pinia";
import { container } from "tsyringe";

import { accountRepository } from "@/repositories/accountRepository";
import type { account, accountEnroll } from "@/entities/account";
import type { AccountPatchModel, VolunteerPatchModel } from "@/entities/volunteer";

interface accountState {
  account: account | null;
  isLoading: boolean;
}

export const useAccountData = defineStore('account', {
  state: (): accountState => {
    return {
      account: JSON.parse(localStorage.getItem("user") || ""),
      isLoading: false,
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
      await repository.patchPhoto(file)
        .then((res) => {
          if (res && res.status === 200) {
            this.account.photo = res.data;
          }
        })
        .catch((error) => {
          throw new Error('Unable to update profile avatar.');
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
            permissions: ["volunteer"],
            volunteer: response.data
          };

          this.updateUserData(userDataUpdated);
        })
        .catch((err) => {
          return { errors: err.response.data };
        })
    },
    async updateAccount(data: AccountPatchModel) {
      this.isLoading = true;
      const repository = container.resolve(accountRepository);
      try {
        await repository.updateAccount(data);
        const userDataUpdated: any = {
          ...this.account,
          email: data.email,
          phone: data.phone,
        }
        this.updateUserData(userDataUpdated);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        throw new Error('Error while updating account')
      }
    },
    async updateVolunteer(volunteer: any) {
      this.isLoading = true;
      const updatedVolunteer : VolunteerPatchModel = {
          name: volunteer.name || "",
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
      try {
        await repository.updateVolunteer(updatedVolunteer);
        const userDataUpdated: any = {
          ...this.account,
          volunteer: { 
            photo: this.account?.photo as string, 
            ...updatedVolunteer }
        };
        this.updateUserData(userDataUpdated);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        throw new Error('Error while updating profile')
      }
    }
  },
})

