<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue";
import type { ComputedRef } from "vue";
import { useReports } from "@/stores/reportStore";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";

interface SetupData {
  isLoading: ComputedRef<boolean>;
  debtsReport: ComputedRef;
}

const store = useReports();

export default defineComponent({
  name: "NonPaymentReports",
  components: {
    BaseBreadcrumb,
  },

  setup(): SetupData {
    onMounted(async () => {
      await store.getDebtsReportData();
    });

    const debtsReport = computed(() => store.getDebtsReport);
    const page = ref({ title: "Inadimplência atual" });

    const breadcrumbs = ref([
      {
        text: "Gerado em 15/05/2024",
        disabled: true,
        href: "/",
      },
    ]);

    return {
      page,
      breadcrumbs,
      debtsReport,
    };
  },
});
</script>

<template>
  <div v-if="isLoading" class="loading" />
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />
</template>
