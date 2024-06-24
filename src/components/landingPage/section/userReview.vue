<script setup lang="ts">
import { ref } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { userReview } from "@/_mockApis/landingpage/lpPage";
import {
  testimonialSettings,
  testimonialBreakpoints,
} from "@/_mockApis/landingpage/curoselData";
</script>
<template>
  <div class="pt-sm-14 pt-10 pb-sm-16 pb-10">
    <v-container class="">
      <v-row class="justify-center">
        <v-col cols="12" sm="8">
          <h2 class="sectionTitle text-center font-weight-bold">Depoimentos</h2>
        </v-col>
      </v-row>
      <div class="mt-10 testimonials">
        <carousel
          :settings="testimonialSettings"
          :breakpoints="testimonialBreakpoints"
          class="overflow-hidden"
        >
          <slide v-for="card in userReview" :key="card.img">
            <v-card elevation="10" class="ma-4">
              <div class="pa-6 text-left">
                <div class="d-flex gap-2">
                  <v-avatar size="40">
                    <img :src="card.img" :alt="card.img" width="40" />
                  </v-avatar>
                  <div>
                    <h6 class="text-h6">{{ card.title }}</h6>
                    <h6 class="text-body-1">{{ card.subtitle }}</h6>
                  </div>
                </div>
                <p class="text-15 mt-6">{{ card.review }}</p>
              </div>
            </v-card>
          </slide>
          <template #addons>
            <pagination class="mt-6" />
          </template>
        </carousel>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.v-container {
  max-width: 1200px !important;
}
</style>
