<script lang="ts">
import { ref,defineComponent,onMounted,computed } from 'vue';
import type {ComputedRef, Ref} from 'vue'

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import {useRoute, useRouter} from 'vue-router'

import { useVolunteers } from '../../stores/volunteerStore'



interface SetupData {
    filter: ComputedRef;
    getUsers: () => void;
}

export default defineComponent({
    name: 'FeesList',
    components: {
        BaseBreadcrumb,
        UiParentCard
    },
    setup(): SetupData {
        const page = ref({ title: 'Mensalidades' });
        const breadcrumbs = ref([
            {
                text: 'Dashboard',
                disabled: false,
                href: '/'
            },
            {
                text: 'Mensalidades',
                disabled: true,
                href: '#'
            }
        ]);
        const route = useRoute()
        const router = useRouter()
        const store = useVolunteers()        
        const filter = computed(() => store.filter);

        const getUsers = (): void => {
            store.filter()
        }

        return {
            filter,
            getUsers,
            page,
            breadcrumbs
        }
    }
})

</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Filtros">  
                <v-row>
                    <v-col cols="5" md="4">
                            <v-text-field v-maska="'###.###.###-##'" label="CPF" v-model="filter.name">
                                
                            </v-text-field>
                    </v-col>
                    <v-col cols="5" md="4">
                            <v-text-field label="Nome" v-model="filter.name">
                                
                            </v-text-field>
                    </v-col>
                    <v-col cols="5" md="2">
                            <v-text-field label="Email" v-model="filter.email">
                                
                            </v-text-field>
                    </v-col>
                    <v-col cols="2" md="2">
                        <v-btn size="large" @click="getUsers()" color="primary" type="submit">Filtrar</v-btn>
                    </v-col>
                </v-row>
            </UiParentCard>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12">

        </v-col>
    </v-row>
</template>
