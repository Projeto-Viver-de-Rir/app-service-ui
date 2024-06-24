<script lang="ts">
import type { ComputedRef, Ref } from "vue";
import { defineComponent, computed, onMounted } from "vue";

import type { team } from "../../entities/team";
import { useTeams } from "../../stores/teamStore";

interface SetupData {
  teams: ComputedRef;
}

const store = useTeams();

export default defineComponent({
  name: "TeamsTable",
  setup(): SetupData {
    onMounted(async () => {
      await store.searchWithFilters();
    });

    const teams = computed(() => store.getList);
    return {
      teams,
    };
  },
});
</script>
<template>
  <v-card class="border" elevation="0">
    <v-table class="month-table">
      <thead>
        <tr>
          <th class="text-h6">Nome</th>
          <th class="text-h6">Descrição</th>
          <th class="text-h6">Tipo</th>
          <th class="text-h6">Status</th>
          <th class="text-h6"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in teams" :key="item.id" class="month-item">
          <td>
            <div class="d-flex align-left">
              <div>
                <h6 class="text-h6">{{ item.name }}</h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-left">
              <div>
                <h6 class="text-h6">{{ item.description }}</h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-left">
              <div>
                <h6 class="text-h6">{{ item.type }}</h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-left">
              <div>
                <h6 class="text-h6">{{ item.status }}</h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-right">
              <div class="ml-4" style="width: 100px">
                <router-link
                  tag="v-btn"
                  class="btn btn-primary mr-2"
                  :to="{ name: 'DetailTeams', params: { id: item.id } }"
                >
                  <v-btn size="small" color="primary" type="submit"
                    >Editar</v-btn
                  >
                </router-link>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
