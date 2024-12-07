<script setup lang="ts">
import { onMounted, ref } from "vue";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import eventsTableCustom from "@/components/tables/eventsTableCustom.vue";

import { storeToRefs } from 'pinia';
import { useEvents } from "@/stores/eventStore";

const page = ref({ title: "Bem vindo!" });
const DASHBOARD_NEXT_EVENTS_QUERY = `status=1&currentPage=1&pageSize=100`;

const { isLoading } = storeToRefs(useEvents());

const getVersion = () => {
  let lastReload = localStorage.getItem("lastReload");
  return new Date(parseInt(lastReload)).toLocaleDateString("pt-BR");
}

onMounted(async () => {
    let lastReload = localStorage.getItem("lastReload");

    if (lastReload == null){
      localStorage.setItem("lastReload", Date.now().toString());
      window.location.reload();
    } else {
      let expected = (Date.now() - new Date(parseInt(lastReload)))/86_400_000;

      if(expected >= 1){
        localStorage.setItem("lastReload", Date.now().toString());
        window.location.reload();
      }
    }

  await useEvents().getDataByQuery(DASHBOARD_NEXT_EVENTS_QUERY);
});
</script>

<template>
  <div class="dashboard-view">
    <BaseBreadcrumb
      :title="page.title"
    ></BaseBreadcrumb>
    <span class="text-subtitle-1">
      Versão {{getVersion()}}
    </span>
    <div v-if="isLoading" class="loading"></div>
    <v-row v-else>
      <v-col cols="12" md="12">
        <v-card variant="outlined" elevation="0">
          <eventsTableCustom />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
