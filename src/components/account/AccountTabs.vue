<script setup lang="ts">
import { ref } from "vue";
import { UserCircleIcon, AlertCircleIcon } from "vue-tabler-icons";
import AccountTab from "./AccountTab.vue";
import VolunteerTab from "./VolunteerTab.vue";
const tab = ref(null);
</script>

<template>
    <v-card elevation="0">
        <v-tabs v-model="tab">
            <v-tab value="1">
                <UserCircleIcon stroke-width="1.5" width="20" />
                Conta
            </v-tab>
            <v-tab value="2" class="flex-row">
                <AlertCircleIcon stroke-width="1.5" width="20" />
                Voluntário
            </v-tab>
        </v-tabs>
        <v-card-text class="bg-grey100 rounded-md mt-4">
            <v-window v-model="tab">
                <v-window-item value="1">
                    <AccountTab :tab="tab" />
                </v-window-item>
                <v-window-item value="2">
                    <VolunteerTab />
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>
