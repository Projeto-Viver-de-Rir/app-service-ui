<script setup lang="ts">
import { useEvents } from "../../stores/eventStore";

const store = useEvents();
const openModal = () => store.openModal(true);
const closeModal = () => store.openModal(false);
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props" />
    </template>

    <v-list>
      <v-list-item>
        <v-btn
          prepend-icon="mdi-calendar-blank"
          flat
          width="100%"
          @click="openModal"
        >
          Gerar Agenda
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn
          :to="{ name: 'CreateEvent' }"
          prepend-icon="mdi-plus-circle"
          flat
          width="100%"
        >
          Adicionar
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>


