<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Form } from "vee-validate";
import { useRouter } from 'vue-router';
import { VTextarea } from "vuetify/lib/components/index.mjs";

const newPassword = ref("");
const email = ref("");
const resetCode = ref("");
const passwordRules = ref([(v: string) => !!v || "Senha é obrigatória"]);
const emailRules = ref([
  (v: string) => !!v || "Email é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "Insira um email válido",
]);

const router = useRouter();

async function validate(values: any, { setErrors }: any) {
  const authStore = useAuthStore();
  return await authStore
    .reset_password(email.value, resetCode.value, newPassword.value)
    .then((success) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("session");
      
      router.push("/auth/login");
    })
    .catch((error) => {
      console.log(error);
});
}
</script>

<template>
  <Form
    @submit="validate"
    v-slot="{ errors, isSubmitting }"
    class="mt-5"
  >

    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
      >Email</v-label
    >
    <VTextField
      v-model="email"
      :rules="emailRules"
      class="mb-8"
      required
      hide-details="auto"
    ></VTextField>
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
      >Código</v-label
    >
    <VTextarea
      v-model="resetCode"
      class="mb-8"
      required
      hide-details="auto"
    ></VTextarea>    
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
      >Nova Senha</v-label
    >
    <VTextField
      v-model="newPassword"
      :rules="passwordRules"
      required
      hide-details="auto"
      type="password"
      class="pwdInput"
    ></VTextField>
    <div class="d-flex flex-wrap align-center my-3 ml-n2"></div>
    <v-btn
      size="large"
      :loading="isSubmitting"
      color="primary"
      block
      type="submit"
      flat
      >Alterar</v-btn
    >
  </Form>
</template>
