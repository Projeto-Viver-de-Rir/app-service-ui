<script setup lang="ts">
import { useSnackBar } from "@/stores/snackBarStore";
import { useVolunteers } from "@/stores/volunteerStore";
import { storeToRefs } from "pinia";
import { computed, reactive } from "vue";

const volunteerStore = useVolunteers();
const snackBarStore = useSnackBar()

const {
  getCurrentVolunteer: volunteer,
} = storeToRefs(volunteerStore);

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

const emit = defineEmits(['closeConfirmDeleteVolunteerModal']);

const data = reactive({
  hasError: false,
})

const actionConfirmDelete = async () => {
  data.hasError = false;
  try {
    await volunteerStore.deleteVolunteer(volunteer.value?.id as string);
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
  const name = volunteer.value?.name;
  return data.hasError ? 'Ocorreu um erro ao deletar o voluntário.' : `Voluntário ${name} deletado com sucesso.`;
})

const snackBarBtnColor = computed(() => {
  return data.hasError ? 'error' : 'success';
})

const closeModal = (confirm = false) => {
  emit('closeConfirmDeleteVolunteerModal', { confirm });
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
        <v-toolbar dark color="error" style="flex: unset">
          <v-toolbar-title>Remover voluntário</v-toolbar-title>
          <v-btn icon color="inherit" @click="closeModal(false)" flat>
            <XIcon  width="20" />
          </v-btn>
        </v-toolbar>
          <v-card-text>Você tem certeza que deseja deletar o voluntário <span class="font-weight-bold">{{ volunteer?.name }}</span>?</v-card-text>

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