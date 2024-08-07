<script lang="ts">
import { ref, defineComponent, onMounted, computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import { useRoute, useRouter } from "vue-router";

import { useEnroll } from "../../stores/enrollStore";
import type { storeToRefs } from "pinia";

interface SetupData {
  account: ComputedRef;
  isLoading: ComputedRef<boolean>;
  isEditing: ComputedRef<boolean>;
}

export default defineComponent({
  name: "accountEnroll",
  components: {
    BaseBreadcrumb,
    UiParentCard,
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
    const route = useRoute();
    const router = useRouter();
    const store = useEnroll();

    onMounted(async () => {
      await store.getAccountData();
    });
    const account = computed(() => store.getAccount);
    const isLoading = computed(() => store.isLoading);
    const isEditing = computed(() => store.isEditing);

    const save = async () => {
       await store.save();
      router.push({ path: "/dashboard", replace: true });
    };

    return {
    account,
      isLoading,
      isEditing,
      breadcrumbs,
      save,
      page
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
    <UiParentCard v-if="!isLoading && account !== null">
      <v-row v-if="!isEditing">
        <v-col cols="12" md="12" style="text-align: right">
          teste
        </v-col>
      </v-row>
    </UiParentCard>
  </v-row>
</template>
