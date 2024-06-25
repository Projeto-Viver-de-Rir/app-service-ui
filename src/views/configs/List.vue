<script lang="ts">
import type { ComputedRef, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ref, defineComponent, onMounted, computed } from "vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";

import configsTable from "@/components/tables/configsTable.vue";
import { useConfigs } from "../../stores/configStore";

interface SetupData {
  filters: ComputedRef;
  isLoading: ComputedRef<boolean>;
  shceduleEvent: ComputedRef;
  getConfigs: () => void;
}

export default defineComponent({
  name: "ConfigsList",
  components: {
    BaseBreadcrumb,
    UiParentCard,
    configsTable,
  },
  setup(): SetupData {
    const page = ref({ title: "Configurações" });
    const breadcrumbs = ref([
      {
        text: "Dashboard",
        disabled: false,
        href: "/",
      },
      {
        text: "Configurações",
        disabled: true,
        href: "#",
      },
    ]);

    const route = useRoute();
    const router = useRouter();
    const store = useConfigs();
    const filters = computed(() => store.filters);
    const showModel = computed(() => store.showModel);
    const scheduleEvent = computed(() => store.getItem);

    const isLoading = computed(() => store.isLoading);

    const filter = async () => {
      await store.filter();
    };

    const getConfigs = (): void => {
      store.filter();
    };

    return {
      filters,
      filter,
      getConfigs,
      page,
      breadcrumbs,
      showModel,
      scheduleEvent,
      isLoading,
    };
  },
});
</script>

<template>
  <div v-if="isLoading" class="loading"></div>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  ></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Filtros">
        <v-row>
          <v-col cols="5" md="4">
            <v-text-field label="Nome" v-model="filters.name"> </v-text-field>
          </v-col>
          <v-col cols="2" md="2">
            <v-btn size="large" @click="filter()" color="primary" type="submit"
              >Filtrar</v-btn
            >
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="12">
      <configsTable></configsTable>
    </v-col>
  </v-row>
</template>
