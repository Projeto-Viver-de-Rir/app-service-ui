<script setup lang="ts">
import type { Presence } from "@/entities/reports";
import { type PropType } from "vue";

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  mobileView: {
    type: Boolean,
    default: false,
  },
  presence: {
    type: Object as PropType<Presence> | any,
    required: true,
  },
});

const emit = defineEmits(['closeConfirmRemovePresenceModal']);

const actionConfirmRemove = async () => {
  closeModal(true);
}

const closeModal = (confirm = false) => {
  emit('closeConfirmRemovePresenceModal', { confirm });
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
          <v-toolbar-title>Remover frequência do relatório</v-toolbar-title>
          <v-btn icon color="inherit" @click="closeModal(false)" flat>
            <XIcon  width="20" />
          </v-btn>
        </v-toolbar>
          <v-card-text>
            <p>Você tem certeza que deseja remover o registro de frequência para a pessoa voluntária <span class="font-weight-bold">{{ presence.volunteer.name }}</span> do relatório atual? A mensagem informada será armazenada no usuário.</p>
          </v-card-text>

          <v-card-actions class="pa-6">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" variant="text" @click="closeModal(false)" flat>
              Cancelar
            </v-btn>
            <v-btn @click="actionConfirmRemove"
                   color="error" 
                   variant="tonal"
                   type="submit" >
              Remover
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