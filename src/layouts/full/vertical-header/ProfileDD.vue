<script setup lang="ts">
import { MailIcon } from 'vue-tabler-icons';
import { profileDD } from '@/_mockApis/headerData';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                 <v-avatar size="40" v-if="(!authStore.user.photo.includes('jpg') || !authStore.user.photo.includes('png'))">
                    <img  src="@/assets/images/palhaco.png" alt="user" height="40" />
                </v-avatar>
                <v-avatar size="40" v-if="(authStore.user.photo.includes('.jpg') || authStore.user.photo.includes('.png'))">
                    <img :src="authStore.user.photo"  height="40" />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="360" elevation="10">
            <div class="px-8 pt-6">
                <h6 class="text-h5 font-weight-medium">Voluntário</h6>
                <div class="d-flex align-center mt-4 pb-6">
                 <v-avatar size="80" v-if="(!authStore.user.photo.includes('jpg') || !authStore.user.photo.includes('png'))">
                    <img  src="@/assets/images/palhaco.png" alt="user" height="80" />
                </v-avatar>
                <v-avatar size="80" v-if="(authStore.user.photo.includes('.jpg') || authStore.user.photo.includes('.png'))">
                    <img :src="authStore.user.photo"  height="80" />
                </v-avatar>
                    <div class="ml-3">
                        <h6 class="text-h6 mb-n1">{{authStore.user.name}}</h6>
                        <span class="text-subtitle-1 font-weight-regular textSecondary">{{authStore.user.nickname}}</span>
                        <div class="d-flex align-center mt-1">
                            <MailIcon size="18" stroke-width="1.5" />
                            <span class="text-subtitle-1 font-weight-regular textSecondary ml-2">{{authStore.user.email}}</span>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>
            </div>           
            <div class="pt-4 pb-6 px-8 text-center">
                <v-btn color="primary" variant="outlined" block @click="authStore.logout()">Logout</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
