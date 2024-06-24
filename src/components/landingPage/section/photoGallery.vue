<script setup lang="ts"></script>
<template>
  <div class="pt-sm-14 pt-10 pb-sm-16 pb-10">
    <v-container class="">
      <v-row class="justify-center">
        <v-col cols="12" sm="8">
          <h2 class="sectionTitle text-center pt-sm-8 pt-8 font-weight-bold">
            Galeria de Fotos
          </h2>
        </v-col>
      </v-row>
    </v-container>
    <div class="pb-16">
      <div class="d-flex flex-row mt-sm-8 mt-5 overflow-hidden">
        <div class="slider-group">
          <img src="@/assets/images/landingPage/background/slider-group.png" />
        </div>
        <div class="slider-group">
          <img src="@/assets/images/landingPage/background/slider-group.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-container {
  max-width: 1200px !important;
}
</style>
