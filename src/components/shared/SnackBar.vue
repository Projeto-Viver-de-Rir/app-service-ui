<script setup lang="ts">
import type { SnackBar } from "@/interfaces/components";
import { useSnackBar } from "@/stores/snackBarStore";
import { storeToRefs } from "pinia";
import { computed, reactive, watch, type PropType } from "vue";

const snackBarStore = useSnackBar()

const {
  defaultTimeout,
} = storeToRefs(snackBarStore);

const props = defineProps({
  snackBar: { 
    type: Object as PropType<SnackBar> | any,
    required: true,
    default: () => {
      return {}
    }
  },
  show: {
    type: Boolean,
  },
  defaultTimeout: {
    type: Number,
  }
});

const timeout = computed(() => {
  if (!props.snackBar.message) return 0;
  const t = props.snackBar.timeout || defaultTimeout.value
  return props.snackBar.timeout || props.defaultTimeout;
})

const data = reactive({
  showSnackbar: false,
})

const dismissSnackBar = () => {
  data.showSnackbar = false;
}

watch(
  [() => props.snackBar],
  ([snackBar]) => {
    if(snackBar.message) {
      data.showSnackbar = true;
      setTimeout(() => {
        data.showSnackbar = false;
      }, timeout.value - 400); // 400 ms refers to the snackbar fadeout animation time.
    }
  },
  { immediate: true },
);
</script>

<template>
    <v-snackbar v-model="data.showSnackbar" :timeout="timeout" elevation="24">
      {{ snackBar.message }}
      <template v-slot:actions>
        <v-btn :color="snackBar.color || 'default'"
               :variant="snackBar.variant || 'text'"
               @click="snackBar.action ? snackBar.action() : dismissSnackBar()">
          {{ snackBar.actionLabel ? snackBar.actionLabel : 'Fechar'  }}
        </v-btn>
      </template>
    </v-snackbar>
</template>
