<script lang="ts">
import type { ComputedRef } from "vue";
import { defineComponent, computed } from "vue";
import type { volunteer } from "@/entities/volunteer";

import { useDebts } from "../../stores/debtStore";

interface SetupData {
  debts: ComputedRef;
  userData: volunteer | null;
}

const store = useDebts();

export default defineComponent({
  name: "PersonalDebtsHeader",
  setup(): SetupData {
    const user = localStorage.getItem("user");
    let userData: volunteer | null = null;
    if (!!user) {
      userData = JSON.parse(user);
    }

    const debts = computed(() => store.getPersonalDebts);

    return {
      userData,
      debts,
    };
  },
});
</script>

<template>
  <v-row>
    <v-card elevation="0" rounded="md" class="bg-lightprimary border-0 mb-8">
      <v-card-item class="pt-3 pb-0">
        <v-row>
          <v-col cols="12" sm="6" class="pt-sm-10 pt-5">
            <div class="d-flex align-center">
              <v-avatar size="40"
                ><img
                  src="@/assets/images/profile/user-1.jpg"
                  height="40"
                  alt="icon"
              /></v-avatar>

              <h5 class="text-h5 ml-4">
                Olá {{ userData?.nickname }},
                {{
                  debts.count > 0
                    ? `encontramos algumas pendências`
                    : `você não possui pendências em aberto`
                }}
              </h5>
            </div>

            <div class="mt-8">
              <div class="d-flex">
                <div>
                  <div class="d-flex">
                    <h2 class="text-h2 textPrimary">
                      {{ debts.count }}
                    </h2>
                  </div>

                  <div class="text-subtitle-1 textPrimary mt-1">
                    Mensalidades
                  </div>
                </div>

                <v-divider vertical class="mx-5"></v-divider>

                <div>
                  <div class="d-flex">
                    <h2 class="text-h2 textPrimary">R${{ debts.sumAmount }}</h2>
                  </div>
                  <div class="text-subtitle-1 textPrimary mt-1">Em dívidas</div>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" sm="6" class="text-sm-right pb-0">
            <div class="mb-n2">
              <img
                src="@/assets/images/backgrounds/welcome-bg.svg"
                class=""
                alt="image"
                width="340"
              />
            </div>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </v-row>
</template>
