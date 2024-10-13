<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";

import UiParentCard from "@/components/shared/UiParentCard.vue";
import ActionBar from "@/components/shared/ActionBar.vue";

import { storeToRefs } from 'pinia';
import { isCurrentUserAdministrative } from "@/utils/permissions";
import type { ActionButton } from "@/interfaces/event";
import { getDayOfWeekDescription, getOccurrenceDescription, isEventFull, schedulledEventsListActions } from "@/utils/event";
import { useScheduleEvents } from "@/stores/scheduleEventStore";

const data = reactive({
  displayConfirmEventScheduleModal: false,
  nameFilter: '',
  filterPanel: 1,
  filterInfo: true,
  itemsPerPage: 10,
  currentPage: 1,
  tableHeaders: [
    { title: 'Nome', key: 'name', sortable: false, align: 'start' },
    { title: 'Dia da Semana', key: 'dayOfWeek', sortable: false, align: 'center' },
    { title: 'Frequência', key: 'occurrence', sortable: false, align: 'center' },
    { title: ' ', key: 'actions', align: 'start' },
  ],
  lastFiltered: {
    nameFilter: '',
  }
})

const scheduledEventsStore = useScheduleEvents();

const { isLoading, 
        getList: events,
        currentPage,
        totalItems
} = storeToRefs(scheduledEventsStore);

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
  const actions = schedulledEventsListActions();
  return actions.map((action) => {
    return {
      ...action,
    }
  });
});

const scheduledEventsQuery = computed(() => {
  let query = `currentPage=${data.currentPage}&pageSize=${data.itemsPerPage}`;
  if (data.nameFilter) {
    query = `${query}&name=${data.nameFilter}`
  }
  return query;
})

const filteredInfo = computed(() => {
  const tagPrefix = '<span class="font-weight-bold text-lightText">';
  const sufixPrefix = '</span>';
  let info = 'Você está visualizando os registros';
  if (!data.lastFiltered.nameFilter) 
      return `${info} ${tagPrefix}sem filtros${sufixPrefix} aplicados.`;
    
  if (data.lastFiltered.nameFilter) {
    info += data.lastFiltered.nameFilter ?
      ` com o ${tagPrefix}nome: ${data.lastFiltered.nameFilter}${sufixPrefix}` :
      '';
  }
  return info;
})

const shouldDisplayMenu = computed((): boolean => {
  return isCurrentUserAdministrative();
});

const setWindowWidth = () => {
  width.value = window.innerWidth;
}

const pageChanged = (page: number) => {
  data.currentPage = page;
  getScheduledEvents();
}

const clearFilters = () => {
  data.nameFilter = '';
  getScheduledEvents();
}

const getScheduledEvents = async () => {
  data.lastFiltered = {
    nameFilter: data.nameFilter,
  };
  try {
    await scheduledEventsStore.getDataByQuery(scheduledEventsQuery.value);
  } catch (e) {
    throw new Error('Unable to fetch events list')
  }
}

onUnmounted(async () => {
  window.removeEventListener('resize', setWindowWidth);
});

onMounted(async () => {
  window.addEventListener('resize', setWindowWidth);
  await getScheduledEvents();
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
                    {{ data.nameFilter ? 'Expandir para visualizar filtros aplicados' : '' }}
                  </span>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row :align="'center'">
                <v-col class="v-col-xs-12" md="5" sm="12" xs="12">
                  <v-label class="mb-2 font-weight-medium">Nome</v-label>
                  <v-text-field
                    v-model="data.nameFilter"
                    class="mb-md-5 mb-sm-0"
                    placeholder="Filtrar por nome"
                    hide-details
                    @keyup.enter="getScheduledEvents"
                  ></v-text-field>
                </v-col>
  
                <v-col md="2" sm="3" xs="3" class="pb-1 v-col-xs-3">
                  <v-btn 
                    color="primary"
                    prepend-icon="mdi-filter"
                    variant="text"
                    @click="getScheduledEvents">
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
            @update:itemsPerPage="getScheduledEvents"
            @update:page="pageChanged"
          >
            <template v-slot:item.dayOfWeek="{ item }">
              {{ getDayOfWeekDescription(item.dayOfWeek) }} 
            </template>

            <template v-slot:item.occurrence="{ item }">
              {{ getOccurrenceDescription(item.occurrence) }} 
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
                :to="{ name: 'ScheduledEventForm', params: { id: item.id } }"
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

