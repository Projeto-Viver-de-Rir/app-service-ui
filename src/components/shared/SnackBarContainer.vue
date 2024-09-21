<script setup lang="ts">
import type { SnackBar } from "@/interfaces/components";
import { computed, type PropType } from "vue";
import SnackBarComponent from "@/components/shared/SnackBar.vue";

import { useSnackBar } from "@/stores/snackBarStore";
import { storeToRefs } from "pinia";

const snackBarStore = useSnackBar()

const { 
  currentSnackBar,
  defaultTimeout,
} = storeToRefs(snackBarStore);
</script>

<template>
  <div class="snackbar-container">
    <SnackBarComponent :snackBar="currentSnackBar"
                       :defaultTimeout="defaultTimeout"/>
  </div>
</template>
