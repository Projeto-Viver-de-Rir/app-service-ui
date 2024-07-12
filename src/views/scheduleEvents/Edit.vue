<script lang="ts">
import type { storeToRefs } from "pinia";
import type { ComputedRef, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import { ref, defineComponent, onMounted, computed } from "vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";

import { useScheduleEvents } from "../../stores/scheduleEventStore";

interface SetupData {
  scheduleEvent: ComputedRef;
  isLoading: ComputedRef<boolean>;
}

export default defineComponent({
  name: "scheduleEventEdit",
  components: {
    BaseBreadcrumb,
    UiParentCard,
  },
  setup(): SetupData {
    const page = ref({ title: "Eventos Programados" });
    const breadcrumbs = ref([
      {
        text: "Dashboard",
        disabled: false,
        href: "/",
      },
      {
        text: "Eventos Programados",
        disabled: false,
        href: "/schedule-events",
      },
      {
        text: "Editar",
        disabled: true,
        href: "#",
      },
    ]);
    const route = useRoute();
    const router = useRouter();
    const store = useScheduleEvents();

    onMounted(async () => {
      await store.getById(route.params["id"]);
    });

    const scheduleEvent = computed(() => store.getItem);
    const isLoading = computed(() => store.isLoading);

    const cancel = (): void => {
      router.push({ path: "/schedule-events", replace: true });
    };

    const save = async () => {
      await store.save();
      router.push({ path: "/schedule-events", replace: true });
    };

    return {
      scheduleEvent,
      isLoading,
      breadcrumbs,
      page,
      cancel,
      save,
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
  <UiParentCard v-if="!isLoading && scheduleEvent !== null">
    <v-row>
      <v-col cols="12" md="12" style="text-align: right">
        <v-btn
          style="margin-right: 5px"
          size="large"
          @click="cancel()"
          color="light"
          type="submit"
          >Cancelar</v-btn
        >
        <v-btn
          style="margin-right: 5px"
          size="large"
          @click="save()"
          color="success"
          type="submit"
          >Salvar</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
          >Nome:</v-label
        >
        <v-text-field v-model="scheduleEvent.name"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
          >Descrição</v-label
        >
        <v-text-field v-model="scheduleEvent.description"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
          >Endereço:</v-label
        >
        <v-text-field v-model="scheduleEvent.address"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
          >Cidade:</v-label
        >
        <v-text-field v-model="scheduleEvent.city"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
          >Ponto de Encontro:</v-label
        >
        <v-text-field v-model="scheduleEvent.meetingPoint"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
          >Quantidade de Vagas:</v-label
        >
        <v-text-field v-model="scheduleEvent.occupancy"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
          >Dia da Semana:</v-label
        >
        <v-text-field v-model="scheduleEvent.dayOfWeek"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
          >Frequência:</v-label
        >
        <v-text-field v-model="scheduleEvent.occurrence"></v-text-field>
      </v-col>
    </v-row>
  </UiParentCard>
</template>
