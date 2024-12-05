<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";

import UiParentCard from "@/components/shared/UiParentCard.vue";
import ConfirmRemoveNonPaymentModal from "@/components/modals/ConfirmRemoveNonPaymentModal.vue";
import ConfirmGenerateReportModal from "@/components/modals/ConfirmGenerateReportModal.vue";
import ActionBar from "@/components/shared/ActionBar.vue";
import { storeToRefs } from 'pinia';
import { useReports } from "@/stores/reportsStore";
import type { NonPayment } from "@/entities/reports";
import { useSnackBar } from "@/stores/snackBarStore";
import type { ActionButton } from "@/interfaces/event";
import { reportsListActions } from "@/utils/reports";

const data = reactive({
  displayConfirmEventScheduleModal: false,
  itemsPerPage: 10,
  currentPage: 1,
  filterInfo: true,
  tableHeaders: [
    { title: 'Nome', key: 'volunteer.name', sortable: true, align: 'start' },
    { title: 'Palhaço', key: 'volunteer.nickname', sortable: true, align: 'center' },
    { title: 'Número', key: 'quantity', sortable: false, align: 'center' },
    { title: 'Valor (R$)', key: 'amount', sortable: false, align: 'center' },
    { title: ' ', key: 'actions', align: 'start' },
  ],
  sortOptions: [] as Array<any>,
  sorted: [] as Array<any>,
  nonPaymentToRemove: null as NonPayment | null,
  displayConfirmRemoveNonPaymentModal: false,
  displayConfirmGenerateNewReportModal: false,
})

const { isLoading, 
        getList: nonPayments,
        nonPaymentsCreatedAt,
        currentPage,
        totalItems
} = storeToRefs(useReports());
const snackBarStore = useSnackBar();

const width = ref(window.innerWidth)

const isMobile = computed(() => {
  return width.value < 960;
})

const setWindowWidth = () => {
  width.value = window.innerWidth;
}

watch(
  [() => currentPage.value],
  ([currentPage]: [number]) => {
    if(currentPage) {
      data.currentPage = currentPage;
    }
  },
  { immediate: true },
);

const requestQuery = computed(() => {
  let query = `currentPage=${data.currentPage}&pageSize=${data.itemsPerPage}`;
  return query;
})

const nonPaymentsCreatedAtFormatted = computed(() => {
  if (!nonPaymentsCreatedAt.value) return ''
  return new Date(nonPaymentsCreatedAt.value).toLocaleDateString("pt-BR");
})

const filteredInfo = computed(() => {
  const tagPrefix = '<span class="font-weight-bold text-lightText">';
  const sufixPrefix = '</span>';
  let info = `${tagPrefix}Estes dados foram gerados em: ${nonPaymentsCreatedAtFormatted.value}${sufixPrefix}`
  return info;
})

const pageChanged = (page: number) => {
  data.currentPage = page;
  getData();
}

const toggleSort = (value: Array<any>) => {
  data.sortOptions = value;
}

const itemsToDisplay = computed(() => {
  if(!data.sortOptions.length) return nonPayments.value;
  let arr = nonPayments.value.slice();
  const sortKey = data.sortOptions[0].key
  const sortOrder = data.sortOptions[0].order
  return arr.sort((a: any, b: any): any => {
    const aValue = a[sortKey].toUpperCase(); 
    const bValue = b[sortKey].toUpperCase();
    if (sortOrder === 'desc') {
      if (aValue < bValue) {
        return 1;
      }
      if (aValue > bValue) {
        return -1;
      }
    } else {
      if (aValue > bValue) {
        return 1;
      }
      if (aValue < bValue) {
        return -1;
      }
    }
    return 0;
  });
})

const getData = async () => {
  try {
    await useReports().getNonPaymentsByQuery(requestQuery.value);
  } catch (e) {
    throw new Error('Unable to fetch non-payments list')
  }
}

const deleteNonPayment = async (id: string) => {
  try {
    await useReports().deleteNonPayment(id);
    snackBarStore.addToQueue({ 
			color: 'success', 
			message: "Débito removido do relatório com sucesso."
		});
    getData();
  } catch (e) {
    snackBarStore.addToQueue({ 
			color: 'error', 
			message: "Não foi possível remover o débito do relatório."
		});
    throw new Error('Unable to fetch non-payments list')
  }
}

const generateReport = async () => {
  try {
    await useReports().generateNewReport('non-payments');
    snackBarStore.addToQueue({ 
			color: 'success', 
			message: "Relatório gerado com sucesso."
		});
    getData();
  } catch (e: any) {
    snackBarStore.addToQueue({ 
			color: 'error', 
			message: e.message.split('Error: ')[1],
		});
  }
}

const showConfirmRemoveNonPaymentDialog = (nonPayment: NonPayment): void => {
  data.displayConfirmRemoveNonPaymentModal = true;
  data.nonPaymentToRemove = nonPayment;
}

const hideConfirmRemoveNonPaymentDialog = ({ confirm }: { confirm: boolean }): void => {
  data.displayConfirmRemoveNonPaymentModal = false;
  if (confirm) {
    deleteNonPayment(data.nonPaymentToRemove?.id as any)
    data.nonPaymentToRemove = null;
  }
}

const showConfirmGenerateNewReportDialog = (): void => {
  data.displayConfirmGenerateNewReportModal = true;
}

const hideConfirmGenerateNewReportDialog = ({ confirm }: { confirm: boolean }): void => {
  data.displayConfirmGenerateNewReportModal = false;
  if (confirm) {
    generateReport()
  }
}

const menuActions = computed((): Array<ActionButton> => {
  const actions = reportsListActions();
  return actions.map((action: any) => {
    return {
      ...action,
      ...(action.id === 0 ? { onClick: showConfirmGenerateNewReportDialog } : {}),
    }
  });
});

onMounted(async () => {
  window.addEventListener('resize', setWindowWidth);
  await getData();
});

onUnmounted(async () => {
  window.removeEventListener('resize', setWindowWidth);
});
</script>

<template>
  <div class="event-list-view">
    <v-row>
      <v-col cols="12" md="12">
        <UiParentCard title="Relatório de Inadimplência">
          <template v-slot:action>
            <ActionBar :actions="menuActions" />
          </template>
          <v-fade-transition>
            <v-alert
                v-model="data.filterInfo"
                :border="'bottom'"
                color="primary"
                type="info"
                variant="tonal"
                class="mb-5"
                closable
              >
                <p v-html="filteredInfo" />
                <p>Se necessário, você pode gerar um relatório novo.</p>
            </v-alert>
          </v-fade-transition>
          <v-data-table-server
            v-model:items-per-page="data.itemsPerPage"
            class="pb-4 border rounded"
            :headers="data.tableHeaders"
            :items="itemsToDisplay"
            :items-length="totalItems"
            :loading="isLoading"
            :page="currentPage"
            @update:sortBy="toggleSort"
            items-per-page-text="Itens por página"
            loading-text="Carregando... Por favor aguarde"
            @update:itemsPerPage="getData"
            @update:page="pageChanged"
          >

            <template v-slot:no-data>
              <p class="align-center d-flex justify-center">
                <span>Nenhum resultado encontrado para os filtros aplicados.</span>
              </p>
            </template>

            <template v-slot:item.actions="{ item }">
              <router-link
                tag="v-btn"
                :to="{ name: 'VolunteerDetails', params: { id: item.volunteerId } }"
              >
                <v-btn size="small" color="primary" type="submit" variant="text"
                  >Detalhes</v-btn
                >
              </router-link>
              <v-btn size="small" color="error" type="submit" variant="text" @click="showConfirmRemoveNonPaymentDialog(item)">
                Excluir
              </v-btn>
            </template>
          </v-data-table-server>
        </UiParentCard>
      </v-col>
    </v-row>
  </div>

  <!-- Modal Confirm Remove NonPayment -->
  <ConfirmRemoveNonPaymentModal
    v-if="data.displayConfirmRemoveNonPaymentModal"
    :nonPayment="data.nonPaymentToRemove"
    :mobileView="isMobile"
    :dialog="data.displayConfirmRemoveNonPaymentModal"
    @closeConfirmRemoveNonPaymentModal="hideConfirmRemoveNonPaymentDialog" />

  <!-- Modal Confirm Generate Report -->
  <ConfirmGenerateReportModal
    v-if="data.displayConfirmGenerateNewReportModal"
    :mobileView="isMobile"
    :dialog="data.displayConfirmGenerateNewReportModal"
    @closeConfirmGenerateReportModal="hideConfirmGenerateNewReportDialog" />
</template>

<style lang="scss" scoped>
/* Hack to fix Vuetify not setting xs style on the current version */
/* ToDo: upgrade Vuetify version on the future */
@media (max-width: 480px) {
  .v-col-xs-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  .v-col-xs-9 {
    flex: 0 0 75%;
    max-width: 75%;
  }
  .v-col-xs-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .v-col-sm-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  .v-col-sm-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 960px) {
  .v-col-md-2 {
    flex: 0 0 16.6666666667%;
    max-width: 16.6666666667%;
  }
  .v-col-md-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  .v-col-md-5 {
    flex: 0 0 41.6666666667%;
    max-width: 41.6666666667%;
  }
}
</style>

