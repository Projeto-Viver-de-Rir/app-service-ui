<script setup lang="ts">
import RegisterForm from "@/components/auth/RegisterForm.vue";
import { useCustomizerStore } from "../../stores/customizer";

const customizer = useCustomizerStore();
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row class="h-100vh d-flex justify-center align-center">
      <v-card
        density="default" 
        variant="elevated"
        class="elevation-10 rounded-md px-sm-1 px-0 mx-auto" 
        style="max-width: 450px;"
      >
        <v-card-item class="pa-sm-8">
          <RegisterForm />
          <h6 class="text-h6 text-medium-emphasis d-flex justify-center align-center mt-3">
            Já possui cadastro?
            <v-btn 
              density="default" 
              size="default" 
              variant="plain" 
              class="v-theme--BLUE_THEME text-primary text-body-1 opacity-1 pl-2" 
              href="/auth/login"
            >
              Sign In
            </v-btn>
          </h6>
        </v-card-item>        
      </v-card>      
    </v-row>
  </v-container>
</template>
