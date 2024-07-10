<script lang="ts">
import type { ComputedRef } from "vue";
import { defineComponent, computed } from "vue";

import { useDebts } from "../../stores/debtStore";

interface SetupData {
  debts: ComputedRef;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

const store = useDebts();

export default defineComponent({
  name: "PersonalDebtsTable",

  setup(): SetupData {
    const debts = computed(() => store.getPersonalDebts);

    const formatDate = (date: Date) => {
      const day = date.getDate();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");

      return `${day}/${month}`;
    };

    const formatCurrency = (amount: number) => {
      const formattedCurrency = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      });

      return formattedCurrency.format(amount);
    };

    return {
      debts,
      formatCurrency,
      formatDate,
    };
  },
});
</script>

<template>
  <v-row>
    <v-card class="border" elevation="0">
      <v-table class="month-table">
        <thead>
          <tr>
            <th class="text-h6">Ano</th>
            <th class="text-h6">Nome</th>
            <th class="text-h6">Vencimento</th>
            <th class="text-h6">Valor</th>
            <th class="text-h6">Pagamento</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="year in Object.keys(debts.results)" :key="year">
            <tr>
              <td colspan="5">{{ year }}</td>
            </tr>

            <tr
              v-for="item in debts.results[year]"
              :key="item.id"
              class="month-item"
            >
              <td></td>

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
                    <h6 class="text-h6">
                      {{ formatDate(new Date(item.dueDate)) }}
                    </h6>
                  </div>
                </div>
              </td>

              <td>
                <div class="d-left">
                  <div>
                    <h6 class="text-h6">
                      {{ formatCurrency(item.amount) }}
                    </h6>
                  </div>
                </div>
              </td>

              <td>
                <div class="d-left">
                  <div>
                    <h6 v-if="item.value !== null" class="text-h6"></h6>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </v-table>
    </v-card>
  </v-row>
</template>
