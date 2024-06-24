<script lang="ts">
import type { ComputedRef, Ref } from "vue";
import { defineComponent, computed, onMounted } from "vue";

import type { scheduleEvent } from "../../entities/scheduleEvent";
import { useScheduleEvents } from "../../stores/scheduleEventStore";

interface SetupData {
  debts: ComputedRef;
}

const store = useScheduleEvents();

export default defineComponent({
  name: "ScheduleEventsTable",
  setup(): SetupData {
    onMounted(async () => {
      await store.getData();
    });

    const scheduleEvents = computed(() => store.getList);
    return {
      scheduleEvents,
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
          <th class="text-h6">Dia da Semana</th>
          <th class="text-h6">Frequência</th>
          <th class="text-h6"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in scheduleEvents" :key="item.id" class="month-item">
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
                <h6 class="text-h6">{{ item.dayOfWeek }}</h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-left">
              <div>
                <h6 class="text-h6">{{ item.occurrence }}</h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-right">
              <div class="ml-4" style="width: 100px">
                <router-link
                  tag="v-btn"
                  class="btn btn-primary mr-2"
                  :to="{
                    name: 'DetailScheduleEvents',
                    params: { id: item.id },
                  }"
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
