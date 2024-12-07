<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useEvents } from "@/stores/eventStore";

import { eventFullDate, eventHour } from "@/utils/event";

const { getList: eventsList } = storeToRefs(useEvents());

const dateAndTimeDisplay = (event: any) => {
  return `${eventFullDate(event.happenAt)} às ${eventHour(event.happenAt)}`
}

</script>
<template>
    <v-list two-lines>
        <template v-for="item in eventsList" :key="item.id">
            <v-list-item color="primary" class="py-3">
                <v-list-item-title class="text-subtitle-1">{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle class="text-subtitle-1 text-high-emphasis">
                  {{ dateAndTimeDisplay(item) }}
                  </v-list-item-subtitle>               
                <template v-slot:append>
                    <v-list-item-subtitle class="text-subtitle-1 text-high-emphasis mr-3"> 
                      <router-link tag="v-btn" :to="{ name: 'EventDetails', params: { id: item.id } }"
                      >
                        <v-btn size="medium" color="primary" type="submit" variant="text">
                          Detalhes
                        </v-btn>
                      </router-link>                      
                    </v-list-item-subtitle>
                </template>
            </v-list-item>
            <v-divider></v-divider>
        </template>
    </v-list>
</template>
