<script setup lang="ts">
import { onMounted, ref } from "vue";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import eventsTableCustom from "@/components/tables/eventsTableCustom.vue";

import { storeToRefs } from 'pinia';
import { useEvents } from "@/stores/eventStore";

const page = ref({ title: "Dashboard" });
const DASHBOARD_NEXT_EVENTS_QUERY = `status=1&currentPage=1&pageSize=100`;

const { isLoading } = storeToRefs(useEvents());

onMounted(async () => {
  await useEvents().getDataByQuery(DASHBOARD_NEXT_EVENTS_QUERY);
});
</script>

<template>
  <div class="dashboard-view">
    <BaseBreadcrumb
      :title="page.title"
    ></BaseBreadcrumb>
    <div v-if="isLoading" class="loading"></div>
    <v-row v-else>
      <v-col cols="12" md="12">
        <UiParentCard title="Próximos eventos">
          <eventsTableCustom />
        </UiParentCard>
      </v-col>
    </v-row>
  </div>
</template>
