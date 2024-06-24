<script lang="ts">
import { ref, defineComponent, onMounted, computed } from "vue";
import type { ComputedRef, Ref } from "vue";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import { useRoute, useRouter } from "vue-router";
import debtsTable from "@/components/tables/debtsTable.vue";
import { useDebts } from "../../stores/debtStore";

interface SetupData {
  filters: ComputedRef;
  isLoading: ComputedRef<boolean>;
  debt: ComputedRef;
  users: ComputedRef;
  getDebts: () => void;
  showModel: ComputedRef<boolean>;
  showModelGenerateDebts: ComputedRef<boolean>;
  startDateGenerateDebts: ComputedRef<Date>;
  endDateGenerateDebts: ComputedRef<Date>;
  generateDebtsRequest: ComputedRef;
}

export default defineComponent({
  name: "FeesList",
  components: {
    BaseBreadcrumb,
    UiParentCard,
    debtsTable,
  },
  setup(): SetupData {
    const page = ref({ title: "Mensalidades" });
    const breadcrumbs = ref([
      {
        text: "Dashboard",
        disabled: false,
        href: "/",
      },
      {
        text: "Mensalidades",
        disabled: true,
        href: "#",
      },
    ]);
    const route = useRoute();
    const router = useRouter();
    const store = useDebts();
    const filters = computed(() => store.filters);
    const showModel = computed(() => store.showModel);
    const debt = computed(() => store.getDebt);
    const showModelGenerateDebts = computed(() => store.showModelGenerateDebts);
    const startDateGenerateDebts = computed(() => store.startDateGenerateDebts);
    const endDateGenerateDebts = computed(() => store.endDateGenerateDebts);
    const generateDebtsRequest = computed(() => store.generateDebtsRequest);
    const users = computed(() => store.users);

    const isLoading = computed(() => store.isLoading);
    const format = (date) => {
      const day = date.getDate();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      return day + "/" + month + "/" + year;
    };
    const filter = async () => {
      await store.filter();
    };
    const getDebts = (): void => {
      store.filter();
    };
    const closeModalPayment = (): void => {
      store.closeModalPayment();
    };
    const confirmPayment = async () => {
      await store.confirmPayment();
    };

    const openModalGenerateDebts = async () => {
      await store.openModalGenerateDebts();
    };

    const closeModalGenerateDebts = async () => {
      await store.closeModalGenerateDebts();
    };

    const generateDebts = async () => {
      await store.generateDebts();
    };

    return {
      filters,
      filter,
      getDebts,
      page,
      breadcrumbs,
      showModel,
      debt,
      closeModalPayment,
      confirmPayment,
      openModalGenerateDebts,
      closeModalGenerateDebts,
      generateDebts,
      showModelGenerateDebts,
      generateDebtsRequest,
      users,
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
            <v-autocomplete
              v-model="filters.volunteerId"
              :items="users"
              item-value="value"
              item-text="title"
              label="Selecione o voluntário"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
          <v-col cols="5" md="4">
            <v-text-field label="Nome" v-model="filters.name"> </v-text-field>
          </v-col>
          <v-col cols="2" md="2">
            <v-btn size="large" @click="filter()" color="primary" type="submit"
              >Filtrar</v-btn
            >
          </v-col>
          <v-col cols="2" md="2">
            <v-btn
              size="large"
              @click="openModalGenerateDebts()"
              style="margin-right: 15px"
              color="warning"
              type="submit"
              >Gerar agenda</v-btn
            >
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="12">
      <debtsTable></debtsTable>
    </v-col>
  </v-row>

  <v-dialog v-model="showModel" width="450">
    <UiParentCard title="Confirmação pagamento">
      <v-row>
        <v-col cols="12" md="12">
          <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
            >Voluntário:</v-label
          >
          <h1>{{ debt.volunteer.name }}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
            >Competência:</v-label
          >
          <h1>{{ debt.name }}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
            >Data de pagamento:</v-label
          >
          <VueDatePicker
            v-model="debt.paidAt"
            inline
            :format="format"
            auto-apply
            :enableTimePicker="false"
            locale="pt-BR"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" style="text-align: right">
          <v-btn
            style="margin-right: 5px"
            size="large"
            @click="closeModalPayment()"
            color="light"
            type="submit"
            >Cancelar</v-btn
          >
          <v-btn
            style="margin-right: 5px"
            size="large"
            @click="confirmPayment()"
            :disabled="debt.paidAt == null"
            color="success"
            type="submit"
            >Confirmar</v-btn
          >
        </v-col>
      </v-row>
    </UiParentCard>
  </v-dialog>

  <v-dialog v-model="showModelGenerateDebts" width="700">
    <UiParentCard title="Gerar mensalidades">
      <v-row>
        <v-col cols="12" md="12">
          <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
            >Informe as datas para qual deseja gerar as mensalidades</v-label
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
            >Data inicial:</v-label
          >
          <VueDatePicker
            v-model="generateDebtsRequest.startsAt"
            inline
            :format="format"
            auto-apply
            :enableTimePicker="false"
            locale="pt-BR"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-label class="text-subtitle-1 font-weight-semibold text-lightText"
            >Data final:</v-label
          >
          <VueDatePicker
            v-model="generateDebtsRequest.endsAt"
            inline
            :format="format"
            auto-apply
            :enableTimePicker="false"
            locale="pt-BR"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" style="text-align: right">
          <v-btn
            style="margin-right: 5px"
            size="large"
            @click="closeModalGenerateDebts()"
            color="light"
            type="submit"
            >Cancelar</v-btn
          >
          <v-btn
            style="margin-right: 5px"
            size="large"
            @click="generateDebts()"
            color="success"
            type="submit"
            >Gerar</v-btn
          >
        </v-col>
      </v-row>
    </UiParentCard>
  </v-dialog>
</template>
