<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, type ComputedRef } from "vue";
import { UserCircleIcon, AlertCircleIcon } from "vue-tabler-icons";
import AccountTab from "./AccountTab.vue";
import VolunteerTab from "./VolunteerTab.vue";
import { useAccount } from "@/stores/accountStore";

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
    AccountTab,
    VolunteerTab
  },

  setup() {

    const tab = ref("1");
    const store = useAccount();

    onMounted(async () => {
        await store.getAccountData();
    })
    
    const account = ref(store.getAccount);
    // Define initial form data
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
        availability: account.value?.volunteer?.address || "",
        identifier: account.value?.volunteer?.address || "",
    });

    const save = async () => {
        console.log(volunteerData, 'account');
        console.log(basicData, 'account')
        // await store.save().then((res) => {
        //     console.log(res);

        //     if (res.status === 200)
        //         router.push({ path: "/dashboard", replace: true });
        // });
    };

    const uploadPhoto = async (file: Blob) => {
        const response = await store.uploadPhoto(file);

        if (response?.status === 200)
            basicData.photo = response.data;
    }

    const changeTab = () => {
        if(tab.value === "1") tab.value = "2";
        else tab.value = "1"
    }

    // Return the component's properties and methods
    return {
      tab,
      changeTab,
      uploadPhoto,
      volunteerData,
      basicData,
      save
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
            <v-tab value="2" class="flex-row">
                <AlertCircleIcon stroke-width="1.5" width="20" />
                Voluntário
            </v-tab>
        </v-tabs>
        <v-card-text class="bg-grey100 rounded-md mt-4">
            <v-window v-model="tab">
                <v-window-item value="1">
                    <AccountTab :tab="tab" :changeTab="changeTab" :uploadAvatar="uploadPhoto" :email="basicData?.email" :cellphone="basicData?.phone" />
                </v-window-item>
                <v-window-item value="2">
                    <VolunteerTab :volunteer="volunteerData" :saveVolunteer="save" />
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>
