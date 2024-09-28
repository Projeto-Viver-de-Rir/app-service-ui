<script setup lang="ts">
import type { event } from "@/entities/event";
import { useEvents } from "@/stores/eventStore";
import { useSnackBar } from "@/stores/snackBarStore";
import { eventDate, eventHour } from "@/utils/event";
import { storeToRefs } from "pinia";
import { computed, onMounted, reactive, type PropType } from "vue";

const eventStore = useEvents();
const snackBarStore = useSnackBar()

const {
  getEvent: event,
	getPlaces: eventNamesList,
} = storeToRefs(eventStore);

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  mobileView: {
    type: Boolean,
    default: false,
  },
});

const data = reactive({
  isSubmitDisabled: true,
  hasError: false,
  timeRemaining: 5,
})

const emit = defineEmits(['closeConfirmEventScheduleModal']);

const actionConfirmEventSchedule = async () => {
  data.hasError = false;
  try {
    await eventStore.processEventSchedule();
    closeModal(true);
  } catch (error) {
    data.hasError = true;
    closeModal(false);
  }
  snackBarStore.addToQueue({ 
    color: snackBarBtnColor.value, 
    message: snackBarFeedbackLabel.value
  });
}

const closeModal = (reload = false) => {
  emit('closeConfirmEventScheduleModal', { reload });
}

const snackBarFeedbackLabel = computed(() => {
  return data.hasError ? 'Ocorreu um erro ao gerar a agenda' : 'Agenda gerada com sucesso!';
})

const snackBarBtnColor = computed(() => {
  return data.hasError ? 'error' : 'success';
})

const nextMonth = computed(() => {
  let date = new Date();
  var newDate = new Date(date.setMonth(date.getMonth() + 2));
  return newDate.getMonth() + "/" + newDate.getFullYear();;
})

const timeRemaningLabel = computed(() => {
  return `Confirme em ${data.timeRemaining} segundos...`;
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
        <v-toolbar dark color="warning" style="flex: unset">
          <v-toolbar-title>Gerar agenda</v-toolbar-title>
          <v-btn icon color="inherit" @click="closeModal(false)" flat>
            <XIcon  width="20" />
          </v-btn>
        </v-toolbar>
          <v-card-text>
            <p class="text-body-1 mb-2">
              <span class="text-body-1 font-weight-semibold">Gostaria de gerar os eventos referentes ao mes:</span>
            </p>
            <h1 class="text-md-h3">
              <span class="text-md-h3 font-weight-bold">{{ nextMonth }}</span>
            </h1>
          </v-card-text>
          <v-card-text>
            <p class="text-body-1 mb-2">
              <span class="text-body-1 font-weight-bold">Você tem certeza que deseja executar essa operação?</span>
            </p>
          </v-card-text>

          <v-card-actions class="pa-6">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" variant="text" @click="closeModal(false)" flat>
              Cancelar
            </v-btn>
            <v-btn @click="actionConfirmEventSchedule"
                   :disabled="data.isSubmitDisabled || data.hasError"
                   color="warning" 
                   variant="flat"
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