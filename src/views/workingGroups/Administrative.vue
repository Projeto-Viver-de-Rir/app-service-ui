<script lang="ts">
import type { ComputedRef, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ref, defineComponent, onMounted, computed } from "vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";

import workingGroupsTable from "@/components/tables/workingGroupsTable.vue";
import { useWorkingGroups } from "../../stores/workingGroupStore";

interface SetupData {
  filters: ComputedRef;
  isLoading: ComputedRef<boolean>;
  shceduleEvent: ComputedRef;
  getWorkingGroups: () => void;
}

export default defineComponent({
  name: "WorkingGroups-Administrative",
  components: {
    BaseBreadcrumb,
    UiParentCard,
    workingGroupsTable,
  },
  setup(): SetupData {
    onMounted(async () => {
      await store.searchAdministrative();
    });

    const page = ref({ title: "Executivo" });
    const breadcrumbs = ref([
      {
        text: "Grupos de Trabalho",
        disabled: true,
        href: "#",
      },
      {
        text: "Executivo",
        disabled: true,
        href: "#",
      },
    ]);

    const route = useRoute();
    const router = useRouter();
    const store = useWorkingGroups();
    const isLoading = computed(() => store.isLoading);

    const getWorkingGroups = (): void => {
      store.searchAdministrative();
    };

    return {
      getWorkingGroups,
      page,
      breadcrumbs,
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
      <workingGroupsTable></workingGroupsTable>
    </v-col>
  </v-row>
</template>
