<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/components/landingPage/layout/Header.vue";
import MainBanner from "@/components/landingPage/section/mainBanner.vue";
import OurHistory from "@/components/landingPage/section/ourHistory.vue";
import PhotoGallery from "@/components/landingPage/section/photoGallery.vue";
import UserReview from "@/components/landingPage/section/userReview.vue";
import AskQuestion from "@/components/landingPage/section/askQuestion.vue";
import Footer from "@/components/landingPage/layout/Footer.vue";
import "aos/dist/aos.css";
import AOS from "aos";
import { useAuthStore } from "@/stores/auth";
onMounted(() => {
  AOS.init();
  const authStore = useAuthStore();
  authStore.clearSession();
});
</script>

<template>
  <div class="lp-wraper">
    <!--Header-->
    <Header />
    <!----------->

    <!----------->
    <!--Content-->
    <div class="bg-hoverColor">
      <MainBanner />
      <OurHistory />
      <UserReview />
      <AskQuestion />
      <PhotoGallery />
    </div>
    <!----------->

    <!--Footer-->
    <Footer />
    <!----------->
  </div>
</template>
