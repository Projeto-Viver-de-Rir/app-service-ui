<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue";
import type { ComputedRef } from "vue";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import PersonalDebtsHeader from "@/components/headers/personalDebtsHeader.vue";
import personalDebtsTable from "@/components/tables/personalDebtsTable.vue";
import { useDebts } from "@/stores/debtStore";

interface SetupData {
  isLoading: ComputedRef<boolean>;
  debts: ComputedRef;
}

const store = useDebts();

export default defineComponent({
  name: "PersonalDebts",
  components: {
    BaseBreadcrumb,
    personalDebtsTable,
    PersonalDebtsHeader,
  },

  setup(): SetupData {
    onMounted(async () => {
      const user = localStorage.getItem("user");
      if (!!user) {
        await store.getDataByYear(JSON.parse(user).id);
      }
    });

    const debts = computed(() => store.getPersonalDebts);
    const page = ref({ title: "Mensalidades" });
    const isLoading = computed(() => store.isLoading);

    const breadcrumbs = ref([
      {
        text: "Minha Área",
        disabled: true,
        href: "/",
      },
      {
        text: "Minhas Mensalidades",
        disabled: true,
        href: "#",
      },
    ]);

    return {
      page,
      isLoading,
      breadcrumbs,
      debts,
    };
  },
});
</script>

<template>
  <div v-if="isLoading" class="loading" />
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <template v-if="debts.results">
    <PersonalDebtsHeader />
    <personalDebtsTable />
  </template>
</template>
