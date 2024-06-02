<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Logo from '@/layouts/full/logo/Logo.vue';
import { useAuthStore } from '@/stores/auth';
/* Login form */
import LoginForm from '@/components/auth/LoginForm.vue';
    onMounted(() => {
        const authStore = useAuthStore();
        authStore.startSession();
});

</script>

<template>
    <div class="pa-3">
        <v-row class="h-100vh mh-100 auth">
            <v-col cols="12" lg="7" xl="8"
                class="d-lg-flex align-center justify-center authentication position-relative">
                <div class="">
                    <img src="@/assets/images/landingPage/background-starter.png" />
                </div>
            </v-col>
            <v-col cols="12" lg="5" xl="4" class="d-flex align-center justify-center">
                
                <div class="mt-xl-0 mt-5 mw-100">
                    <div class="mt-xl-0 mt-5 mw-100">
                        <img src="@/assets/images/red_nose.png" style="position: absolute; display: inline-block; margin-left: -15px; margin-bottom:10px" width="50"/>
                        <h2 class="text-h3 font-weight-bold mb-2" style="display: inline-block; margin-left:31px; margin-top:7px">Viver de rir</h2>
                    </div>
                    <div class="text-subtitle-1 mb-6">Bem vindo!</div>
                    <LoginForm />
                </div>
            </v-col>
        </v-row>
    </div>
</template>
