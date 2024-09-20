<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useAccountData } from "@/stores/accountStore";
import AvatarForm from "./forms/AvatarForm.vue";
import AccountForm from "./forms/AccountForm.vue";
import VolunteerForm from "./forms/VolunteerForm.vue";

export default defineComponent({
  name: 'AccountTabs',
  components: {
    AvatarForm,
    AccountForm,
    VolunteerForm
  },

  setup() {
    const tab = ref("1");
    const store = useAccountData();
    
    const changeTab = () => {
        if(tab.value === "1") tab.value = "2";
        else tab.value = "1"
    }

    const isVolunteersDisabled = computed(() => !store.account?.photo);

    return {
      tab,
      changeTab,
      isVolunteersDisabled
    };
  }
})

</script>

<template>
    <v-card elevation="0">
        <v-tabs v-model="tab">
            <v-tab value="1">
                <UserCircleIcon stroke-width="1.5" width="20" />
                <span class="ml-2">Conta</span>
            </v-tab>
            <v-tab value="2" class="flex-row">
                <AlertCircleIcon stroke-width="1.5" width="20" />
                <span class="ml-2">Voluntário</span>
            </v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <v-card-text class="bg-grey100 rounded-md" style="padding: 0">
            <v-window v-model="tab">
                <v-window-item value="1">
                    <v-card elevation="0" >
                        <v-row class="pa-sm-6 pa-3 pb-sm-6 pb-6 justify-center">
                            <v-col cols="12" sm="6">
                                <v-card elevation="10">
                                    <AvatarForm />
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-card elevation="10">
                                    <AccountForm />
                                </v-card>
                            </v-col>
                        </v-row>
                        <div class="d-flex justify-end pb-5 pr-5">
                            <v-btn size="large" color="primary" class="mr-4" flat @click="changeTab" :disabled="isVolunteersDisabled">Continuar</v-btn>
                        </div>
                    </v-card>
                </v-window-item>
                <v-window-item value="2">
                    <VolunteerForm :changeTab="changeTab" />
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>
