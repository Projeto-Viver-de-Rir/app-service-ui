<script setup lang="ts">
import type { event } from "@/entities/event";
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
  volunteer: {
    type: Object as PropType<event> | any,
    required: true,
  },
});

const emit = defineEmits(['closeConfirmRemoveParticipantModal']);

const actionConfirmRemove = async () => {
  closeModal(true);
}

const closeModal = (confirm = false) => {
  emit('closeConfirmRemoveParticipantModal', { confirm });
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
          <v-toolbar-title>Remover voluntário confirmado</v-toolbar-title>
          <v-btn icon color="inherit" @click="closeModal(false)" flat>
            <XIcon  width="20" />
          </v-btn>
        </v-toolbar>
          <v-card-text>Você tem certeza que deseja remover a pessoa voluntária <span class="font-weight-bold">{{ volunteer.name }}</span> deste evento?</v-card-text>

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