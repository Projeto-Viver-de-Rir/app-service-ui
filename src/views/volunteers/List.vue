<script lang="ts">
import { ref,defineComponent,onMounted,computed } from 'vue';
import type {ComputedRef, Ref} from 'vue'

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import volunteersTable from '@/components/tables/volunteersTable.vue';
import {useRoute, useRouter} from 'vue-router'
import { useVolunteers } from '../../stores/volunteerStore'

interface SetupData {
    filters: ComputedRef;
    getUsers: () => void;
    isLoading: ComputedRef<bool>
}

export default defineComponent({
    name: 'volunteerList',
    components: {
        BaseBreadcrumb,
        UiParentCard,
        volunteersTable
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
                disabled: true,
                href: '#'
            }
        ]);
        const route = useRoute()
        const router = useRouter()
        const store = useVolunteers()
        const filters = computed(() => store.filters);
        const isLoading = computed(() => store.isLoading);
        const getUsers = (): void => {
            store.filter()
        }

        return {
            filters,
            getUsers,
            page,
            breadcrumbs,
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
                    <v-col cols="5" md="5">
                            <v-text-field label="Nome" v-model="filters.name">
                                
                            </v-text-field>
                    </v-col>
                    <v-col cols="5" md="5">
                            <v-text-field label="Nickname" v-model="filters.nickname">
                                
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
            <volunteersTable></volunteersTable>
        </v-col>
    </v-row>
</template>
