<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useCustomizerStore } from "../../../stores/customizer";
// Icon Imports
import {
  GridDotsIcon,
  LanguageIcon,
  SearchIcon,
  Menu2Icon,
  BellRingingIcon,
  ShoppingCartIcon,
} from "vue-tabler-icons";
import Logo from "../logo/Logo.vue";

// dropdown imports
import ProfileDD from "../vertical-header/ProfileDD.vue";
import Navigations from "../vertical-header/Navigations.vue";

const customizer = useCustomizerStore();
const showSearch = ref(false);
const drawer = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
  showSearch.value = !showSearch.value;
}
watch(priority, (newPriority) => {
  // yes, console.log() is a side effect
  priority.value = newPriority;
});

// count items
</script>

<template>
  <v-app-bar
    elevation="10"
    :priority="priority"
    height="70"
    class="horizontal-header"
  >
    <div
      :class="
        customizer.boxed
          ? 'maxWidth v-toolbar__content'
          : 'v-toolbar__content px-6'
      "
    >
      <v-locale-provider>
        <div class="hidden-md-and-down">
          <Logo />
        </div>
      </v-locale-provider>

      <v-btn
        class="hidden-lg-and-up ms-3"
        icon
        rounded="sm"
        variant="flat"
        @click.stop="customizer.SET_SIDEBAR_DRAWER"
        size="small"
      >
        <Menu2Icon size="20" stroke-width="1.5" />
      </v-btn>

      <v-spacer />

      <!-- ---------------------------------------------- -->
      <!-- User Profile -->
      <!-- ---------------------------------------------- -->
      <div class="ml-3 mr-sm-0 mr-3">
        <ProfileDD />
      </div>
    </div>
  </v-app-bar>

</template>
