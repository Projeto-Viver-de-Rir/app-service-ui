<script setup lang="ts">
import { ref } from "vue";
import {
  AppsIcon,
  CalendarIcon,
  MailIcon,
  MessagesIcon,
} from "vue-tabler-icons";

import { useCustomizerStore } from "@/stores/customizer";
import Logo from "@/layouts/full/logo/Logo.vue";
const customizer = useCustomizerStore();
</script>

<template>
  <div class="pt-6 lp-mobile-sidebar">
    <div class="ml-6 mb-3">
      <div>
        <Logo />
      </div>
    </div>
    <v-list class="py-0 px-2">
      <v-list-item rounded="md">
        <v-btn
          variant="text"
          class="custom-hover-primary px-0 text-left"
          flat
          href="/contact"
          target="_blank"
        >
          <h5 class="text-subtitle-1">Contato</h5>
        </v-btn>
      </v-list-item>
      <v-list-item class="mt-2" rounded="md">
        <v-btn
          class="custom-hover-primary bg-primary"
          block
          flat
          href="/auth/login"
          target="_blank"
          >Login</v-btn
        >
      </v-list-item>
    </v-list>
  </div>
</template>
