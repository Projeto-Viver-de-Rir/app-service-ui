<script lang="ts">
import type { ComputedRef, Ref } from "vue";
import { defineComponent, computed, onMounted } from "vue";
import type { debt, payRequest } from "../../entities/debt";

import { useDebts } from "../../stores/debtStore";

interface SetupData {
  debts: ComputedRef;
}

const store = useDebts();

export default defineComponent({
  name: "DebtsTable",
  setup(): SetupData {
    onMounted(async () => {
      await store.getData();
    });

    const openModalPayment = (debt: debt): void => {
      store.openModalPayment(debt);
    };
    const debts = computed(() => store.getList);
    return {
      debts,
      openModalPayment,
    };
  },
});
</script>
<template>
  <v-card class="border" elevation="0">
    <v-table class="month-table">
      <thead>
        <tr>
          <th class="text-h6">Voluntário</th>
          <th class="text-h6">Competência</th>
          <th class="text-h6">Vencimento</th>
          <th class="text-h6">Pagamento</th>
          <th class="text-h6"></th>
          <th class="text-h6"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in debts" :key="item.id" class="month-item">
          <td>
            <div class="d-flex align-left">
              <div>
                <h6 class="text-h6">{{ item.volunteer.name }}</h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-left">
              <div>
                <h6 class="text-h6">{{ item.name }}</h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-left">
              <div>
                <h6 class="text-h6">
                  {{ new Date(item.dueDate).toLocaleDateString() }}
                </h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-left">
              <div>
                <h6 v-if="item.paidAt !== null" class="text-h6">
                  {{ new Date(item.paidAt).toLocaleDateString() }}
                </h6>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-right">
              <div class="ml-4" style="width: 50px">
                <v-btn
                  size="small"
                  v-if="item.paidAt == null"
                  style="margin-right: 5px"
                  @click="openModalPayment(item)"
                  color="success"
                  type="submit"
                  >Pagar</v-btn
                >
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-right">
              <div class="ml-4" style="width: 100px">
                <router-link
                  tag="v-btn"
                  class="btn btn-primary mr-2"
                  :to="{ name: 'DetailtDebt', params: { id: item.id } }"
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
