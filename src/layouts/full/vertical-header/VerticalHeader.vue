<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useCustomizerStore } from "../../../stores/customizer";
import {
  GridDotsIcon,
  LanguageIcon,
  SearchIcon,
  Menu2Icon,
  BellRingingIcon,
  ShoppingCartIcon,
} from "vue-tabler-icons";
import LanguageDD from "./LanguageDD.vue";
import NotificationDD from "./NotificationDD.vue";
import ProfileDD from "./ProfileDD.vue";
import Searchbar from "./Searchbar.vue";
import RightMobileSidebar from "./RightMobileSidebar.vue";
import Navigations from "./Navigations.vue";

const customizer = useCustomizerStore();
const showSearch = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
  showSearch.value = !showSearch.value;
}
watch(priority, (newPriority) => {
  priority.value = newPriority;
});
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="70" class="">
    <v-btn
      class="hidden-md-and-down"
      icon
      color="primary"
      variant="text"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up"
      icon
      variant="flat"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <!-- search mobile -->
    <!-- <v-btn class="hidden-lg-and-up ml-3" icon variant="text" color="primary" @click="searchbox">
            <SearchIcon size="17" stroke-width="1.5" />
        </v-btn> -->

    <!-- <v-sheet v-if="showSearch" class="search-sheet v-col-12">
            <Searchbar :closesearch="searchbox" />
        </v-sheet> -->

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col style="text-align: right" cols="12" md="12">
        <ProfileDD />
      </v-col>
    </v-row>
  </v-app-bar>

  <!-- ---------------------------------------------- -->
  <!-- Right Sidebar -->
  <!-- ---------------------------------------------- -->
  <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
    <RightMobileSidebar />
  </v-navigation-drawer>
</template>
