<template>
  <!-- ---------------------------------------------- -->
  <!-- mega menu DD -->
  <!-- ---------------------------------------------- -->
  <v-btn
    variant="text"
    color="primary"
    class="custom-hover-primary nav-links"
    href="/"
    target="_blank"
    >Pagina Inicial</v-btn
  >
  <!-- <v-btn variant="text" color="primary" class="custom-hover-primary nav-links" href="/our-team" target="_blank">Nossa equipe</v-btn> -->
  <v-btn
    variant="text"
    color="primary"
    class="custom-hover-primary nav-links"
    href="/contact"
    target="_blank"
    >Contato</v-btn
  >
  <router-link
    tag="v-btn"
    class="btn btn-primary ml-2"
    :to="{ name: 'Side Login' }"
    replace
  >
    <v-btn
      class="custom-hover-primary bg-primary ml-2 text-white"
      flat
      href="/auth/login"
      ><span class="text-white">Login</span></v-btn
    >
  </router-link>
</template>
