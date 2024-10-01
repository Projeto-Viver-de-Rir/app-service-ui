<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, reactive } from "vue";
import IndividualCard from "@/components/shared/IndividualCard.vue";
import { useEvents } from "@/stores/eventStore";
import { useSnackBar } from "@/stores/snackBarStore";

const eventStore = useEvents();
const snackBarStore = useSnackBar();

const { 
  volunteersPresent: eventVolunteers,
} = storeToRefs(eventStore);

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
});

const data = reactive({
  individualsToValidate: [] as Array<any>,
  hasError: false,
})

const emit = defineEmits(['closeValidatePresenceModal']);

const actionConfirmPresence = async () => {
  const presences: Array<string> = data.individualsToValidate.filter((x) => x.volunteer.present)
    .map((x) => x.volunteer.id)
  try {
    await eventStore.finishEvent(presences)
  } catch (error) {
    data.hasError = true;
  }
  snackBarStore.addToQueue({ 
    color: snackBarBtnColor.value, 
    message: snackBarFeedbackLabel.value
  });
  closeModal(!data.hasError);
}

const snackBarFeedbackLabel = computed(() => {
  return data.hasError ? 'Ocorreu um erro ao concluir o evento.' : 'Evento concluido com sucesso!';
})

const snackBarBtnColor = computed(() => {
  return data.hasError ? 'error' : 'success';
})

const closeModal = (confirm = false) => {
  emit('closeValidatePresenceModal', { confirm });
}

const getActionBtnProps = () => {
  return {
    id: 0,
    button: {
      icon: ''
    },
    visible: false,
  }
}

onMounted(() => {
  data.individualsToValidate = eventVolunteers.value.map((volunteer: any) => {
    return {
      volunteer: {
        ...volunteer,
        present: true,
      }
    }
  });
});
</script>

<template>
    <v-dialog 
      v-model="props.dialog"
      fullscreen
      persistent
      transition="dialog-bottom-transition"
      class="dialog-mw">
      <v-card>
        <v-toolbar dark color="primary" style="flex: unset">
          <v-btn icon color="inherit" @click="closeModal()" flat>
            <XIcon  width="20" />
          </v-btn>
          <v-toolbar-title>Concluir Evento</v-toolbar-title>
          <v-btn icon color="inherit" @click="actionConfirmPresence" flat>
            Salvar
          </v-btn>
        </v-toolbar>
        <v-card-text>

          <p class="font-weight-bold mt-10 mb-10">
            {{ data.individualsToValidate.length ? 'Confirme quem esteve presente no evento' :  'Ninguém confirmou presença neste evento' }}
          </p>
          <div class="individual-card-wrapper">
            <div class="individual-card-container mb-5" v-for="(individual, index) in data.individualsToValidate" :key="index">
              <v-checkbox v-model="individual.volunteer.present" color="primary" :value="individual.volunteer.attented" hide-details />
              <IndividualCard :key="individual.volunteer.id"
                              :action="getActionBtnProps()"
                              :individual="individual" />
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
.individual-card-wrapper {
  display: flex;
  flex-direction: column;
}
.individual-card-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}
</style>