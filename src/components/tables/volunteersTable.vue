<script lang="ts">
import type { ComputedRef, Ref } from "vue";
import { defineComponent, computed, onMounted } from "vue";

import { useVolunteers } from "../../stores/volunteerStore";

interface SetupData {
  users: ComputedRef;
}

const store = useVolunteers();

export default defineComponent({
  name: "VolunteerTable",
  setup(): SetupData {
    onMounted(async () => {
      await store.getData();
    });

    const users = computed(() => store.getList);
    console.log(users);
    return {
      users,
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
          <th class="text-h6">Apelido</th>
          <th class="text-h6">Celular</th>
          <th class="text-h6"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id" class="month-item">
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
                <h6 class="text-h6">{{ item.nickname }}</h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-left">
              <div>
                <h6 class="text-h6">{{ item.phone }}</h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-right">
              <div class="ml-4" style="width: 100px">
                <router-link
                  tag="v-btn"
                  class="btn btn-primary mr-2"
                  :to="{ name: 'DetailtUser', params: { id: item.id } }"
                >
                  <v-btn size="small" color="primary" type="submit"
                    >Detalhes</v-btn
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
