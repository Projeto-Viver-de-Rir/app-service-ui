import { defineStore } from "pinia";
import { container } from "tsyringe";
import { computed, reactive } from "vue";

import { accountRepository } from "@/repositories/accountRepository";
import type { account } from "@/entities/account";

interface accountState {
  account: account | null;
  isLoading: boolean;
}

export const useAccount = defineStore("account", () => {
  const state = reactive<accountState>({
    account: null,
    isLoading: false,
 });

  const repository = container.resolve(accountRepository);
  const getAccount = computed(() => state.account);
  const isLoading = computed(() => state.isLoading);
  const getAccountData = async () => {
    state.isLoading = true;

    const data = JSON.parse(localStorage.getItem("user")|| "");
    state.account = data;
    state.isLoading = false;
  };

  const uploadPhoto = async (file: Blob) => {   
    return await repository.patchPhoto(file);
  }

  const save = async () => {
    state.isLoading = true;
    var accountToSent = state.account;

    await repository.update({
      name: accountToSent?.name,
      nickname: accountToSent?.nickname,
      address: accountToSent?.address,
      city: accountToSent?.city,
      state: accountToSent?.state,
      zip: accountToSent?.zip,
      birthDate: accountToSent?.birthDate,
      identifier: accountToSent?.identifier,
      availability: accountToSent?.availability,
    });

    state.isLoading = false;
  };

  return {
    getAccount,
    getAccountData,
    isLoading,
    uploadPhoto,
    save,    
  };
});
