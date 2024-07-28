<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Form } from "vee-validate";

const valid = ref(true);
const password = ref("");
const email = ref("");
const passwordRules = ref([
  (v: string) => !!v || "Senha é obrigatória",
  (v: string) =>
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/.test(v) || "Senha deve ter pelo menos 6 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial",
]);
const emailRules = ref([
  (v: string) => !!v || "E-mail é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "Insira um e-mail válido",
]);

async function validate(values: any, { setErrors }: any) {
  const authStore = useAuthStore();

  await authStore
  .register(email.value, password.value)
    .then(({ response }) => {
      if (response?.data?.status !== 200)
        setErrors({ apiError: response.data.title })
    })
    .catch((error) => setErrors({ apiError: error }));
}
</script>
<template>
  <Form
    @submit="validate"
    v-slot="{ errors, isSubmitting }"
    class="mt-5"
  >
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email</v-label    >
    <VTextField v-model="email" :rules="emailRules" required></VTextField>
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Senha</v-label>
    <VTextField
      v-model="password"
      :rules="passwordRules"
      required
      variant="outlined"
      type="password"
      color="primary"
    ></VTextField>
    <v-btn size="large"
      :loading="isSubmitting"
      color="primary"
      block
      type="submit"
      flat
      >Sign Up</v-btn
    >
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
</template>
