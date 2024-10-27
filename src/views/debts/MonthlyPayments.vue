<script setup lang="ts">
import { computed, onMounted, reactive, watch } from "vue";

import UiParentCard from "@/components/shared/UiParentCard.vue";

import { storeToRefs } from 'pinia';
import { useDebts } from "@/stores/debtStore";
import { getSituationDescription, getSituationFilterOptions, getYearFilterOptions } from "@/utils/debts";
import { useAuthStore } from "@/stores/auth";


const data = reactive({
  displayConfirmEventScheduleModal: false,
  nameFilter: '',
  situationFilter: null as null | boolean,
  yearFilter: new Date().getFullYear(),
  filterPanel: 1,
  filterInfo: true,
  itemsPerPage: 10,
  currentPage: 1,
  tableHeaders: [
    { title: 'Nome', key: 'name', sortable: true, align: 'start' },
    { title: 'Vencimento', key: 'dueDate', sortable: true, align: 'center' },
    { title: 'Valor', key: 'amount', sortable: false, align: 'center' },
    { title: 'Situação', key: 'paidAt', sortable: false, align: 'center' },
    { title: ' ', key: 'actions', align: 'start' },
  ],
  lastFiltered: {
    nameFilter: '',
    situationFilter: null as null | boolean,
    yearFilter: new Date().getFullYear()
  },
  sortOptions: [] as Array<any>,
  sorted: [] as Array<any>,
})

const { isLoading, 
        getList: monthlyPayments,
        currentPage,
        totalItems
} = storeToRefs(useDebts());

const { user } = storeToRefs(useAuthStore())

watch(
  [() => currentPage.value],
  ([currentPage]: [number]) => {
    if(currentPage) {
      data.currentPage = currentPage;
    }
  },
  { immediate: true },
);

const eventQuery = computed(() => {
  let query = `volunteerId=${user.value?.volunteer?.id}&currentPage=${data.currentPage}&pageSize=${data.itemsPerPage}`;
  if (data.nameFilter) {
    query = `${query}&name=${data.nameFilter}`
  }
  if (data.situationFilter != null) {
    query = `${query}&paid=${data.situationFilter}`
  }
  if (data.yearFilter) {
    query = `${query}&year=${data.yearFilter}`
  }
  return query;
})

const filteredInfo = computed(() => {
  const tagPrefix = '<span class="font-weight-bold text-lightText">';
  const sufixPrefix = '</span>';
  let info = 'Você está visualizando os registros';
  if (!data.lastFiltered.nameFilter && 
      !data.lastFiltered.situationFilter &&
      !data.lastFiltered.yearFilter) 
      return `${info} ${tagPrefix}sem filtros${sufixPrefix} aplicados.`;
    
  if (data.lastFiltered.nameFilter) {
    info += data.lastFiltered.nameFilter ?
      ` com o ${tagPrefix}nome: ${data.lastFiltered.nameFilter}${sufixPrefix}` :
      '';
  }

  if (data.lastFiltered.situationFilter != null) {
    info += data.lastFiltered.nameFilter ?
      ` e a ${tagPrefix}situação: ${getSituationDescription(data.lastFiltered.situationFilter)}${sufixPrefix}` :
      ` com a ${tagPrefix}situação: ${getSituationDescription(data.lastFiltered.situationFilter)}${sufixPrefix}`;
  }

  if (data.lastFiltered.yearFilter) {
    info += (data.lastFiltered.nameFilter || data.lastFiltered.situationFilter) ?
      ` e o ${tagPrefix}ano: ${data.lastFiltered.yearFilter}${sufixPrefix}` :
      ` com o ${tagPrefix}ano: ${data.lastFiltered.yearFilter}${sufixPrefix}`;
  }
  return info;
})

const pageChanged = (page: number) => {
  data.currentPage = page;
  getMonthlyPayments();
}

const toggleSort = (value: Array<any>) => {
  data.sortOptions = value;
}

const itemsToDisplay = computed(() => {
  if(!data.sortOptions.length) return monthlyPayments.value;
  let arr = monthlyPayments.value.slice();
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

const clearFilters = () => {
  data.nameFilter = '';
  data.situationFilter = null;
  data.yearFilter = new Date().getFullYear();
  getMonthlyPayments();
}

const getMonthlyPayments = async () => {
  data.lastFiltered = {
    nameFilter: data.nameFilter,
    situationFilter: data.situationFilter,
    yearFilter: data.yearFilter,
  };
  try {
    await useDebts().getMonthlyPaymentsByQuery(eventQuery.value);
  } catch (e) {
    throw new Error('Unable to fetch mothly payments list')
  }
}

const formatValue = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    value,
  )
}

const formatDate = (value: any) => {
  const date = new Date(value);
	const day = date.getDate();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

const situationFilterOptions = computed(() => {
  return getSituationFilterOptions();
})

const yearFilterOptions = computed(() => {
  return getYearFilterOptions();
})

const situationDisplay = (paidAt: string) => {
  return !paidAt ? {
    label: 'Pendente',
    color: 'error'
   } : 
   {
    label: 'Pago',
    color: 'success',
  }
}

onMounted(async () => {
  await getMonthlyPayments();
});
</script>

<template>
  <div class="event-list-view">
    <v-row>
      <v-col cols="12" md="12">
        <v-expansion-panels v-model="data.filterPanel" class="mb-5">
          <v-expansion-panel elevation="10">
            <v-expansion-panel-title v-slot="{ expanded }">
              <v-row no-gutters>
                <v-col class="d-flex justify-start" md="4" sm="12" cols="12">
                  Filtros
                </v-col>
                <v-col
                  class="text--secondary mt-xs-3 mt-3 mt-md-3"
                  md="8" sm="12" cols="12">
                  <span
                    v-if="!expanded"
                    key="0">
                    {{ data.nameFilter || data.situationFilter || data.yearFilter ? 'Expandir para visualizar filtros aplicados' : '' }}
                  </span>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row :align="'center'">
                <v-col class="v-col-xs-12" md="3" sm="12" xs="12">
                  <v-label class="mb-2 font-weight-medium">Nome</v-label>
                  <v-text-field
                    v-model="data.nameFilter"
                    class="mb-md-5 mb-sm-0"
                    placeholder="Filtrar por nome"
                    hide-details
                    @keyup.enter="getMonthlyPayments"
                  ></v-text-field>
                </v-col>

                <v-col class="v-col-xs-9" md="3" sm="9" xs="9">
                  <v-label class="mb-2 font-weight-medium">Situação</v-label>
                  <v-select
                    :items="situationFilterOptions"
                    item-title="label"
                    item-value="value"
                    single-line
                    variant="outlined"
                    v-model="data.situationFilter" />
                </v-col>

                <v-col class="v-col-xs-9" md="3" sm="9" xs="9">
                  <v-label class="mb-2 font-weight-medium">Ano</v-label>
                  <v-select
                    :items="yearFilterOptions"
                    item-title="label"
                    item-value="value"
                    single-line
                    variant="outlined"
                    v-model="data.yearFilter" />
                </v-col>

                <v-col md="2" sm="3" xs="3" class="pb-1 v-col-xs-3">
                  <v-btn 
                    color="primary"
                    prepend-icon="mdi-filter"
                    variant="text"
                    @click="getMonthlyPayments">
                    Filtrar
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <UiParentCard title="Minhas mensalidades">
          <v-fade-transition>
            <v-alert
                v-model="data.filterInfo"
                :border="'bottom'"
                close-label="Close Alert"
                color="primary"
                title="Exibindo resultados filtrados"
                type="info"
                variant="tonal"
                class="mb-5"
                closable
              >
                <span v-html="filteredInfo" />
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
            @update:itemsPerPage="getMonthlyPayments"
            @update:page="pageChanged"
          >
            <template v-slot:no-data>
              <p class="align-center d-flex justify-center">
                <span>Nenhum resultado encontrado para os filtros aplicados.</span>
                <v-btn size="small"
                      color="primary" 
                      variant="text"
                      class="ml-1"
                      @click="clearFilters"
                >Limpar filtros</v-btn>
              </p>
            </template>
            
            <template v-slot:item.dueDate="{ item }">
              {{ formatDate(item.dueDate) }}
            </template>
            
            <template v-slot:item.amount="{ item }">
              {{ formatValue(item.amount) }}
            </template>

            <template v-slot:item.paidAt="{ item }">
              <v-chip
                class="ma-2"
                :color="situationDisplay(item.paidAt).color"
                label
              >
                {{ situationDisplay(item.paidAt).label }}
              </v-chip>
            </template>

          </v-data-table-server>
        </UiParentCard>
      </v-col>
    </v-row>
  </div>
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

