<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useEvents } from "@/stores/eventStore";

const { getList: eventsList } = storeToRefs(useEvents());

</script>
<template>
    <v-list two-lines>
        <template v-for="item in eventsList" :key="item.id">
            <v-list-item color="primary" class="py-3">
                <v-list-item-title class="text-subtitle-1">{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle class="text-subtitle-1 text-high-emphasis">
                  {{
                    new Date(item.happenAt).toLocaleDateString("pt-BR")
                  }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle-1 text-high-emphasis">
                  {{
                    new Date(item.happenAt).getHours() +
                    ":" +
                    (new Date(item.happenAt).getMinutes() < 10 ? "0" : "") +
                    new Date(item.happenAt).getMinutes()
                  }}
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
