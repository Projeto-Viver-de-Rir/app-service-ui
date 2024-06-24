<script lang="ts">
import UiParentCard from "@/components/shared/UiParentCard.vue";
import { ref, defineComponent, onMounted, computed } from "vue";

export default defineComponent({
  name: "AbsenceCard",
  components: {
    UiParentCard,
  },
  props: ["current", "history"],
});
</script>
<template>
  <v-row style="display: flex; align-items: center; justify-content: center">
    <UiParentCard
      title="Ausências no mês (passado/atual)"
      style="background-color: #cd5c5c; color: white"
    >
      <v-row
        style="display: flex; align-items: center; justify-content: center"
      >
        <text style="font-size: 25px">{{ history }}/{{ current }}</text>
      </v-row>
    </UiParentCard>
  </v-row>
</template>
