<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Form } from "vee-validate";
import { useRoute } from "vue-router";

const email = ref("");
const emailRules = ref([
  (v: string) => !!v || "Email é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "Insira um email válido",
]);

const route = useRoute();

async function validate(values: any, { setErrors }: any) {
  const authStore = useAuthStore();
  return await authStore
    .forgot_password(email.value)
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
    <div class="d-flex flex-wrap align-center my-3 ml-n2"></div>
    <v-btn
      size="large"
      :loading="isSubmitting"
      color="primary"
      block
      type="submit"
      flat
      >Solicitar nova senha</v-btn
    >
  </Form>
</template>
