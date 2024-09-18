<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useEvents } from "@/stores/eventStore";
import ConfirmParticipationModal from "@/components/modals/ConfirmParticipationModal.vue";
import ConfirmRemoveParticipantModal from "@/components/modals/ConfirmRemoveParticipantModal.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import { eventDate, eventHour, getStatusDescription, isUserAvatarAvailable, eventDateStatus, isEventFull } from "@/utils/event";
import { isCurrentUserAdministrative, isCurrentUserPresentOnEvent, isCurrentUserTheVolunteer } from "@/utils/permissions";
import { EventDateStatusTypes } from "@/interfaces/event";
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

interface SnackBarProps {
  color: string;
  message: string;
  show: boolean;
}

interface EventDetailsDataProps {
  tab: string;
  displayConfirmParticipationModal: boolean;
  displayConfirmRemoveParticipantModal: boolean;
  participantToRemove: any;
  snackBar: SnackBarProps;
}

const data: EventDetailsDataProps = reactive({
  tab: 'tab-1',
  displayConfirmParticipationModal: false,
  displayConfirmRemoveParticipantModal: false,
  participantToRemove: null,
  snackBar: {
    color: '',
    message: '',
    show: false,
  }
})

const width = ref(window.innerWidth)

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
  if(!event.value) return true;
  return isCurrentUserPresent.value || isEventOccupancyFull.value;
})

const shouldDisplayRemoveVolunteerBtn = (volunteerId: string) => {
  const isAdmin = isCurrentUserAdministrative();
  if ( isEventClosed.value) return false;
  else if (isAdmin && isCurrentUserTheVolunteer(volunteerId)) return false;
  else if (isAdmin) return true;
  return false;
}

const confirmedVolunteersList = computed((): Array<any> => {
  if(!eventVolunteers.value.length) return [];
  return eventVolunteers.value.map((x: any) => {
    return {
      ...x,
      actionRemoveVisible: shouldDisplayRemoveVolunteerBtn(x.id),
    }
  });
})

const tabsDirection = computed((): string => {
  return isMobile.value ? 'vertical' : 'horizontal'
});

const setWindowWidth = () => {
  width.value = window.innerWidth;
}

const showConfirmParticipationDialog = () => {
  data.displayConfirmParticipationModal = true;
}

const hideConfirmParticipationDialog = ({ reload, snackBar }: { reload: boolean , snackBar: SnackBarProps}) => {
  data.displayConfirmParticipationModal = false;
  data.snackBar = snackBar;
  if (reload) {
    loadEvent();
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
  data.participantToRemove = participant;
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
    <UiParentCard title="Eventos">
      <div class="rounded-md outlined-card">
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
                  {{ eventDate(event?.happenAt)}}
                </span>
                <span class="text-body-1">
                  Dia
                </span>
              </div>
              <div class="description-details-container__item">
                <v-icon icon="mdi-calendar-clock" />
                <span class="text-md-h5 mt-1">
                  {{ eventHour(event?.happenAt)}}
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
                <v-tooltip activator="parent" location="top" v-if="isCurrentUserPresent">Você já confirmou participação neste evento.</v-tooltip>
                <v-tooltip activator="parent" location="top" v-else-if="isEventOccupancyFull">Todas as vagas já foram preenchidas.</v-tooltip>
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

      <div class="mt-5 rounded-md outlined-card">
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
                <v-card class="individual-card border" elevation="0" v-for="volunteer in confirmedVolunteersList" :key="volunteer.id">
                  <div class="info-wrapper">
                    <v-avatar size="50" v-if="isUserAvatarAvailable(volunteer.photo)">
                      <img :src="volunteer.photo" height="50" />
                    </v-avatar>
                    <v-avatar size="50" v-else>
                      <img src="@/assets/images/palhaco.png" alt="user" height="50" />
                    </v-avatar>
                    <div class="info-wrapper-name ml-2">
                      <v-label
                        class="text-subtitle-1 font-weight-semibold text-lightText ml-3"
                        >{{ volunteer.name }}</v-label>
                      <v-label
                        class="text-subtitle-1 text-lightText ml-3"
                        >{{ volunteer.nickname }}</v-label>
                    </div>
                  </div>
                  <div class="ml-lg-auto" v-if="volunteer.actionRemoveVisible">
                    <v-tooltip activator="parent" location="top" v-if="isEventAlmostDue">Não é possivel remover o voluntário pois o evento inicia em breve.</v-tooltip>
                    <v-btn v-if="!isMobile"
                          size="small"
                          color="error"
                          variant="outlined"
                          :disabled="isEventAlmostDue"
                          @click="showConfirmRemoveParticipantDialog(volunteer)"
                          icon="mdi-trash-can-outline" />
                    <v-btn v-else 
                          size="small"
                          color="error"
                          class="mt-4"
                          :disabled="isEventAlmostDue"
                          @click="showConfirmRemoveParticipantDialog(volunteer)"
                          variant="outlined">Remover voluntário</v-btn>
                  </div>
                </v-card>
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
                <v-card class="individual-card border" elevation="0" v-for="coordinator in event?.coordinators" :key="coordinator.id">
                  <div class="info-wrapper">
                    <v-avatar size="50" v-if="isUserAvatarAvailable(coordinator.volunteer.photo)">
                      <img :src="coordinator.volunteer.photo" height="50" />
                    </v-avatar>
                    <v-avatar size="50" v-else>
                      <img src="@/assets/images/palhaco.png" alt="user" height="50" />
                    </v-avatar>
                    <div class="info-wrapper-name ml-2">
                      <v-label
                        class="text-subtitle-1 font-weight-semibold text-lightText ml-3"
                        >{{ coordinator.volunteer.name }}</v-label>
                      <v-label
                        class="text-subtitle-1 text-lightText ml-3"
                        >{{ coordinator.volunteer.nickname }}</v-label>
                    </div>
                  </div>
                  <router-link tag="v-btn"
                               class="ml-lg-auto"
                               :to="{ name: 'DetailtUser', params: { id: coordinator.volunteer.id } }">
                    <v-btn size="small"
                          color="primary"
                          variant="outlined"
                          icon="mdi-card-account-details-outline" />
                  </router-link>
                </v-card>
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

    <!-- Feedback SnackBar -->
    <v-snackbar v-model="data.snackBar.show">
      {{ data.snackBar.message }}
      <template v-slot:actions>
        <v-btn :color="data.snackBar.color"
                variant="text"
                @click="data.snackBar.show = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped>
.outlined-card {
  display: flex;
  flex-direction: column;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity));
  border-style: solid;
  border-width: thin;
}

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
  .individual-card {
    display: flex;
    align-items: center;
    padding: 20px;
    @media (max-width: 1500px) {
      flex-direction: column;
    }
  }
  .info-wrapper {
    display: flex;
    align-items: center;
    &-name {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
:deep(.v-tab__slider) {
  height: 0;
}
</style>
