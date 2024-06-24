<script lang="ts">
import type { ComputedRef, Ref } from "vue";
import { defineComponent, computed, onMounted } from "vue";

import type { config } from "../../entities/config";
import { useConfigs } from "../../stores/configStore";

interface SetupData {
  configs: ComputedRef;
}

const store = useConfigs();

export default defineComponent({
  name: "ConfigsTable",
  setup(): SetupData {
    onMounted(async () => {
      await store.searchWithFilters();
    });

    const configs = computed(() => store.getList);
    return {
      configs,
    };
  },
});
</script>
<template>
  <v-card class="border" elevation="0">
    <v-table class="month-table">
      <thead>
        <tr>
          <th class="text-h6">Tipo</th>
          <th class="text-h6">Descrição</th>
          <th class="text-h6">Valor</th>
          <th class="text-h6"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in configs" :key="item.id" class="month-item">
          <td>
            <div class="d-flex align-left">
              <div>
                <h6 class="text-h6">{{ item.type }}</h6>
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
                <h6 class="text-h6">{{ item.value }}</h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-right">
              <div class="ml-4" style="width: 100px">
                <router-link
                  tag="v-btn"
                  class="btn btn-primary mr-2"
                  :to="{ name: 'DetailConfigs', params: { id: item.id } }"
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
