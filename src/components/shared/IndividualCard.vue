<script setup lang="ts">
import { isUserAvatarAvailable } from "@/utils/event";
import type { ActionButton } from '@/interfaces/event';
import type { PropType } from "vue";

defineProps({
  action: {
    type: Object as PropType<ActionButton>,
    required: true,
  },
  individual: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <v-card class="individual-card border" elevation="0">
    <div class="info-wrapper">
      <v-avatar size="50" v-if="isUserAvatarAvailable(individual.volunteer.photo)">
        <img :src="individual.volunteer.photo" height="50" />
      </v-avatar>
      <v-avatar size="50" v-else>
        <img src="@/assets/images/palhaco.png" alt="user" height="50" />
      </v-avatar>
      <div class="info-wrapper-name ml-2">
        <v-label
          class="text-subtitle-1 font-weight-semibold text-lightText ml-3"
          >{{ individual.volunteer.name }}</v-label>
        <v-label
          class="text-subtitle-1 text-lightText ml-3"
          >{{ individual.volunteer.nickname }}</v-label>
      </div>
    </div>
    <div class="ml-lg-auto" >
      <v-tooltip activator="parent" location="top" v-if="action.tooltip">{{action.tooltip}}</v-tooltip>
      <v-btn
        v-if="action.visible"
        @click="action.onClick"
        :icon="action.button.icon"
        :size="action.button.size || 'small'"
        :color="action.button.color || 'default'"
        :variant="action.button.variant || 'text'"
        class="ml-lg-auto"
        :disabled="action.disabled"
        :to="action.link ? { name: action.link.name, params: action.link.params } : null" />  
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.individual-card {
  display: flex;
  align-items: center;
  padding: 20px;
  @media (max-width: 1500px) {
    flex-direction: column;
  }
}
.info-wrapper {
  display: flex;
  align-items: center;
  &-name {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>