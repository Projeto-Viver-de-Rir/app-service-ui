 <script lang="ts">
import { ref,defineComponent,onMounted,computed } from 'vue';
import type {ComputedRef, Ref} from 'vue'
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import {useRoute, useRouter} from 'vue-router'
import { useEvents } from '../../stores/eventStore'



interface SetupData {
    event: ComputedRef
    places: ComputedRef
    isLoading: ComputedRef<boolean>
    isEditing: ComputedRef<boolean>
    numberConfirmed : ComputedRef
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
                text: 'Gerenciar voluntários',
                disabled: true,
                href: '#'
            }
        ]);
        const route = useRoute()
        const router = useRouter()
        const store = useEvents()    
        
        onMounted(async () => {
            await store.getById(Number(route.params['id']));
        });

        const edit = (): void => {
            store.edit()
        }

        const back = (): void => {
            history.back()            
        }

        const removeVolunteer = (volunteer: any): void => {
             store.removeVolunteer(volunteer);           
        }

        const finish = (): void => {
            store.finish();
            router.push({ path: '/Eventos', replace: true });
        }

        const changeVonlunteer = (id: number): void => {
             store.changeVonlunteer(id);           
        }
        const event = computed(() => store.getEvent);
        const isLoading = computed(() => store.isLoading);
        const isEditing = computed(() => store.isEditing);
        const places = computed(() => store.getPlaces);
        const numberConfirmed = computed(() => store.getNumberConfirmed);
        return {
            event,
            isLoading,
            isEditing,
            breadcrumbs,
            page,
            places,
            numberConfirmed,
            edit,
            back,
            removeVolunteer,
            finish,
            changeVonlunteer
        }
    }
})

</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <UiParentCard v-if="!isLoading">
        <v-row >
            <v-col cols="12" md="12" style="text-align: right;">
                <v-btn style="margin-right:5px" size="large" @click="back()" color="light" type="submit">Cancelar</v-btn>
                <v-btn style="margin-right:5px" size="large" @click="finish()" color="success" type="submit">Salvar</v-btn>
            </v-col>

        </v-row> 
        <v-row>
            <v-col cols="12" md="4">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Nome:</v-label>
                <v-text-field v-model="event.name" :disabled="true"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Data:</v-label>
                <v-text-field v-model="event.date" :disabled="!isEditing"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Horário de Início:</v-label>
                <v-text-field v-model="event.time" :disabled="!isEditing"></v-text-field>
            </v-col>
        </v-row>       
        <v-row style="display: flex;
  align-items: center;
  justify-content: center;">
<h1 style="margin-bottom:15px" >
Remova os candidatos que desmarcaram</h1>

</v-row>
<hr class="rounded">
<v-row  v-for="item in event.volunteers" :key="item.id">
      <v-col cols="12" md="1">
           <v-avatar size="50" v-if="(!item.photo.includes('jpg') || !item.photo.includes('png'))">
                <img  src="@/assets/images/palhaco.png" alt="user" height="50" />
            </v-avatar>
           <v-avatar size="50" v-if="(item.photo.includes('.jpg') || item.photo.includes('.png'))">
                <img :src="item.photo"  height="50" />
            </v-avatar>
      </v-col>
      <v-col cols="12" md="9">           
          <v-label class="text-subtitle-1 font-weight-semibold text-lightText" style="margin-top:15px">{{item.name}}</v-label>
      </v-col>
      <v-col cols="12" md="2">
          <v-switch color="primary" :model-value="true" @change="changeVonlunteer(item.id)" hide-details></v-switch>
      </v-col>
</v-row>
    </UiParentCard>
</template>