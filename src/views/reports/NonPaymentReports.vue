<script lang="ts">
import { ref, defineComponent } from "vue";
import type { ComputedRef } from "vue";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";

interface SetupData {
  isLoading: ComputedRef<boolean>;
}

export default defineComponent({
  name: "NonPaymentReports",
  components: {
    BaseBreadcrumb,
  },

  setup(): SetupData {
    const page = ref({ title: "Inadimplência atual" });

    const breadcrumbs = ref([
      {
        text: "Minha Área",
        disabled: true,
        href: "/",
      },
      {
        text: "Inadimplência atual",
        disabled: true,
        href: "#",
      },
    ]);

    return {
      page,
      breadcrumbs,
    };
  },
});
</script>

<template>
  <div v-if="isLoading" class="loading" />
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />
</template>
