<script lang="ts">
import type { ComputedRef, Ref } from "vue";
import { defineComponent, computed, onMounted } from "vue";

import { useWorkingGroups } from "../../stores/workingGroupStore";

interface SetupData {
  workingGroups: ComputedRef;
}

const store = useWorkingGroups();

export default defineComponent({
  name: "WorkingGroupsTable",
  setup(): SetupData {
    onMounted(async () => {
      await store.searchAdministrative();
    });

    const workingGroups = computed(() => store.getAdministrative);
    return {
      workingGroups,
    };
  },
});
</script>
<template>
  <v-row
    class="justify-content-end mt-5"
    v-for="team in workingGroups"
    :key="team.id"
  >
    <v-col cols="12">
      <div class="d-sm-flex align-center mb-5">
        <h3 class="text-h3">
          {{ team.name }}
          <v-chip
            size="small"
            class="ml-2 elevation-0"
            variant="elevated"
            color="secondary"
            >{{ team.description }}</v-chip
          >
        </h3>
      </div>
      <v-row>
        <v-col
          cols="12"
          md="4"
          sm="6"
          v-for="card in team.members"
          :key="card.id"
        >
          <v-card elevation="10" class="card-hover">
            <v-card-item class="text-center">
              <v-avatar size="80">
                <img
                  :src="card.volunteer.photo"
                  :alt="card.volunteer.name"
                  width="80"
                />
              </v-avatar>
              <h4 class="text-h5 mt-3">{{ card.volunteer.name }}</h4>
              <span class="text-truncate d-block gap-2 text-subtitle-1">
                {{ card.volunteer.nickname }}
              </span>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
