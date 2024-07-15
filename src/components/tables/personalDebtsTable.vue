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

<style>
.year {
  summary {
    padding: 8px 16px;
    cursor: pointer;

    > h3 {
      display: inline;

      padding: 0 8px;
    }
  }
}

.month-table > .v-table__wrapper > table > :is(tbody, thead) {
  tr > * {
    &:not(:nth-child(2)) {
      width: 15%;
    }

    &:not(:nth-child(1)) {
      padding: 0 !important;
    }

    &:nth-child(1) {
      padding: 0 16px !important;
    }

    &:nth-child(2) {
      width: 30%;
    }
  }
}
</style>

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
      </v-table>

      <template v-for="year in Object.keys(debts.results)" :key="year">
        <details class="year" open>
          <summary>
            <h3>{{ year }}</h3>
          </summary>

          <v-table class="month-table">
            <tbody>
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
            </tbody>
          </v-table>
        </details>
      </template>
    </v-card>
  </v-row>
</template>
