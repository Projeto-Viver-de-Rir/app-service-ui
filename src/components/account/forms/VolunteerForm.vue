<script setup lang="ts">
import {  computed, reactive, ref } from 'vue';
import { useAccountData } from "@/stores/accountStore";
import { Form } from "vee-validate";
import { router } from '@/router';

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

const props = defineProps<{
    changeTab: Function,
}>()

const store = useAccountData();
const formData = reactive<VolunteerData>({
        name: store.account?.volunteer?.name || "",
        nickname: store.account?.volunteer?.nickname || "", 
        address: store.account?.volunteer?.address || "",
        city: store.account?.volunteer?.city || "", 
        state: store.account?.volunteer?.state || "",
        zip: store.account?.volunteer?.zip || "", 
        country: store.account?.volunteer?.country || "",
        birthDate: store.account?.volunteer?.birthDate, 
        availability: store.account?.volunteer?.availability || "",
        identifier: store.account?.volunteer?.address || "",
    });

const availability = computed({
  // getter
  get() {
    return formData.availability ? formData.availability.split(',') : [];
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    formData.availability = newValue.toString();
  }
});

const required =  (v: any) => {
    return !!v || 'Campo obrigatório';
};

const cpfRules = ref([
  (v: string) => !!v || "CPF é obrigatório",
  (v: string) => /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/.test(v) || "Insira um CPF válido",
]);

const zipRules = ref([
  (v: string) => !!v || "CEP é obrigatório",
  (v: string) => /[0-9]{2}\.?[0-9]{3}\-?[0-9]{3}$/.test(v) || "Insira um CEP válido",
]);

const format = (date:Date) => {
    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return day + "/" + month + "/" + year;
};

const weekDays = [
    {
        key: 'Domingo',
        value: '0'
    },
    {
        key: 'Segunda',
        value: '1'
    },
    {
        key: 'Terça',
        value: '2'
    },
    {
        key: 'Quarta',
        value: '3'
    },
    {
        key: 'Quinta',
        value: '4'
    },
    {
        key: 'Sexta',
        value: '5'
    },
    {
        key: 'Sábado',
        value: '6'
    },
]

const dateIsValid = ref(true);

const validateDate = () => {
    dateIsValid.value = !!formData.birthDate;
}

const submit = async (values: any, { setErrors }: any) => {
    const response = await store.setEnroll(formData);

    if(response?.errors) {
        setErrors({ apiError: [response.errors]});
        return;
    }    
    router.push({ path: "/dashboard", replace: true });
}

</script>

<template>
    <v-card elevation="0">
        <Form @submit="submit" v-slot="{ errors, isSubmitting }">
            <v-row class="pa-sm-6 pa-3 pb-sm-6 pb-6 justify-center">
                <v-col cols="12" md="9">
                    <v-card elevation="10">
                        <v-card-item>
                            <h5 class="text-h5">Dados pessoais</h5>
                            <div class="text-subtitle-1 text-medium-emphasis mt-2">Para alterar seus dados pessoais, altere e salve seus dados aqui.</div>
                            <div class="mt-5">
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium">Nome:</v-label>
                                        <VTextField
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="formData.name"
                                            :rules="[required]"
                                        />
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-label class="mb-2 font-weight-medium">Nome de Palhaço:</v-label>
                                        <VTextField
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="formData.nickname"
                                            :rules="[required]"
                                        />
                                    </v-col>
                                    <v-col cols="12" md="3">        
                                        <v-label class="mb-2 font-weight-medium">CPF:</v-label>
                                        <VTextField
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="formData.identifier"
                                            :rules="cpfRules"
                                            v-maska="'###.###.###-##'"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="3" class="v-input-datepicker-custom" :class="{ 'v-input--error': !dateIsValid}">
                                        <v-label class="mb-2 font-weight-medium">Data de Nascimento:</v-label>
                                        <VueDatePicker
                                            v-model="formData.birthDate"
                                            required
                                            auto-apply
                                            :teleport="true"
                                            :format="format"
                                            :enableTimePicker="false"
                                            @closed="validateDate"
                                            @cleared="validateDate"
                                            :rules="[required]"
                                        />
                                        <div class="v-input__details">
                                            <span class="v-messages v-messages__message" v-if="!dateIsValid">Campo obrigatório</span>
                                         </div>                                       
                                    </v-col>
                                    <v-col cols="12" md="3">        
                                        <v-label class="mb-2 font-weight-medium">CEP:</v-label>
                                        <VTextField
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="formData.zip"
                                            :rules="zipRules"
                                            v-maska="'##.###-###'"
                                        />
                                    </v-col>
                                    <v-col cols="12" md="6">        
                                        <v-label class="mb-2 font-weight-medium">Endereço:</v-label>
                                        <VTextField
                                            color="primary"
                                            variant="outlined"
                                            type="email"
                                            v-model="formData.address"
                                            :rules="[required]"
                                        ></VTextField>
                                    </v-col>
                                    <v-col cols="12" md="4">        
                                        <v-label class="mb-2 font-weight-medium">Cidade:</v-label>
                                        <VTextField
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="formData.city"
                                            :rules="[required]"
                                        ></VTextField>
                                    </v-col>
                                    <v-col cols="12" md="4">        
                                        <v-label class="mb-2 font-weight-medium">Estado:</v-label>
                                        <VTextField
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="formData.state"
                                            :rules="[required]"
                                        ></VTextField>
                                    </v-col>
                                    <v-col cols="12" md="4">        
                                        <v-label class="mb-2 font-weight-medium">País:</v-label>
                                        <VTextField
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="formData.country"
                                            :rules="[required]"
                                        ></VTextField>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12"><span class="v-label mb-2 font-weight-medium">Disponibilidade:</span></v-col>
                                    <v-col v-for="day in weekDays" :key="day.key" cols="4" md="auto">
                                        <v-checkbox
                                            v-model="availability"
                                            :label="day.key"
                                            :value="day.value"
                                            ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card-item>
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
                    @click="props.changeTab">Voltar</v-btn>
                <v-btn 
                    size="large" 
                    color="primary" 
                    class="mr-4" 
                    type="submit" flat
                    :loading="isSubmitting">Concluir</v-btn>
            </div>
        </Form>
    </v-card>
</template>

<style>
.dp__input {
    height: 45px;
    border-radius: 7px;
}
.v-input-datepicker-custom .v-input__details {
    padding-inline: 16px;
}

.v-input-datepicker-custom.v-input--error .dp__input {
    border-color: rgb(var(--v-theme-error))
}
</style>