<script lang="ts">
import { ref, defineComponent, onMounted, computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import AccountTabs from "@/components/account/AccountTabs.vue";

interface SetupData {
  account: ComputedRef;
  isEditing: ComputedRef<boolean>;
}

export default defineComponent({
  name: "accountEnroll",
  components: {
    BaseBreadcrumb,
    UiParentCard,
    AccountTabs
  },
  setup(): SetupData {
    const page = ref({ title: "Bem vindo!" });
    const breadcrumbs = ref([
      {
        text: "Completar Cadastro",
        disabled: true,
        href: "#",
      }
    ]);


    return {
      breadcrumbs,
      page
    };
  },
});
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  ></BaseBreadcrumb>
  <v-row>
    <UiParentCard>
      <AccountTabs />
    </UiParentCard>  
  </v-row>
</template>
