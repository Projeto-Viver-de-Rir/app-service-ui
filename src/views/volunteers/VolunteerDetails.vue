<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import ConfirmDeleteVolunteerModal from "@/components/modals/ConfirmDeleteVolunteerModal.vue";

import UiParentCard from "@/components/shared/UiParentCard.vue";
import ActionBar from "@/components/shared/ActionBar.vue";
import { eventFullDate, isUserAvatarAvailable } from "@/utils/event";
import { isCurrentUserAdministrative } from "@/utils/permissions";
import { type ActionButton } from "@/interfaces/event";

import { useVolunteers } from "@/stores/volunteerStore";
import { volunteerActions } from "@/utils/volunteers";
import { useSnackBar } from "@/stores/snackBarStore";

const router = useRouter();
const volunteerStore = useVolunteers();
const snackBarStore = useSnackBar();

const { 
  isLoading,
  getCurrentVolunteer: currentVolunteer,
} = storeToRefs(volunteerStore);

const currentRoute = router.currentRoute.value;

interface VolunteerDetailsDataProps {
  tab: string;
  displayConfirmDeleteVolunteerModal: boolean;
  participantToRemove: any;
  availability: Array<Record<string, any>>;
  checkedAvailabilities: Array<string>;
}

const data: VolunteerDetailsDataProps = reactive({
  tab: 'tab-1',
  displayConfirmDeleteVolunteerModal: false,
  participantToRemove: null,
  checkedAvailabilities: [],
  availability: [
    {
      label: 'Segunda',
      value: '1',
    },
    {
      label: 'Terça',
      value: '2',
    },
    {
      label: 'Quarta',
      value: '3',
    },
    {
      label: 'Quinta',
      value: '4',
    },
    {
      label: 'Sexta',
      value: '5',
    },
    {
      label: 'Sábado',
      value: '6',
    },
    {
      label: 'Domingo',
      value: '0',
    },
    {
      label: 'Indefinido',
      value: '9',
    },
  ]
})

const width = ref(window.innerWidth)

const isMobile = computed(() => {
  return width.value < 960;
})

const isAdmin = computed((): boolean => {
  return isCurrentUserAdministrative();
});

const tabsDirection = computed((): string => {
  return isMobile.value ? 'vertical' : 'horizontal'
});

const menuActions = computed((): Array<ActionButton> => {
  const actions = volunteerActions();
  return actions.map((action) => {
    return {
      ...action,
      ...(action.id === 1 ? { 
        onClick: showConfirmDeleteVolunteerDialog,
      } : {}),
    }
  });
});

const showConfirmDeleteVolunteerDialog = () => {
  data.displayConfirmDeleteVolunteerModal = true;
}

const hideDeleteVolunteerDialog = ({ confirm }: { confirm: boolean }) => {
  data.displayConfirmDeleteVolunteerModal = false;
  if (confirm) {
    router.push({ name: "ListUser" });
  }
}

const setWindowWidth = () => {
  width.value = window.innerWidth;
}

const loadVolunteer = async (): Promise<void> => {
  try {
    await volunteerStore.getVolunteerById(currentRoute.params.id as string);
    if (currentVolunteer.value?.availability) {
      data.checkedAvailabilities = currentVolunteer.value.availability.split(',')
    };
  } catch (e) {
    snackBarStore.addToQueue({ 
			color: 'error', 
			message: "Não foi possível encontrar este usuário."
		});
    router.back();
  }
}

onMounted(() => {
  window.addEventListener('resize', setWindowWidth);
  loadVolunteer();
});

onUnmounted(async () => {
  window.removeEventListener('resize', setWindowWidth);
});
</script>

<template>
  <div class="volunteer-details-view">
    <div v-if="isLoading" class="loading" />
    <UiParentCard title="Voluntário">
      <template v-slot:action v-if="isAdmin">
        <ActionBar :actions="menuActions" />
      </template>
      <div class="rounded-md border">
        
        <div class="description-tab">
          <div class="description-container">
            <div class="avatar-container ml-3">
              <v-avatar size="100" v-if="isUserAvatarAvailable(currentVolunteer?.photo as string)">
                <img :src="currentVolunteer?.photo" width="100" />
              </v-avatar>
              <v-avatar size="100" v-else>
                <img src="@/assets/images/palhaco.png" alt="user" height="100" />
              </v-avatar>
            </div>
            <div class="description-name-container">
              <p class="text-subtitle-1 font-weight-bold text-lg-h6">{{ currentVolunteer?.name }}</p>
              <p class="text-subtitle-2">{{ currentVolunteer?.nickname }}</p>
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
              <v-tab prepend-icon="mdi-heart-outline" text="Sensíveis" value="tab-2" v-if="isAdmin" />
            </v-tabs>
          </div>
        </div>
      </div>

      <div class="mt-5 rounded-md border">
        <div class="availability-container pt-5 px-5">
          <v-radio-group v-model="data.checkedAvailabilities">
            <v-radio
              v-for="(option, index) in data.availability"
              :key="index"
              multiple
              color="primary"
              class="px-3 py-3 border rounded"
              :label="option.label"
              :value="option.value"
              readonly
            ></v-radio>
          </v-radio-group>
        </div>
        <v-window v-model="data.tab" class="rounded-md">
          <v-window-item value="tab-1">
            <v-card flat>
              <v-card-text>
                <p class="text-md-h3 mb-3">Informações</p>

                <p class="icon-label text-body-1 mb-2" v-if="currentVolunteer?.phone">
                  <v-icon icon="mdi-cellphone" />
                  <span class="text-body-1 font-weight-semibold ml-3">{{ currentVolunteer?.phone }}</span>
                </p>

                <p class="icon-label text-body-1 mb-2" v-if="currentVolunteer?.email">
                  <v-icon icon="mdi-email" />
                  <span class="text-body-1 font-weight-semibold ml-3">{{ currentVolunteer?.email }}</span>
                </p>

                <p class="icon-label text-body-1 mb-2" v-if="currentVolunteer?.birthDate">
                  <v-icon icon="mdi-calendar" />
                  <span class="text-body-1 font-weight-semibold ml-3">{{ eventFullDate(currentVolunteer?.birthDate as string) }}</span>
                </p>

                <p class="icon-label text-body-1 mb-2" v-if="currentVolunteer?.city">
                  <v-icon icon="mdi-home-city" />
                  <span class="text-body-1 font-weight-semibold ml-3">{{ currentVolunteer?.city }}</span>
                </p>

              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item value="tab-2" v-if="isAdmin">
            <div class="individual-container">
              <p class="text-md-h3 mb-5">Sensíveis</p>
              <p class="icon-label text-body-1 mb-2">
                <span class="text-body-1 font-weight-semibold ml-3">CPF:</span>
                <span class="text-body-1 font-weight-semibold ml-3">{{ currentVolunteer?.identifier }}</span>
              </p>

              <p class="icon-label text-body-1 mb-2">
                <span class="text-body-1 font-weight-semibold ml-3">CEP:</span>
                <span class="text-body-1 font-weight-semibold ml-3">{{ currentVolunteer?.zip }}</span>
              </p>

              <p class="icon-label text-body-1 mb-0">
                <span class="text-body-1 font-weight-semibold ml-3">Endereço:</span>
                <span class="text-body-1 font-weight-semibold ml-3">{{ currentVolunteer?.address }}</span>
              </p>
            </div>
          </v-window-item>
        </v-window>
      </div>
    </UiParentCard>

    <!-- Modal Delete Event -->
    <ConfirmDeleteVolunteerModal
      v-if="data.displayConfirmDeleteVolunteerModal"
      :mobileView="isMobile"
      :dialog="data.displayConfirmDeleteVolunteerModal"
      @closeConfirmDeleteVolunteerModal="hideDeleteVolunteerDialog" />
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
  flex-basis: 50%;
  flex-direction: column;
  align-items: center;
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
.radio-container {
  display: flex;
  justify-content: space-between;
}
:deep(.v-tab__slider) {
  height: 0;
}
:deep(.v-selection-control-group) {
  flex-direction: row;
  gap: 10px;
  width: inherit;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    justify-content: center;
  }
}
:deep(.v-selection-control) {
  min-width: 150px;
  max-width: 150px;
}
</style>
