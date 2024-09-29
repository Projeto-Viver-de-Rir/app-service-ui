<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useEvents } from "@/stores/eventStore";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import ConfirmParticipationModal from "@/components/modals/ConfirmParticipationModal.vue";
import ConfirmRemoveParticipantModal from "@/components/modals/ConfirmRemoveParticipantModal.vue";
import ValidatePresenceModal from "@/components/modals/ValidatePresenceModal.vue";
import ConfirmDeleteEventModal from "@/components/modals/ConfirmDeleteEventModal.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import ActionBar from "@/components/shared/ActionBar.vue";
import IndividualCard from "@/components/shared/IndividualCard.vue";
import { eventDate, eventHour, getStatusDescription, eventDateStatus, isEventFull, eventActions } from "@/utils/event";
import { isCurrentUserAdministrative, isCurrentUserAllowedToManage, isCurrentUserPresentOnEvent, isCurrentUserTheVolunteer } from "@/utils/permissions";
import { EventDateStatusTypes, type ActionButton } from "@/interfaces/event";
import type { event } from "@/entities/event";

const router = useRouter();
const eventStore = useEvents();

const { 
  isLoading, 
  getEvent: event,
  getNumberConfirmed: confirmedVolunteers,
  volunteersPresent: eventVolunteers,
} = storeToRefs(eventStore);

const currentRoute = router.currentRoute.value;

interface EventDetailsDataProps {
  tab: string;
  displayConfirmParticipationModal: boolean;
  displayConfirmRemoveParticipantModal: boolean;
  displayValidatePresenceModal: boolean;
  displayConfirmDeleteEventModal: boolean;
  participantToRemove: any;
}

const data: EventDetailsDataProps = reactive({
  tab: 'tab-1',
  displayConfirmParticipationModal: false,
  displayConfirmRemoveParticipantModal: false,
  displayValidatePresenceModal: false,
  displayConfirmDeleteEventModal: false,
  participantToRemove: null,
})

const width = ref(window.innerWidth)

const breadcrumbs = ref([
	{
    text: "Eventos",
    disabled: false,
    to: "/events",
	},
	{
    text: "Detalhes",
    disabled: true,
	},
]);

const isMobile = computed(() => {
  return width.value < 960;
})

const isCurrentUserPresent = computed((): boolean => {
  if (!event.value) return false;
  return isCurrentUserPresentOnEvent(event.value.presences);
})

const isEventAlmostDue = computed(() => {
  if (!event.value) return false;
  const status = eventDateStatus(event.value.happenAt);
  return status === EventDateStatusTypes.ALMOST_DUE;
})

const isEventClosed = computed(() => {
  if (!event.value) return false;
  const status = eventDateStatus(event.value.happenAt);
  return status === EventDateStatusTypes.CLOSED;
})

const isEventOccupancyFull = computed(() => {
  if (!event.value) return true;
  return isEventFull(event.value);
})

const shouldDisableConfirmParicipationBtn = computed((): boolean => {
  if (!event.value) return true;
  return isCurrentUserPresent.value || isEventOccupancyFull.value || isEventClosed.value;
})

const disabledConfirmParicipationBtnTooltip = computed((): string => {
  if (isEventClosed.value) return 'Este evento já aconteceu.';
  else if (isCurrentUserPresent.value) return 'Você já confirmou participação neste evento.';
  else if (isEventOccupancyFull.value) return 'Todas as vagas já foram preenchidas.';
  return '';
});

const shouldDisplayRemoveVolunteerBtn = (volunteerId: string) => {
  if (!event.value) return false;
  const isAdmin = isCurrentUserAdministrative();
  const isOperational = isCurrentUserAllowedToManage(event.value?.coordinators)
  // Hide Remove Volunteer btn if the user have confirmed
  // even if the user is administrative or operational
  if ((isAdmin || isOperational) && isCurrentUserTheVolunteer(volunteerId)) return false;
  // Hide Remove Volunteer btn if the event has your date in the past or have been closed.
  else if (isEventClosed.value) return false;
  // Show Remove Volunteer btn if the user has administrative privileges.
  else if (isAdmin) return true;
  // Show Remove Volunteer btn if the user is not administrative, but has operational privileges.
  else if (isOperational) return true;
  return false;
}

const shouldDisplayMenu = computed((): boolean => {
  if (!event.value) return false;
  const isAdmin = isCurrentUserAdministrative();
  const isOperational = isCurrentUserAllowedToManage(event.value?.coordinators)
  return (isAdmin || isOperational);
});

const confirmedVolunteersList = computed((): Array<any> => {
  if(!eventVolunteers.value.length) return [];
  return eventVolunteers.value.map((x: any) => {
    return {
      volunteer: {
        ...x,
      }
    }
  });
})

const tabsDirection = computed((): string => {
  return isMobile.value ? 'vertical' : 'horizontal'
});

const menuActions = computed((): Array<ActionButton> => {
  const actions = eventActions();
  return actions.map((action) => {
    return {
      ...action,
      ...(action.id === 0 ? { onClick: eventStore.edit } : {}), // ToDo: remove this on clean up
      ...(action.id === 1 ? { 
        onClick: showValidatePresenceDialog,
      } : {}),
      ...(action.id === 2 ? { 
        onClick: showConfirmDeleteEventDialog,
      } : {})
    }
  });
});

const getVolunteerIndividualAction = (individual: any) => {
  return {
    id: 0,
    button: {
      icon: 'mdi-trash-can-outline',
      variant: 'outlined',
      color: 'error'
    },
    disabled: isEventAlmostDue.value,
    tooltip: isEventAlmostDue.value,
    visible: shouldDisplayRemoveVolunteerBtn(individual.volunteer.id),
    tooltipLabel: 'Não é possivel remover o voluntário pois o evento inicia em breve.',
    onClick: () => showConfirmRemoveParticipantDialog(individual)
  }
}

const getCoordinatorIndividualAction = (individual: any) => {
  return {
    id: 0,
    button: {
      icon: 'mdi-card-account-details-outline',
      variant: 'outlined',
      color: 'primary'
    },
    visible: true,
    link: {
      name: 'DetailtUser',
      params: { id: individual.volunteer.id }
    },
  }
}

const showValidatePresenceDialog = () => {
  data.displayValidatePresenceModal = true;
}

const hideValidatePresenceDialog = () => {
  data.displayValidatePresenceModal = false;
  router.push({ name: "ListEvents" });
}

const showConfirmDeleteEventDialog = () => {
  data.displayConfirmDeleteEventModal = true;
}

const hideConfirmDeleteEventDialog = ({ confirm }: { confirm: boolean }) => {
  data.displayConfirmDeleteEventModal = false;
  if (confirm) {
    router.push({ name: "ListEvents" });
  }
}

const setWindowWidth = () => {
  width.value = window.innerWidth;
}

const showConfirmParticipationDialog = () => {
  data.displayConfirmParticipationModal = true;
}

const hideConfirmParticipationDialog = ({ reload }: { reload: boolean }) => {
  data.displayConfirmParticipationModal = false;
  if (reload) {
    loadEvent();
    // if confirmation success, force focus on confirmed volunteers tab
    data.tab = 'tab-2';
  }
}

const loadEvent = async (): Promise<void> => {
  await eventStore.getById(currentRoute.params.id as string);
}

const removeParticipant = async (participant: any) => {
  await eventStore.removeParticipant(participant);
}

const showConfirmRemoveParticipantDialog = (participant: any): void => {
  data.displayConfirmRemoveParticipantModal = true;
  data.participantToRemove = participant.volunteer;
}

const hideConfirmRemoveParticipantDialog = async ({ confirm }: { confirm: boolean }): Promise<void> => {
  data.displayConfirmRemoveParticipantModal = false;
  if (confirm) {
    await removeParticipant(data.participantToRemove);
    await loadEvent();
    data.participantToRemove = null;
  }
}

onMounted(() => {
  window.addEventListener('resize', setWindowWidth);
  loadEvent();
});

onUnmounted(async () => {
  window.removeEventListener('resize', setWindowWidth);
});
</script>

<template>
  <div class="event-details-view">
    <div v-if="isLoading" class="loading" />
    <BaseBreadcrumb
			:title="'Eventos'"
			:breadcrumbs="breadcrumbs"
    />
    <UiParentCard title="Evento">
      <template v-slot:action v-if="shouldDisplayMenu">
        <ActionBar :actions="menuActions" />
      </template>
      <div class="rounded-md border">
        <div class="description-tab">
          <div class="description-container">
            <div class="description-name-container">
              <span class="text-md-h6">{{ event?.name }}</span>
              <span class="text-body-1">{{ event?.city }}</span>
            </div>

            <div class="description-details-container">
              <div class="description-details-container__item">
                <v-icon icon="mdi-calendar-month-outline" />
                <span class="text-md-h5 mt-1">
                  {{ eventDate(event?.happenAt as Date)}}
                </span>
                <span class="text-body-1">
                  Dia
                </span>
              </div>
              <div class="description-details-container__item">
                <v-icon icon="mdi-calendar-clock" />
                <span class="text-md-h5 mt-1">
                  {{ eventHour(event?.happenAt as Date)}}
                </span>
                <span class="text-body-1">
                  Hora
                </span>
              </div>
              <div class="description-details-container__item">
                <v-icon icon="mdi-account-check-outline" />
                <span class="text-md-h5 mt-1">
                  {{ confirmedVolunteers }}/ {{ event?.occupancy }}
                </span>
                <span class="text-body-1">
                  Confirmados
                </span>
              </div>
            </div>

            <div class="description-actions-container">
              <div>
                <v-btn size="small"
                       color="primary"
                       class="mr-3"
                       :disabled="shouldDisableConfirmParicipationBtn"
                       @click="showConfirmParticipationDialog">
                  Participar
                </v-btn>
                <v-tooltip v-if="shouldDisableConfirmParicipationBtn"
                           activator="parent"
                           location="top">
                  {{disabledConfirmParicipationBtnTooltip}}
                </v-tooltip>
              </div>
            </div>

          </div>

          <div class="tabs-container" :class="{'mobile': isMobile }">
            <v-tabs
              v-model="data.tab"
              color="primary"
              :direction="tabsDirection"
              height="30"
            >
              <v-tab prepend-icon="mdi-account-circle-outline" text="Informações" value="tab-1" />
              <v-tab prepend-icon="mdi-heart-outline" text="Confirmados" value="tab-2" />
              <v-tab prepend-icon="mdi-account-multiple-outline" text="Coordenadores" value="tab-3" />
            </v-tabs>
          </div>
        </div>
      </div>

      <div class="mt-5 rounded-md border">
        <v-window v-model="data.tab" class="rounded-md">
          <v-window-item value="tab-1">
            <v-card flat>
              <v-card-text>
                <p class="text-md-h3 mb-3">Informações</p>
                <p class="text-body-1 mb-4">{{ event?.description }}</p>

                <p class="icon-label text-body-1 mb-2" v-if="event?.status">
                  <v-icon icon="mdi-progress-check" />
                  <span class="text-body-1 font-weight-semibold ml-3">{{ getStatusDescription(event?.status || 0) }}</span>
                </p>

                <p class="icon-label text-body-1 mb-2" v-if="event?.meetingPoint">
                  <v-icon icon="mdi-arrow-collapse-all" />
                  <span class="text-body-1 font-weight-semibold ml-3">{{ event?.meetingPoint }}</span>
                </p>

                <p class="icon-label text-body-1 mb-0">
                  <v-icon icon="mdi-map-marker-outline" />
                  <span class="text-body-1 font-weight-semibold ml-3">
                    {{ event?.address }}, {{ event?.city }}
                  </span>
                </p>
              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item value="tab-2">
            <div class="individual-container">
              <p class="text-md-h3 mb-5">Confirmados</p>
              <div class="individual-card-container" v-if="eventVolunteers.length">
                <IndividualCard v-for="individual in confirmedVolunteersList" 
                                :key="individual.id"
                                :action="getVolunteerIndividualAction(individual)"
                                :individual="individual"  />
              </div>
              <p class="text-body-1" v-else>
                <span>Nenhum voluntário confirmado.</span>
              </p>
            </div>
          </v-window-item>

          <v-window-item value="tab-3">
            <div class="individual-container">
              <p class="text-md-h3 mb-5">Coordenadores</p>
              <div class="individual-card-container" v-if="event?.coordinators?.length">
                <IndividualCard v-for="individual in event?.coordinators" 
                                :key="individual.id"
                                :action="getCoordinatorIndividualAction(individual)"
                                :individual="individual"  />
              </div>
              <p class="text-body-1" v-else>
                Nenhum coordenador associado a este evento.
              </p>
            </div>
          </v-window-item>
        </v-window>
      </div>
    </UiParentCard>
    

    <!-- Modal Confirm Participation -->
    <ConfirmParticipationModal
      v-if="data.displayConfirmParticipationModal"
      :event="event"
      :mobileView="isMobile"
      :dialog="data.displayConfirmParticipationModal"
      @closeConfirmParticipationModal="hideConfirmParticipationDialog" />

    <!-- Modal Confirm Remove Volunteer -->
    <ConfirmRemoveParticipantModal
      v-if="data.displayConfirmRemoveParticipantModal"
      :volunteer="data.participantToRemove"
      :mobileView="isMobile"
      :dialog="data.displayConfirmRemoveParticipantModal"
      @closeConfirmRemoveParticipantModal="hideConfirmRemoveParticipantDialog" />

    <!-- Modal Validate Volunteers Presence -->
    <ValidatePresenceModal
      v-if="data.displayValidatePresenceModal"
      :dialog="data.displayValidatePresenceModal"
      @closeValidatePresenceModal="hideValidatePresenceDialog" />

    <!-- Modal Delete Event -->
    <ConfirmDeleteEventModal
      v-if="data.displayConfirmDeleteEventModal"
      :mobileView="isMobile"
      :dialog="data.displayConfirmDeleteEventModal"
      @closeConfirmDeleteEventModal="hideConfirmDeleteEventDialog" />
  </div>
</template>

<style lang="scss" scoped>
.icon-label {
  display: flex;
  align-items: center;
}

.description-container {
  padding: 20px 12px;
  display: flex;
  align-items: center;
  @media (max-width: 960px) {
    flex-direction: column;
    gap: 30px;
    padding: 40px 12px;
  }
}

.description-name-container {
  display: flex;
  flex-basis: 33%;
  flex-direction: column;
  align-items: center;
}

.description-details-container {
  display: flex;
  flex-basis: 33%;
  align-items: center;
  justify-content: space-evenly;
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 50px;
  }
}

.description-actions-container {
  display: flex;
  flex-basis: 33%;
  flex-direction: column;
  align-items: end;
}

.tabs-container {
  display: flex;
  background-color: rgb(var(--v-theme-grey100));
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  &.mobile {
    align-items: center;
    justify-content: center;
  }
}
.individual-container {
  padding: 20px;
}
.individual-card-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 960px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
}
:deep(.v-tab__slider) {
  height: 0;
}
</style>
