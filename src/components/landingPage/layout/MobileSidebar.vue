<script setup lang="ts">
import { ref } from "vue";
import {
  AppsIcon,
  CalendarIcon,
  MailIcon,
  MessagesIcon,
} from "vue-tabler-icons";
import QuickLinks from "@/components/landingPage/layout/PageMenuQuicklinks.vue";
import AppsLink from "@/components/landingPage/layout/PageMegamenu.vue";
import { useCustomizerStore } from "@/stores/customizer";
import Logo from "@/layouts/full/logo/Logo.vue";
const customizer = useCustomizerStore();
</script>

<template>
  <div class="pt-6 lp-mobile-sidebar">
    <div class="ml-6 mb-3">
      <div v-if="customizer.setRTLLayout" rtl>
        <RtlLogo />
      </div>
      <div v-else>
        <Logo />
      </div>
    </div>
    <v-list class="right-sidebar py-0 px-2">
      <v-list-group value="Apps">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" rounded="md">
            <h5 class="text-subtitle-1">Demos</h5>
          </v-list-item>
        </template>
      </v-list-group>
    </v-list>
    <v-list class="right-sidebar py-0 px-2">
      <v-list-group value="Apps">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" rounded="md">
            <h5 class="text-subtitle-1">Pages</h5>
          </v-list-item>
        </template>
        <v-list-item class="pl-6 pb-6">
          <div class="mt-4">
            <AppsLink />
          </div>
          <div class="mt-8">
            <h5 class="text-h5 mb-3">Quick Links</h5>
            <QuickLinks />
          </div>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-list class="py-0 px-2">
      <v-list-item rounded="md">
        <v-btn
          variant="text"
          class="custom-hover-primary px-0 text-left"
          flat
          href="https://demos.adminmart.com/premium/vue/modernize-vuejs/docs/index.html"
          target="_blank"
        >
          <h5 class="text-subtitle-1">Documentation</h5>
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
