<script setup lang="ts">
import { accountVolunteer } from '@/entities/account';
import {  ref } from 'vue';

const props = defineProps({
  volunteer: accountVolunteer,
});

const name = ref(props.volunteer?.name || "");
const nickname = ref(props.volunteer?.nickname || "");
const identifier = ref(props.volunteer?.identifier || "");
const birthDate = ref(props.volunteer?.birthDate || "");
const address = ref(props.volunteer?.address || "");
const zip = ref(props.volunteer?.zip || "");
const city = ref(props.volunteer?.city || "");
const state = ref(props.volunteer?.state || "");
const country = ref(props.volunteer?.country || "");

const format = (date:Date) => {
    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return day + "/" + month + "/" + year;
};

</script>

<template>
    <v-card elevation="10" >
        <v-row class="ma-sm-n2 ma-n1">
            <v-col cols="12">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5">Dados pessoais</h5>
                        <div class="text-subtitle-1 text-medium-emphasis mt-2">Para alterar seus dados pessoais, altere e salve seus dados aqui.</div>
                        <div class="mt-5">
                            <v-row>
                                <v-col cols="12" md="6">
                                     <v-label class="mb-2 font-weight-medium">Nome:</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="name"
                                            hide-details
                                        />
                                </v-col>
                                <v-col cols="12" md="3">
                                     <v-label class="mb-2 font-weight-medium">Apelido:</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="nickname"
                                            hide-details
                                        />
                                </v-col>
                                <v-col cols="12" md="3">        
                                        <v-label class="mb-2 font-weight-medium">CPF:</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="identifier"
                                            hide-details
                                        />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="3">        
                                        <v-label class="mb-2 font-weight-medium">Data de Nascimento:</v-label>
                                        <VueDatePicker
                                            v-model="birthDate"
                                            :format="format"
                                            :enableTimePicker="false"
                                        />
                                </v-col>
                                <v-col cols="12" md="3">        
                                        <v-label class="mb-2 font-weight-medium">CEP:</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="zip"
                                            hide-details
                                        />
                                </v-col>
                                <v-col cols="12" md="6">        
                                        <v-label class="mb-2 font-weight-medium">Endereço:</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="email"
                                            v-model="address"
                                            hide-details
                                        ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">        
                                        <v-label class="mb-2 font-weight-medium">Cidade:</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="city"
                                            hide-details
                                        ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">        
                                        <v-label class="mb-2 font-weight-medium">Estado:</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="state"
                                            hide-details
                                        ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">        
                                        <v-label class="mb-2 font-weight-medium">País:</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="country"
                                            hide-details
                                        ></v-text-field>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <div class="d-flex justify-end mt-5">
            <v-btn size="large" color="primary" class="mr-4" flat>Salvar</v-btn>
            <v-btn size="large" class="bg-lighterror text-error"  flat>Cancelar</v-btn>
        </div>
    </v-card>
</template>


