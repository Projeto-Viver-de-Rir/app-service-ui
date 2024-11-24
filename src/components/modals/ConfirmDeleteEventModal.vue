<script setup lang="ts">
import type { event } from "@/entities/event";
import { useEvents } from "@/stores/eventStore";
import { useSnackBar } from "@/stores/snackBarStore";
import { storeToRefs } from "pinia";
import { computed, reactive } from "vue";

const eventStore = useEvents();
const snackBarStore = useSnackBar()

const {
  getEvent: event,
  volunteersPresent: eventVolunteers,
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

const emit = defineEmits(['closeConfirmDeleteEventModal']);

const data = reactive({
  hasError: false,
})

const actionConfirmDelete = async () => {
  data.hasError = false;
  try {
    await eventStore.deleteSingleEvent(event.value as event);
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

const snackBarFeedbackLabel = computed(() => {
  const name = event.value?.name;
  return data.hasError ? 'Ocorreu um erro ao deletar o evento.' : `Evento ${name} deletado com sucesso.`;
})

const snackBarBtnColor = computed(() => {
  return data.hasError ? 'error' : 'success';
})

const closeModal = (confirm = false) => {
  emit('closeConfirmDeleteEventModal', { confirm });
}
</script>

<template>
    <v-dialog 
      v-model="props.dialog"
      :fullscreen="props.mobileView"
      persistent
      transition="dialog-bottom-transition"
      class="dialog-mw">
      <v-card>
        <v-toolbar dark color="error" style="">
          <v-toolbar-title>Deletar evento</v-toolbar-title>
          <v-btn icon color="inherit" @click="closeModal(false)" flat>
            <XIcon  width="20" />
          </v-btn>
        </v-toolbar>
          <v-card-text>Você tem certeza que deseja deletar o evento <span class="font-weight-bold">{{ event?.name }}</span>?</v-card-text>
          <v-card-text v-if="eventVolunteers.length">
            <v-icon color="warning" class="mr-1">mdi-alert</v-icon>
            Este evento possui <span class="font-weight-bold">
            {{ eventVolunteers.length }} {{ eventVolunteers.length > 1 ? 'voluntários confirmados' : 'voluntário confirmado' }}
          </span>.</v-card-text>

          <v-card-actions class="pa-6">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" variant="text" @click="closeModal(false)" flat>
              Cancelar
            </v-btn>
            <v-btn @click="actionConfirmDelete"
                   color="error" 
                   variant="tonal"
                   type="submit" >
              Deletar
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