<script setup lang="ts">
import RegisterForm from "@/components/auth/RegisterForm.vue";
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
          <!-- Logo -->
          <div class="mt-xl-0 my-5 mw-100 d-flex align-center justify-center">
            <img
              src="@/assets/images/red_nose.png"
              width="50"
            />
            <h2
              class="text-h3 font-weight-bold"
            >
              Viver de Rir
            </h2>
          </div>
          <div class="mb-8">Seja bem vindo ao processo de inscrição para novos voluntários da nossa instituição.</div>

          <div class="d-flex align-center text-center mb-6">
            <div class="w-100 px-5 auth-divider position-relative"></div>
          </div>

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
              Login
            </v-btn>
          </h6>
        </v-card-item>        
      </v-card>      
    </v-row>
  </v-container>
</template>
