// ===============================|| Blank Layout
||=============================== //
<script setup lang="ts">
import { RouterView } from "vue-router";
import { useCustomizerStore } from "../../stores/customizer";
const customizer = useCustomizerStore();
</script>
<template>
  <!-----LTR LAYOUT------->
  <v-locale-provider>
    <v-app :theme="customizer.actTheme">
      <RouterView />
    </v-app>
  </v-locale-provider>
</template>
