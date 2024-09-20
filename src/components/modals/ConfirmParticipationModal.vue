<script setup lang="ts">
import type { event } from "@/entities/event";
import { useEvents } from "@/stores/eventStore";
import { eventDate, eventHour } from "@/utils/event";
import { computed, onMounted, reactive, type PropType } from "vue";

const eventStore = useEvents();

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  mobileView: {
    type: Boolean,
    default: false,
  },
  event: {
    type: Object as PropType<event> | any,
    required: true,
  },
});

const data = reactive({
  isSubmitDisabled: true,
  showSnackBar: false,
  hasError: false,
  timeRemaining: 5,
})

const emit = defineEmits(['closeConfirmParticipationModal']);

const actionConfirmParticipation = async () => {
  data.hasError = false;
  try {
    await eventStore.confirmVacancy();
    closeModal(true, true);
  } catch (error) {
    data.hasError = true;
    closeModal(false, true);
  }
}

const closeModal = (reload = false, showSnackBar = false) => {
  emit('closeConfirmParticipationModal', { reload, snackBar: { color: snackBarBtnColor.value, message: snackBarFeedbackLabel.value, show: showSnackBar  } });
}

const timeRemaningLabel = computed(() => {
  return `Confirme em ${data.timeRemaining} segundos...`;
})

const snackBarFeedbackLabel = computed(() => {
  return data.hasError ? 'Ocorreu um erro ao confirmar a sua participação.' : 'Participação confirmada com sucesso!';
})

const snackBarBtnColor = computed(() => {
  return data.hasError ? 'error' : 'success';
})

const lockTimer = () => {
  const lockTimer = setInterval(() => {
    if(data.timeRemaining <= 1){
      clearInterval(lockTimer);
      data.isSubmitDisabled = false;
    }
    data.timeRemaining -= 1;
  }, 1000);
}

onMounted(async () => {
  lockTimer();
});
</script>

<template>
    <v-dialog 
      v-model="props.dialog"
      :fullscreen="props.mobileView"
      persistent
      transition="dialog-bottom-transition"
      class="dialog-mw">
      <v-card>
        <v-toolbar dark color="primary" style="flex: unset">
          <v-toolbar-title>Confirmação de presença</v-toolbar-title>
          <v-btn icon color="inherit" @click="closeModal(false, false)" flat>
            <XIcon  width="20" />
          </v-btn>
        </v-toolbar>
          <v-card-text>
            <p class="icon-label text-body-1 mb-2">
              <span class="text-body-1 font-weight-bold">Local:</span>
              <span class="text-body-1 ml-2">{{ event.address }} - {{ event.city }}</span>
            </p>
            <div class="mb-2 d-flex align-md-end">
              <span class="text-body-1 font-weight-bold">Dia:</span>
              <p class="text-md-h1 ml-4">{{ eventDate(event.happenAt)}}</p>
            </div>
            <div class="mb-2 d-flex align-md-end">
              <span class="text-body-1 font-weight-bold">Hora:</span>
              <p class="text-md-h1 ml-2">{{ eventHour(event.happenAt)}}</p>
            </div>
          </v-card-text>
          <v-card-text>Você tem certeza que irá comparecer?</v-card-text>

          <v-card-actions class="pa-6">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" variant="text" @click="closeModal(false, false)" flat>
              Cancelar
            </v-btn>
            <v-btn @click="actionConfirmParticipation"
                   :disabled="data.isSubmitDisabled || data.hasError"
                   color="primary" 
                   variant="tonal"
                   type="submit" >
              {{ data.isSubmitDisabled ? timeRemaningLabel : 'Confirmar' }}
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
:deep(.v-card-actions) {
  padding: 10px 0 0;
}
</style>