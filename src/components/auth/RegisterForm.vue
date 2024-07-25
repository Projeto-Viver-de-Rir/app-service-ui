<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useCustomizerStore } from "@/stores/customizer";
import Logo from "@/layouts/full/logo/Logo.vue";

const customizer = useCustomizerStore();
const valid = ref(true);
const password = ref("");
const email = ref("");
const passwordRules = ref([
  (v: string) => !!v || "Senha é obrigatório",
  (v: string) =>
    (v && v.length <= 10) || "Senha deve ter menos de 10 caracteres",
]);
const emailRules = ref([
  (v: string) => !!v || "E-mail é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "Insira um e-mail válido",
]);

function validate(values: any, { setErrors }: any) {
  const authStore = useAuthStore();
  return authStore
    .register(email.value, password.value)
    .catch((error) => setErrors({ apiError: error }));
}
</script>
<template>
  <!-- Logo -->
  <div class="d-flex justify-center py-4" v-if="customizer.setRTLLayout" rtl>
    <RtlLogo />
  </div>
  <div class="d-flex justify-center py-4" v-else>
    <Logo />
  </div>
  <div class="d-flex align-center text-center mb-6">
    <div class="w-100 px-5 auth-divider position-relative"></div>
  </div> 
  <v-form
    @submit="validate"
    v-slot="{ errors, isSubmitting }"
    class="mt-5"
  >
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email</v-label    >
    <VTextField v-model="email" :rules="emailRules" required></VTextField>
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Senha</v-label>
    <VTextField
      v-model="password"
      :counter="10"
      :rules="passwordRules"
      required
      variant="outlined"
      type="password"
      color="primary"
    ></VTextField>
    <v-btn size="large" class="mt-2" color="primary" block submit flat
      >Sign Up</v-btn
    >
  </v-form>
</template>
