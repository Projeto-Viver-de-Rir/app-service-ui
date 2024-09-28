<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import ActionBar from "@/components/shared/ActionBar.vue";
import ConfirmEventScheduleModal from "@/components/modals/ConfirmEventScheduleModal.vue";

import { storeToRefs } from 'pinia';
import { useEvents } from "@/stores/eventStore";
import { isCurrentUserAdministrative } from "@/utils/permissions";
import type { ActionButton } from "@/interfaces/event";
import { eventFullDate, eventHour, eventListActions, getStatusDescription, getStatusFilterOptions, isEventFull } from "@/utils/event";


const page = ref({ title: "Dashboard" });

const breadcrumbs = ref([
  {
    text: "Dashboard",
    disabled: false,
    to: "/dashboard",
  },
  {
    text: "Eventos",
    disabled: true,
    href: "#",
  },
]);

const data = reactive({
  displayConfirmEventScheduleModal: false,
  nameFilter: '',
  statusFilter: 1,
  filterPanel: 0,
  filterInfo: true,
  itemsPerPage: 10,
  currentPage: 1,
  tableHeaders: [
    { title: 'Nome', key: 'name', sortable: false, align: 'start' },
    { title: 'Local', key: 'address', sortable: false, align: 'center' },
    { title: 'Quando', key: 'happenAt', sortable: false, align: 'center' },
    { title: 'Capacidade', key: 'capacity', sortable: false, align: 'center' },
    { title: ' ', key: 'actions', align: 'start' },
  ],
  lastFiltered: {
    nameFilter: '',
    statusFilter: 0 
  }
})

const { isLoading, 
        getList: events,
        currentPage,
        totalItems
} = storeToRefs(useEvents());

watch(
  [() => currentPage.value],
  ([currentPage]: [number]) => {
    if(currentPage) {
      data.currentPage = currentPage;
    }
  },
  { immediate: true },
);

const width = ref(window.innerWidth)

const menuActions = computed((): Array<ActionButton> => {
  const actions = eventListActions();
  return actions.map((action) => {
    return {
      ...action,
      ...(action.id === 0 ? { onClick: showConfirmEventScheduleDialog } : {}),
    }
  });
});

const isMobile = computed(() => {
  return width.value < 960;
})

const eventQuery = computed(() => {
  let query = `currentPage=${data.currentPage}&pageSize=${data.itemsPerPage}`;
  if (data.nameFilter) {
    query = `${query}&name=${data.nameFilter}`
  }
  if (data.statusFilter > 0) {
    query = `${query}&status=${data.statusFilter}`
  }
  return query;
})

const filteredInfo = computed(() => {
  const tagPrefix = '<span class="font-weight-bold text-lightText">';
  const sufixPrefix = '</span>';
  let info = 'Você está visualizando os registros';
  if (!data.lastFiltered.nameFilter && 
      !data.lastFiltered.statusFilter) 
      return `${info} ${tagPrefix}sem filtros${sufixPrefix} aplicados.`;
    
  if (data.lastFiltered.nameFilter) {
    info += data.lastFiltered.nameFilter ?
      ` com o ${tagPrefix}nome: ${data.lastFiltered.nameFilter}${sufixPrefix}` :
      '';
  }
  if (data.lastFiltered.statusFilter > 0) {
    info += data.lastFiltered.nameFilter ?
      ` e o ${tagPrefix}status: ${getStatusDescription(data.lastFiltered.statusFilter)}${sufixPrefix}` :
      ` com o ${tagPrefix}status: ${getStatusDescription(data.lastFiltered.statusFilter)}${sufixPrefix}`;
  }
  return info;
})

const statusFilterOptions = computed(() => {
  return getStatusFilterOptions();
})

const showConfirmEventScheduleDialog = () => {
  data.displayConfirmEventScheduleModal = true;
}

const hideConfirmEventScheduleDialog = () => {
  data.displayConfirmEventScheduleModal = false;
}

const shouldDisplayMenu = computed((): boolean => {
  return isCurrentUserAdministrative();
});

const setWindowWidth = () => {
  width.value = window.innerWidth;
}

const pageChanged = (page: number) => {
  data.currentPage = page;
  getEvents();
}

const capacityDisplay = (event: any) => {
  return isEventFull(event) ? {
    label: 'Máxima',
    color: 'error'
   } : 
   {
    label: 'Disponível',
    color: 'success',
  }
}

const dateAndTimeDisplay = (event: any) => {
  return `${eventFullDate(event.happenAt)} às ${eventHour(event.happenAt)}`
}

const clearFilters = () => {
  data.nameFilter = '';
  data.statusFilter = 1;
  getEvents();
}

const getEvents = async () => {
  data.lastFiltered = {
    nameFilter: data.nameFilter,
    statusFilter: data.statusFilter
  };
  try {
    await useEvents().getDataByQuery(eventQuery.value);
  } catch (e) {
    throw new Error('Unable to fetch events list')
  }
}

onUnmounted(async () => {
  window.removeEventListener('resize', setWindowWidth);
});

onMounted(async () => {
  window.addEventListener('resize', setWindowWidth);
  await getEvents();
});
</script>

<template>
  <div class="event-list-view">
    <BaseBreadcrumb
      :title="page.title"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <!-- <div v-if="isLoading" class="loading"></div> -->
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
                  class="text--secondary mt-xs-3 mt-3 mt-md-0"
                  md="8" sm="12" cols="12">
                  <span
                    v-if="!expanded"
                    key="0">
                    {{ data.nameFilter || data.statusFilter ? 'Expandir para visualizar filtros aplicados' : '' }}
                  </span>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row :align="'center'">
                <v-col md="5" sm="12" xs="12">
                  <v-label class="mb-2 font-weight-medium">Nome</v-label>
                  <v-text-field
                    v-model="data.nameFilter"
                    class="mb-md-5 mb-sm-0 mb-5"
                    placeholder="Filtrar por nome"
                    hide-details
                    @keyup.enter="getEvents"
                  ></v-text-field>
                </v-col>
  
                <v-col md="5" sm="9" xs="9">
                  <v-label class="mb-2 font-weight-medium">Status</v-label>
                  <v-select
                    :items="statusFilterOptions"
                    item-title="label"
                    item-value="value"
                    single-line
                    variant="outlined"
                    v-model="data.statusFilter" />
                </v-col>
  
                <v-col md="2" sm="3" xs="9" class="pb-1">
                  <v-btn 
                    color="primary"
                    prepend-icon="mdi-filter"
                    variant="text"
                    @click="getEvents">
                    Filtrar
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <UiParentCard title="Eventos">
          <template v-slot:action v-if="shouldDisplayMenu">
            <ActionBar :actions="menuActions" />
          </template>
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
            :items="events"
            :items-length="totalItems"
            :loading="isLoading"
            :page="currentPage"
            items-per-page-text="Itens por página"
            loading-text="Carregando... Por favor aguarde"
            @update:itemsPerPage="getEvents"
            @update:page="pageChanged"
          >
            <template v-slot:item.happenAt="{ item }">
              {{ dateAndTimeDisplay(item) }} 
            </template>

            <template v-slot:item.capacity="{ item }">
              <v-chip
                class="ma-2"
                :color="capacityDisplay(item).color"
                label
              >
                {{ capacityDisplay(item).label }}
              </v-chip>
            </template>

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

            <template v-slot:item.actions="{ item }">
              <router-link
                tag="v-btn"
                :to="{ name: 'EventDetails', params: { id: item.id } }"
              >
                <v-btn size="small" color="primary" type="submit" variant="text"
                  >Detalhes</v-btn
                >
              </router-link>
            </template>
          </v-data-table-server>
        </UiParentCard>
      </v-col>
    </v-row>
  </div>
  <!-- Modal Confirm Event Schedule -->
  <ConfirmEventScheduleModal
    v-if="data.displayConfirmEventScheduleModal"
    :mobileView="isMobile"
    :dialog="data.displayConfirmEventScheduleModal"
    @closeConfirmEventScheduleModal="hideConfirmEventScheduleDialog" />
</template>
