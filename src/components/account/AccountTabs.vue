<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { UserCircleIcon, AlertCircleIcon } from "vue-tabler-icons";
import { useAccountData } from "@/stores/accountStore";
import AvatarForm from "./forms/AvatarForm.vue";
import AccountForm from "./forms/AccountForm.vue";
import VolunteerForm from "./forms/VolunteerForm.vue";
import { type account, type accountEnroll } from "@/entities/account";
import { router } from "@/router";
import { Form } from "vee-validate";

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
    VolunteerForm,
    Form
  },

  setup() {
    const tab = ref("1");
    const store = useAccountData();
    const form = ref(false);  
    
    const account = computed(() => store.account);

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

    const submit = async (values: any, { setErrors }: any) => {
      
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

        await store.setEnroll(user).then((response) => {
            if (!response || response?.status !== 200) {
                console.log('response', response);
                const errors = response?.response?.data || "Ocorreu um erro geral.";
                setErrors({ apiError: [errors]});

                return;
            }
                
            const userDataUpdated: account = {
                ...basicData,
                id: response.data?.id,
                volunteer: response.data
            };

            store.updateUserData(userDataUpdated);            
            router.push({ path: "/dashboard", replace: true });
        })
        .catch((error) => {
            setErrors({ apiError: error });
        });
        
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
                <span class="ml-2">Conta</span>
            </v-tab>
            <v-tab value="2" class="flex-row">
                <AlertCircleIcon stroke-width="1.5" width="20" />
                <span class="ml-2">Voluntário</span>
            </v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <v-card-text class="bg-grey100 rounded-md" style="padding: 0">
            <Form @submit="submit" v-slot="{ errors, isSubmitting }">
                <v-window v-model="tab">
                    <v-window-item value="1">
                        <v-card elevation="0" >
                            <v-row class="pa-sm-6 pa-3 pb-sm-6 pb-6 justify-center">
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
                            <div class="d-flex justify-end pb-5 pr-5">
                                <v-btn size="large" color="primary" class="mr-4" flat @click="changeTab" :disabled="isVolunteersDisabled">Continuar</v-btn>
                            </div>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="2">
                        <v-card elevation="0">
                            <v-row class="pa-sm-6 pa-3 pb-sm-6 pb-6 justify-center">
                                <v-col cols="12" md="9">
                                    <v-card elevation="10">
                                        <VolunteerForm :volunteer="volunteerData" />
                                    </v-card>
                                    <div v-if="errors.apiError" class="mt-5">
                                        <v-alert color="error">
                                            Não foi possível completar seu cadastro. Motivo(s):
                                            <p class="pl-5" v-if="Array.isArray(errors.apiError)" v-for="(err, i) in errors.apiError" :key="i">{{ err.errorMessage }}</p>
                                            <p class="pl-5" v-else>{{ errors.apiError }}</p>
                                        </v-alert>
                                    </div>
                                </v-col>
                            </v-row>
                            <div class="d-flex justify-end pb-5 pr-5">
                                <v-btn 
                                    size="large" 
                                    color="alert"
                                    variant="outlined" 
                                    class="mr-4" 
                                    flat
                                    @click="changeTab">Voltar</v-btn>
                                <v-btn 
                                    size="large" 
                                    color="primary" 
                                    class="mr-4" 
                                    type="submit" flat
                                    :loading="isSubmitting">Concluir</v-btn>
                            </div>
                        </v-card>
                    </v-window-item>
                </v-window>
            </Form>
        </v-card-text>
    </v-card>
</template>
