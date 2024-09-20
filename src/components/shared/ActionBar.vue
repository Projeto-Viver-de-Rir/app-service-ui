<script setup lang="ts">
import type { ActionButton } from '@/interfaces/event';

defineProps({
  menuIcon: {
    type: String,
    required: false,
    default: () => 'mdi-dots-vertical'
  },
  actions: {
    type: Array<ActionButton>,
    required: true,
  },
});
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn :icon="menuIcon" variant="text" v-bind="props" />
    </template>

    <v-list>
      <v-list-item v-for="(action, index) in actions" :key="index">
        <v-btn
            v-if="action.visible"
            @click="action.onClick"
            :prepend-icon="action.button.icon"
            :size="action.button.size || 'small'"
            :color="action.button.color || 'default'"
            :variant="action.button.variant || 'text'"
            :disabled="action.disabled"
            :to="action.link ? { name: action.link.name, params: action.link.params } : null"
            flat>{{ action.label }}</v-btn>  
      </v-list-item>
    </v-list>
  </v-menu>
</template>