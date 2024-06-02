<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const password = ref('Oi@123456');
const email = ref('dev-viniciusmachado@gmail.com');
const passwordRules = ref([
    (v: string) => !!v || 'Senha é obrigatória'
]);
const emailRules = ref([(v: string) => !!v || 'Email é obrigatório', (v: string) => /.+@.+\..+/.test(v) || 'Insira um email válido']);

function validate(values: any, { setErrors }: any) {
    const authStore = useAuthStore();
    return authStore.login(email.value, password.value).catch((error) => setErrors({ apiError: error }));
}
</script>

<template>
    <Form @submit="validate" v-slot="{ errors, isSubmitting }" class="mt-5" style="min-width: 350px;">
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email</v-label>
        <VTextField
            v-model="email"
            :rules="emailRules"
            class="mb-8"
            required
            hide-details="auto"
        ></VTextField>
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Senha</v-label>
        <VTextField
            v-model="password"
            :rules="passwordRules"
            required
            hide-details="auto"
            type="password"
            class="pwdInput"
        ></VTextField>
        <div class="d-flex flex-wrap align-center my-3 ml-n2">

        </div>
        <v-btn size="large" :loading="isSubmitting" color="primary" block type="submit" flat>Sign In</v-btn>
        <div v-if="errors.apiError" class="mt-2">
            <v-alert color="error">{{ errors.apiError }}</v-alert>
        </div>
    </Form>
</template>
