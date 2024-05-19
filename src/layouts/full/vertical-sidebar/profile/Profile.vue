<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
console.log(authStore.user);
</script>

<template>
    <v-sheet rounded="md" color="lightsecondary" class="px-4 py-3 ExtraBox">
        <div class="d-flex align-center hide-menu">
            <v-avatar size="40" v-if="(!authStore.user.photo || !authStore.user.photo.includes('jpg') || !authStore.user.photo.includes('png'))">
                <img  src="@/assets/images/palhaco.png" alt="user" height="40" />
            </v-avatar>
           <v-avatar size="40" v-if="(authStore.user.photo !== undefined && (authStore.user.photo.includes('.jpg') || authStore.user.photo.includes('.png')))">
                <img :src="authStore.user.photo"  height="40" />
            </v-avatar>
            <div class="ml-4">
                <h4 class="mb-n1 text-h6 textPrimary">{{authStore.user.name}}</h4>
                <span class="text-subtitle-2 textSecondary">{{authStore.user.nickname || 'Bem vindo!'}}</span>
            </div>
            <div class="ml-auto">
                <v-btn variant="text" icon rounded="md" color="primary" @click="authStore.logout()">
                    <PowerIcon />

                    <v-tooltip activator="parent" location="top">Logout</v-tooltip>
                </v-btn>
            </div>
        </div>
    </v-sheet>
</template>
<style lang="scss">
.ExtraBox {
    position: relative;
    overflow: hidden;
}
.line-height-none {
    line-height: normal;
}
</style>
