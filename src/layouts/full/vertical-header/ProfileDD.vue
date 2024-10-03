<script setup lang="ts">
import { MailIcon } from "vue-tabler-icons";
import { profileDD } from "@/_mockApis/headerData";

import { useAuthStore } from "@/stores/auth";
import { isUserAvatarAvailable } from "@/utils/event";

import { computed } from "vue";
import { useAccountData } from "@/stores/accountStore";
import { storeToRefs } from "pinia";
import { getUserContext } from "@/utils/permissions";

const authStore = useAuthStore();
const accountStore =  useAccountData();

const { account } = storeToRefs(accountStore);

const shouldDisplayDefaultAvatar = computed((): boolean => {
  if (account.value && account.value.volunteer?.photo) {
    return !isUserAvatarAvailable(account.value.volunteer.photo)
  } else if (authStore.user.volunteer?.photo) {
    return !isUserAvatarAvailable(authStore.user.volunteer.photo)
  }
  return true;
});

const userContext = computed((): Record<string, any> => {
  return getUserContext();
});

</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
        <v-avatar
          size="40"
          v-if="shouldDisplayDefaultAvatar"
        >
          <img src="@/assets/images/palhaco.png" alt="user" height="40" />
        </v-avatar>
        <v-avatar
          size="40"
          v-else
        >
          <img :src="userContext.volunteer.photo" height="40" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="360" elevation="10">
      <div class="px-8 pt-6">
        <h6 class="text-h5 font-weight-medium">Voluntário</h6>
        <div class="d-flex align-center mt-4 pb-6">
          <v-avatar
            size="80"
            v-if="shouldDisplayDefaultAvatar"
          >
            <img src="@/assets/images/palhaco.png" alt="user" height="80" />
          </v-avatar>
          <v-avatar
            size="80"
            v-else
          >
            <img :src="userContext.volunteer.photo" height="80" />
          </v-avatar>
          <div class="ml-3">
            <h6 class="text-h6 mb-n1">{{ userContext.volunteer.name }}</h6>
            <span class="text-subtitle-1 font-weight-regular textSecondary">{{
              userContext.volunteer.nickname
            }}</span>
            <div class="d-flex align-center mt-1">
              <MailIcon size="18" stroke-width="1.5" />
              <span
                class="text-subtitle-1 font-weight-regular textSecondary ml-2"
                >{{ userContext.email }}</span
              >
            </div>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
      <perfect-scrollbar style="height: calc(100vh - 80px); max-height: 80px">
        <v-list class="py-0 theme-list" lines="two">
          <v-list-item
            v-for="item in profileDD"
            :key="item.title"
            class="py-4 px-8 custom-text-primary"
            :to="item.href"
          >
            <template v-slot:prepend>
              <v-avatar
                size="48"
                color="lightprimary"
                class="mr-3"
                rounded="md"
              >
                <v-img
                  :src="item.avatar"
                  width="24"
                  height="24"
                  :alt="item.avatar"
                />
              </v-avatar>
            </template>
            <div>
              <h6 class="text-subtitle-1 font-weight-bold mb-2 custom-title">
                {{ item.title }}
              </h6>
            </div>
            <p class="text-subtitle-1 font-weight-regular textSecondary">
              {{ item.subtitle }}
            </p>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
      <div class="pt-4 pb-6 px-8 text-center">
        <v-btn
          color="primary"
          variant="outlined"
          block
          @click="authStore.logout()"
          >Logout</v-btn
        >
      </div>
    </v-sheet>
  </v-menu>
</template>
