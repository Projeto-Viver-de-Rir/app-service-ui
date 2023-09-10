 <script lang="ts">
import { ref,defineComponent,onMounted,computed } from 'vue';

import type {ComputedRef, Ref } from 'vue'
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import {useRoute, useRouter} from 'vue-router'
import { useEvents } from '../../stores/eventStore'

interface SetupData {
    event: ComputedRef
    places: ComputedRef
    isLoading: ComputedRef<boolean>
    isEditing: ComputedRef<boolean>
    numberConfirmed : ComputedRef,
    isOtherSelecteced: ComputedRef,
    showModel: ComputedRef<boolean>,
    confirmLabel: ComputedRef<string>,
    isTimeEnded : ComputedRef<boolean>,
}

export default defineComponent({
    name: 'EventDetail',
    components: {
        BaseBreadcrumb,
        UiParentCard
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
                disabled: false,
                href: '/Eventos'
            },
            {
                text: 'Detalhes',
                disabled: true,
                href: '#'
            }
        ]);
        const route = useRoute()
        const router = useRouter()
        const store = useEvents()    

        if(route.fullPath.includes("Detalhes"))
        onMounted(async () => {      
            await store.getById(Number(route.params['id']));
        });
        else store.CreateNewEvent();
        
        
        const edit = (): void => {
            store.edit()
        }

        const cancel = (): void => {
            store.cancel()
        }

        const save = (): void => {
            store.save()
            router.push({ path: '/Eventos', replace: true });
        }

        const changeName = (option: any): void => {
            store.selectOther(option === "Outros")
        }

        const confirmModal = (): void => {
            store.openModal(true);
        }

        const closeModal = (): void => {
            store.openModal(false);
        }

        const confirmVacancy = (): void => {
            store.confirmVacancy();
            router.push({ path: '/Eventos', replace: true });
        }

        const event = computed(() => store.getEvent);
        const isLoading = computed(() => store.isLoading);
        const isEditing = computed(() => store.isEditing);
        const places = computed(() => store.getPlaces);
        const numberConfirmed = computed(() => store.getNumberConfirmed);
        const isOtherSelecteced = computed(() => store.isOtherSelecteced);
        const showModel = computed(() => store.showModel)
        const confirmLabel = computed(() => store.confirmLabel)
        const isTimeEnded = computed(() => store.isTimeEnded)
        

        return {
            event,
            isLoading,
            isEditing,
            breadcrumbs,
            page,
            places,
            numberConfirmed,
            edit,
            cancel,
            isOtherSelecteced,
            changeName,
            save,
            showModel,
            confirmModal,
            isTimeEnded,
            confirmLabel,
            closeModal,
            confirmVacancy
        }
    }
})

</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <UiParentCard v-if="!isLoading && event !== null">
        <v-row  v-if="!isEditing">
            <v-col cols="12" md="12" style="text-align: right;">
                                <v-btn style="margin-right:10px" size="large" @click="edit()" color="primary" type="submit">Editar</v-btn>

                                <router-link tag="v-btn" v-if="event !== null"
                                    class="btn btn-secondary mr-2"
                                    
                                    :to="{name: 'ManageVolunteers', params: { id: event.id || 0 }}"
                                >
                                    <v-btn size="large" color="warning" type="submit">Gerenciar voluntários</v-btn>
                                </router-link>

                                                                <router-link tag="v-btn" v-if="event !== null"
                                    class="btn btn-success mr-2"
                                    
                                    :to="{name: 'FinishVisit', params: { id: event.id || 0 }}"
                                >
                                    <v-btn size="large" color="success" type="submit">Realizado</v-btn>
                                </router-link>
            </v-col>

        </v-row> 

        <v-row  v-if="isEditing">
            <v-col cols="12" md="12" style="text-align: right;">
                <v-btn style="margin-right:5px" size="large" @click="cancel()" color="light" type="submit">Cancelar</v-btn>
                <v-btn style="margin-right:5px" size="large" @click="save()" color="success" type="submit">Salvar</v-btn>

            </v-col>

        </v-row> 
        <v-row>
            <v-col cols="12" md="6" v-if="!isOtherSelecteced">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Nome:</v-label>
                <v-select
                    v-model="event.name"
                    :items="places"
                    label="Selecione o local"
                    :disabled="!isEditing"
                    @update:modelValue="changeName"
                    ></v-select>
            </v-col>
            <v-col cols="12" md="6" v-if="isOtherSelecteced">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Nome:</v-label>
                <v-text-field v-model="event.name" :disabled="!isEditing"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Ponto de Encontro:</v-label>
                <v-text-field v-model="event.meeting_point" :disabled="!isEditing"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Data:</v-label>
                <v-text-field v-model="event.date" v-maska="'##/##/####'" return-masked-value :disabled="!isEditing"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Horário de Início:</v-label>
                <v-text-field v-model="event.time" v-maska="'##:##'" return-masked-value :disabled="!isEditing"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Vagas:</v-label>
                <v-text-field v-model="event.occupancy" type="number" :disabled="!isEditing"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="8">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Endereço:</v-label>
                <v-text-field v-model="event.address" :disabled="!isEditing"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Cidade:</v-label>
                <v-text-field v-model="event.city" :disabled="!isEditing"></v-text-field>
            </v-col>
        </v-row>
         <v-row>
            <v-col cols="12" md="12">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Informação:</v-label>
                <v-text-field v-model="event.description" :disabled="!isEditing"></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex;
  align-items: center;
  justify-content: center;">
<h1 style="margin-bottom:15px" >Confirmados ({{numberConfirmed}}/ {{event.occupancy}})</h1>
<v-btn size="large" color="success" v-if="numberConfirmed < event.occupancy" @click="confirmModal()"  style="margin-bottom: 5px; margin-left:15px" type="submit">Participar</v-btn>
</v-row>
<hr class="rounded">
<v-row >
      <v-col cols="12" md="4" v-for="item in event.volunteers" :key="item.id">
           <v-avatar size="50" v-if="(!item.photo.includes('jpg') || !item.photo.includes('png'))">
                <img  src="@/assets/images/palhaco.png" alt="user" height="50" />
            </v-avatar>
           <v-avatar size="50" v-if="(item.photo.includes('.jpg') || item.photo.includes('.png'))">
                <img :src="item.photo"  height="50" />
            </v-avatar>

          <v-label class="text-subtitle-1 font-weight-semibold text-lightText" style="margin-left:15px">{{item.name}}</v-label>
      </v-col>
</v-row>
    </UiParentCard>


<v-dialog
      v-model="showModel"
      width="450"
    > 
    <UiParentCard title="Confirmação de presença">
    <v-row>
        <v-col cols="12" md="12">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Local:</v-label>
            <h1>{{event.name}}</h1>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Data:</v-label>
            <h1>{{event.date}}</h1>
        </v-col>
    </v-row>
        <v-row>
        <v-col cols="12" md="12">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Hora:</v-label>
            <h1>{{event.time}}</h1>
        </v-col>
    </v-row>
    <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Você tem certeza que irá comparecer?</v-label>
    
    <v-row>
        <v-col cols="12" md="12" style="text-align: right;">
            <v-btn style="margin-right:5px" size="large" @click="closeModal()" color="light" type="submit">Cancelar</v-btn>
            <v-btn style="margin-right:5px" size="large" @click="confirmVacancy()" :disabled="!isTimeEnded" color="success" type="submit">{{confirmLabel}}</v-btn>
        </v-col>
    </v-row> 
    </UiParentCard>
    </v-dialog>
    
</template>