<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { UserCircleIcon, AlertCircleIcon } from "vue-tabler-icons";
import { useAccountData } from "@/stores/accountStore";
import AvatarForm from "./forms/AvatarForm.vue";
import AccountForm from "./forms/AccountForm.vue";
import VolunteerForm from "./forms/VolunteerForm.vue";
import { type accountEnroll } from "@/entities/account";

interface EssentialData {
  photo: string;
  email: string;
  phone: string
}

interface VolunteerData {
    name: string,
    nickname: string, 
    address: string,
    city: string, 
    state: string,
    zip: string, 
    country: string,
    birthDate?: Date, 
    availability: string,
    identifier: string,
}

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
    const form = ref(false);

    onMounted(async () => {
        await store.getAccountData();
    });    
    
    const account = computed(() => store.getAccount);

    const basicData = reactive<EssentialData>({
        photo: account.value?.photo || "",
        email: account.value?.email || "",
        phone: account.value?.phone || ""
    });

    const volunteerData = reactive<VolunteerData>({
        name: account.value?.volunteer?.name || "",
        nickname: account.value?.volunteer?.nickname || "", 
        address: account.value?.volunteer?.address || "",
        city: account.value?.volunteer?.city || "", 
        state: account.value?.volunteer?.state || "",
        zip: account.value?.volunteer?.zip || "", 
        country: account.value?.volunteer?.country || "",
        birthDate: account.value?.volunteer?.birthDate, 
        availability: account.value?.volunteer?.availability || "",
        identifier: account.value?.volunteer?.address || "",
    });

    const isEnroll = ref(store.isEnroll);
    const errors = ref([]);


    const submit = async () => {

        if (!form) return;

        const user : accountEnroll = {
            name: volunteerData.name || "",
            photo: basicData.photo || "",
            nickname: volunteerData.nickname || "",
            address: volunteerData.address || "",
            city: volunteerData.city || "",
            state: volunteerData.state || "",
            country: volunteerData.country || "",
            zip: volunteerData.zip || "",
            birthDate: new Date(volunteerData.birthDate || ""),
            identifier: volunteerData.identifier || "",
            availability: volunteerData.availability || "",
        };

        const response = await store.setEnroll(user);

        if (!response || response.status !== 200) {
            // get errors here
        }
    }

    const uploadPhoto = async (file: Blob) => {
        const response = await store.uploadPhoto(file);
        if (response?.data) {
            basicData.photo = response.data;
        }
    }

    const resetPhoto = () => {
       basicData.photo = "";
    }

    const changeTab = () => {
        if(tab.value === "1") tab.value = "2";
        else tab.value = "1"
    }

    const isVolunteersDisabled = computed(() => !basicData.photo);

    return {
      tab,
      basicData,
      volunteerData,
      form,
      changeTab,
      isEnroll,
      uploadPhoto,
      resetPhoto,
      submit,
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
                Conta
            </v-tab>
            <v-tab value="2" class="flex-row" >
                <AlertCircleIcon stroke-width="1.5" width="20" />
                Voluntário
            </v-tab>
        </v-tabs>
        <v-card-text class="bg-grey100 rounded-md" style="padding: 0">
            <v-form v-model="form" @submit.prevent="submit" validate-on="input">
                <v-window v-model="tab">
                    <v-window-item value="1">
                        <v-card elevation="10" >
                            <v-row class="ma-sm-n2 ma-n1">
                                <v-col cols="12" sm="6">
                                    <v-card elevation="10">
                                        <AvatarForm :uploadAvatar="uploadPhoto" :resetAvatar="resetPhoto"/>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-card elevation="10">
                                        <AccountForm :email="basicData?.email" :cellphone="basicData?.phone" :isEnroll="isEnroll" />
                                    </v-card>
                                </v-col>
                            </v-row>
                            <div class="d-flex justify-end mt-5">
                                <v-btn size="large" color="primary" class="mr-4" flat @click="changeTab" :disabled="isVolunteersDisabled">Continuar</v-btn>
                            </div>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="2">
                        <!-- <VolunteerTab :volunteer="volunteerData" :saveVolunteer="save" /> -->
                        <v-card elevation="10" >
                            <v-row class="ma-sm-n2 ma-n1">
                                <v-col cols="12">
                                    <v-card elevation="10">
                                        <VolunteerForm :volunteer="volunteerData" />
                                    </v-card>
                                </v-col>
                            </v-row>
                            <div class="d-flex justify-end mt-5">
                                <v-btn 
                                    size="large" 
                                    color="primary" 
                                    class="mr-4" 
                                    type="submit" flat 
                                    :disabled="!form">Salvar</v-btn>
                            </div>
                        </v-card>
                    </v-window-item>
                </v-window>
            </v-form>
        </v-card-text>
    </v-card>
</template>
