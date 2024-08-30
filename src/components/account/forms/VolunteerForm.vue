<script setup lang="ts">
import { accountVolunteer } from '@/entities/account';
import {  computed, reactive, ref } from 'vue';

const props = defineProps({
  volunteer: {
    type: Object as () => accountVolunteer,
    required: true
  },
});

const formData = reactive(props.volunteer || {});
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

</script>
<template>
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
                    <v-label class="mb-2 font-weight-medium">Apelido:</v-label>
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
                <v-col cols="12" md="3">        
                    <v-label class="mb-2 font-weight-medium">Data de Nascimento:</v-label>
                    <VueDatePicker
                        v-model="formData.birthDate"
                        :teleport="true"
                        :format="format"
                        :enableTimePicker="false"
                        :rules="[required]"
                    />
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
</template>