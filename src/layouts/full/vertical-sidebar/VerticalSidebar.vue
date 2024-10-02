<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
import sidebarItems from "./sidebarItem";
import type { volunteer } from "@/entities/volunteer";

import NavGroup from "./NavGroup/index.vue";
import NavItem from "./NavItem/index.vue";
import NavCollapse from "./NavCollapse/NavCollapse.vue";
import Logo from "../logo/Logo.vue";

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);

const user = localStorage.getItem("user");
let userData: volunteer;
if (!!user) {
  userData = JSON.parse(user);
}
</script>

<template>
  <v-navigation-drawer
    left
    v-model="customizer.Sidebar_drawer"
    elevation="0"
    rail-width="75"
    app
    class="leftSidebar"
    :rail="customizer.mini_sidebar"
    expand-on-hover
    width="270"
  >
    <!---Logo part -->
    <v-locale-provider>
      <div class="pa-5">
        <Logo />
      </div>
    </v-locale-provider>

    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list class="pa-6">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu">
          <template
            v-if="
              !item.roles ||
              item.roles?.some((someItem) =>
                userData?.permissions?.includes(someItem)
              )
            ">
            <!---Item Sub Header -->
            <NavGroup :item="item" v-if="item.header" :key="item.title" />
            <!---If Has Child -->
            <NavCollapse
              class="leftPadding"
              :item="item"
              :level="0"
              v-else-if="item.children"
            />
            <!---Single Item-->
            <NavItem :item="item" v-else class="leftPadding" />
            <!---End Single Item-->
          </template>
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
