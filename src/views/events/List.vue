<script lang="ts">
import { ref,defineComponent, computed } from 'vue';
import type {ComputedRef, Ref } from 'vue'

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import eventTable from '@/components/tables/eventsTable.vue';
import { useEvents } from '../../stores/eventStore'
import { eventFilter } from '../../entities/eventFilter'
import {useRoute, useRouter} from 'vue-router'



const page = ref({ title: 'Eventos' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Eventos',
        disabled: true,
        href: '#'
    }
]);

interface SetupData {
    filters: ComputedRef<eventFilter>;
    getEvents: () => void;
    showModel: ComputedRef<boolean>,
    showModelRemove: ComputedRef<boolean>,
    event: ComputedRef
    nextMonth: ComputedRef
}

export default defineComponent({
    name: 'EventList',
    components: {
        BaseBreadcrumb,
        UiParentCard,
        eventTable
    },
    setup(): SetupData {
        const page = ref({ title: 'Eventos' });
        const breadcrumbs = ref([
            {
                text: 'Dashboard',
                disabled: false,
                href: '/'
            },
            {
                text: 'Eventos',
                disabled: true,
                href: '#'
            }
        ]);
        const route = useRoute()
        const router = useRouter()
        const store = useEvents()        
        const getEvents = (): void => {
            store.filter()
        }
        
        const openModal = (): void => {
            store.openModal(true);
        }
        const closeModal = (): void => {
            store.openModal(false);
        }
        const runProcess = (): void => {
            store.runProcess();
        }
        const remove = async (event: event)  => {
            await store.remove(event);
        }

        const showModel = computed(() => store.showModel)
        const nextMonth = computed(() => store.nextMonth);
        const filters  = computed(() => store.filters);
        const event = computed(() => store.getEvent);
       const showModelRemove = computed(() => store.showModelRemove)
        return {
            filters,
            getEvents,
            page,
            breadcrumbs,
            nextMonth,
            openModal,
            showModel,
            closeModal,
            runProcess,
            event,
            showModelRemove,
            remove
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
                    <v-col cols="12" md="7">
                            <v-text-field label="Nome" v-model="filters.name">
                                
                            </v-text-field>
                    </v-col>
                     <v-col cols="2" md="5">
                        <v-btn size="large" @click="getEvents()" style="margin-right:15px" color="primary" type="submit">Filtrar</v-btn>
                        <v-btn size="large" @click="openModal()" style="margin-right:15px"  color="warning" type="submit">Gerar agenda</v-btn>
                        
                       <router-link tag="v-btn"
                                    class="btn btn-success mr-2"
                                    
                                    :to="{name: 'CreateEvent'}"
                                >
                                    <v-btn size="large" color="success" type="submit">Adicionar</v-btn>
                        </router-link>
                    </v-col>
                </v-row>
            </UiParentCard>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12">
            <eventTable></eventTable>
        </v-col>
    </v-row>

<v-dialog
      v-model="showModel"
      width="450"
    > 
    <UiParentCard title="Gerar agenda">
    <v-row>
        <v-col cols="12" md="12">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Gostaria de gerar os eventos referentes ao mes:</v-label>
            <h1>{{nextMonth}}</h1>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12">
    <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Você tem certeza que deseja executar essa operação?</v-label>
            </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12" style="text-align: right;">
            <v-btn style="margin-right:5px" size="large" @click="closeModal()" color="light" type="submit">Cancelar</v-btn>
            <v-btn style="margin-right:5px" size="large" @click="runProcess()" color="success" type="submit">Confirmar</v-btn>
        </v-col>
    </v-row> 
    </UiParentCard>
    </v-dialog>


    <v-dialog
      v-model="showModelRemove"
      width="450"
    > 
    <UiParentCard title="Excluir evento">
    <v-row>
        <v-col cols="12" md="12">
    <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Você tem certeza que deseja exlcuir esse evento?</v-label>
            </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Local:</v-label>
            <h1>{{event.name}}</h1>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12" style="text-align: right;">
            <v-btn style="margin-right:5px" size="large" @click="closeModal()" color="light" type="submit">Cancelar</v-btn>
            <v-btn style="margin-right:5px" size="large" @click="remove(event)" color="success" type="submit">Remover</v-btn>
        </v-col>
    </v-row> 
    </UiParentCard>
    </v-dialog>
</template>
