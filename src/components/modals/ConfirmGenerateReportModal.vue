<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";

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

const emit = defineEmits(['closeConfirmGenerateReportModal']);

const closeModal = (confirm = false) => {
  emit('closeConfirmGenerateReportModal', { confirm });
}

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
        <v-toolbar dark color="warning" style="">
          <v-toolbar-title>Gerar Novo Relatório</v-toolbar-title>
          <v-btn icon color="inherit" @click="closeModal(false)" flat>
            <XIcon  width="20" />
          </v-btn>
        </v-toolbar>
          <v-card-text>
            <p class="text-body-1 mb-2">
              <span class="text-body-1 font-weight-semibold">Gostaria de gerar um novo relatório? As informações atuais serão perdidas.</span>
            </p>
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
            <v-btn @click="closeModal(true)"
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