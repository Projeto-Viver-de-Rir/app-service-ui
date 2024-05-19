<script lang="ts">
import { ref,defineComponent,onMounted,computed } from 'vue';
import type {ComputedRef, Ref} from 'vue'
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import absencesCards from '@/components/widgets/cards/absencesCards.vue'
import presenceCards from '@/components/widgets/cards/presenceCards.vue'
import {useRoute, useRouter} from 'vue-router'

import { useVolunteers } from '../../stores/volunteerStore'



interface SetupData {
    user: ComputedRef
    isLoading: ComputedRef<boolean>
    isEditing: ComputedRef<boolean>
}

export default defineComponent({
    name: 'volunteerDetail',
    components: {
        BaseBreadcrumb,
        UiParentCard,
        absencesCards,
        presenceCards,
    },
    setup(): SetupData {
        const page = ref({ title: 'Voluntários' });
        const breadcrumbs = ref([
            {
                text: 'Dashboard',
                disabled: false,
                href: '/'
            },
            {
                text: 'Voluntários',
                disabled: false,
                href: '/Voluntarios'
            },
            {
                text: 'Detalhes',
                disabled: true,
                href: '#'
            }
        ]);
        const route = useRoute()
        const router = useRouter()
        const store = useVolunteers()    
        
        onMounted(async () => {
            await store.getById(route.params['id']);
        });
        const user = computed(() => store.getUser);
        const isLoading = computed(() => store.isLoading);
        const isEditing = computed(() => store.isLoading); 
        const segundaChecked = computed(() => store.availability.includes("1"));
        const tercaChecked = computed(() => store.availability.includes("2"));
        const quartaChecked = computed(() => store.availability.includes("3"));
        const quintaChecked = computed(() => store.availability.includes("4"));
        const sextaChecked = computed(() => store.availability.includes("5"));
        const sabadoChecked = computed(() => store.availability.includes("6"));
        const domingoChecked = computed(() => store.availability.includes("0"));
        const indefinidoChecked = computed(() => store.availability === "");
        return {
            user,
            isLoading,
            isEditing,
            breadcrumbs,
            page,
            segundaChecked,
            tercaChecked,
            quartaChecked,
            quintaChecked,
            sextaChecked,
            sabadoChecked,
            domingoChecked,
            indefinidoChecked
        }
    }
})

</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="6" md="4" >
            <presenceCards :current="user.actualMonthAttendances || 0" :history="user.lastMonthAttendances || 0"></presenceCards>
        </v-col>
        <v-col cols="6" md="4" style="padding-left: 5px">
            <absencesCards :current="user.actualMonthAbsences || 0" :history="user.lastMonthAbsences || 0"></absencesCards>
        </v-col>
    </v-row>
    <v-row>
    <UiParentCard v-if="!isLoading && user !== null"> 
    <v-row>
    <v-col cols="0" md="2">
            <v-avatar size="150">
                <img src="@/assets/images/profile/user-1.jpg" alt="user" height="150" />
            </v-avatar>
        </v-col>
    <v-col cols="12" md="10"> 
    <v-row>
        <v-col cols="12" md="4">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Nome:</v-label>
            <v-text-field v-model="user.name" :disabled="!isEditing"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Apelido:</v-label>
            <v-text-field v-model="user.nickname" :disabled="!isEditing"></v-text-field>
        </v-col>
         <v-col cols="12" md="4">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Celular:</v-label>
            <v-text-field v-model="user.phone" :disabled="!isEditing"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="4">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">CPF:</v-label>
            <v-text-field v-model="user.identifier" :disabled="!isEditing"></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Email:</v-label>
            <v-text-field v-model="user.email" :disabled="!isEditing"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="4">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">CEP:</v-label>
            <v-text-field v-model="user.zip" :disabled="!isEditing"></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Endereço:</v-label>
            <v-text-field v-model="user.address" :disabled="!isEditing"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="4">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Bairro:</v-label>
            <v-text-field v-model="user.state" :disabled="!isEditing"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Cidade:</v-label>
            <v-text-field v-model="user.city" :disabled="!isEditing"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Data de Nascimento:</v-label>
            <v-text-field v-model="user.birth_date" :disabled="!isEditing"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="4">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Status:</v-label>
            <v-text-field v-model="user.status" :disabled="!isEditing"></v-text-field>
        </v-col>
    </v-row>
    </v-col>
</v-row>
<v-row style="display: flex;
  align-items: center;
  justify-content: center;">
<h1 style="margin-bottom:15px" >Disponibilidade</h1>

</v-row>
<hr class="rounded">
<v-row>
    <v-col cols="2" md="2">

    </v-col>
    <v-col cols="1" md="1">
        <h2>Seg</h2>
    </v-col>
        <v-col cols="1" md="1">
        <h2>Ter</h2>
    </v-col>
        <v-col cols="1" md="1">
        <h2>Qua</h2>
    </v-col>
        <v-col cols="1" md="1">
        <h2>Qui</h2>
    </v-col>
        <v-col cols="1" md="1">
        <h2>Sex</h2>
    </v-col>
        <v-col cols="1" md="1">
        <h2>Sab</h2>
    </v-col>
        <v-col cols="1" md="1">
        <h2>Dom</h2>
    </v-col>
    <v-col cols="2" md="2">
        <h2>Indefinido</h2>
    </v-col>
</v-row>
<v-row>
    <v-col cols="2" md="2">

    </v-col>
    <v-col cols="1" md="1">
        <input type="checkbox" id="checkbox" style="transform:scale(1.8, 1.8); margin-left:10px" :disabled="true" v-model="segundaChecked" />   
    </v-col>
        <v-col cols="1" md="1">
        <input type="checkbox" id="checkbox" style="transform:scale(1.8, 1.8); margin-left:10px" :disabled="true" v-model="tercaChecked" /> 
    </v-col>
        <v-col cols="1" md="1">
        <input type="checkbox" id="checkbox" style="transform:scale(1.8, 1.8); margin-left:10px" :disabled="true" v-model="quartaChecked" /> 
    </v-col>
        <v-col cols="1" md="1">
        <input type="checkbox" id="checkbox" style="transform:scale(1.8, 1.8); margin-left:10px" :disabled="true" v-model="quintaChecked" /> 
    </v-col>
        <v-col cols="1" md="1">
        <input type="checkbox" id="checkbox" style="transform:scale(1.8, 1.8); margin-left:10px" :disabled="true" v-model="sextaChecked" /> 
    </v-col>
        <v-col cols="1" md="1">
        <input type="checkbox" id="checkbox" style="transform:scale(1.8, 1.8); margin-left:10px" :disabled="true" v-model="sabadoChecked" /> 
    </v-col>
        <v-col cols="1" md="1">
        <input type="checkbox" id="checkbox" style="transform:scale(1.8, 1.8); margin-left:10px" :disabled="true" v-model="domingoChecked" /> 
    </v-col>
    <v-col cols="2" md="2">
        <input type="checkbox" id="checkbox" style="transform:scale(1.8, 1.8); margin-left:10px" :disabled="true" v-model="indefinidoChecked" /> 
    </v-col>
</v-row>
    </UiParentCard>
</v-row>
</template>
