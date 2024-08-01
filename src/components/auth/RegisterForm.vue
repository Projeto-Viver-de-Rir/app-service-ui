<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Form } from "vee-validate";

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

const confirmed = ref(false);

async function validate(values: any, { setErrors }: any) {
  const authStore = useAuthStore();

  await authStore
  .register(email.value, password.value)
    .then(({ response }) => {
      if (response?.status === 200) {
        confirmed.value = true;
        return;
      }

      const errors = response?.data?.errors || "Ocorreu um erro geral.";
      setErrors({ apiError: errors });
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
      :disabled="confirmed"
      color="primary"
      block
      type="submit"
      flat
      >Registrar</v-btn
    >
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">
        Não foi possível criar seu cadastro. Motivo(s):
        <p class="pl-5" v-if="typeof errors.apiError === 'object'" v-for="(error, i) in errors.apiError" :key="i">
          <span v-if="Array.isArray(error)" v-for="(message) in error" :key="i">{{ message }}</span>
        </p>
        <p class="pl-5" v-else>{{ errors.apiError }}</p>
      </v-alert>
    </div>

    <v-alert color="success" v-if="confirmed">Seu cadastro foi realizado! <br />
      Em breve você deverá receber um e-mail para continuar seu cadastro.
    </v-alert>
  </Form>
</template>
