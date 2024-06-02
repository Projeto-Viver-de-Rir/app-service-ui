<script lang="ts">
import { ref,defineComponent,onMounted,computed } from 'vue';
import type {ComputedRef, Ref} from 'vue'
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import {useRoute, useRouter} from 'vue-router'

import { useDebts } from '../../stores/debtStore'
import type { storeToRefs } from 'pinia';



interface SetupData {
    debt: ComputedRef
    isLoading: ComputedRef<boolean>
}

export default defineComponent({
    name: 'debtEdit',
    components: {
        BaseBreadcrumb,
        UiParentCard
    },
    setup(): SetupData {
        const page = ref({ title: 'Mensalidade' });
        const breadcrumbs = ref([
            {
                text: 'Dashboard',
                disabled: false,
                href: '/'
            },
            {
                text: 'Mensalidade',
                disabled: false,
                href: '/Mensalidade'
            },
            {
                text: 'Editar',
                disabled: true,
                href: '#'
            }
        ]);
        const route = useRoute()
        const router = useRouter()
        const store = useDebts()    
        
        onMounted(async () => {
            await store.getById(route.params['id']);
        });
        const debt = computed(() => store.getDebt);
        const isLoading = computed(() => store.isLoading);

        const cancel = (): void => {
            router.push({ path: '/Mensalidades', replace: true });
        }
        const save = async ()  => {
            await store.save();
            router.push({ path: '/Mensalidades', replace: true });
        }

        const format = (date) => {
            const day = date.getDate();
            const month = (date.getMonth() + 1).toString().padStart(2, "0")
            const year = date.getFullYear();

            return day+'/'+month+'/'+year;
        }

        return {
            debt,
            isLoading,
            breadcrumbs,
            page,
            cancel,
            save,
            format
        }
    }
})

</script>

<template>
    <div v-if="isLoading" class="loading"></div>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <UiParentCard v-if="!isLoading && debt !== null">
        <v-row>
            <v-col cols="12" md="12" style="text-align: right;">
                <v-btn style="margin-right:5px" size="large" @click="cancel()" color="light" type="submit">Cancelar</v-btn>
                <v-btn style="margin-right:5px" size="large" @click="save()" color="success" type="submit">Salvar</v-btn>
            </v-col>
        </v-row> 
        <v-row>
        <v-col cols="12" md="6">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Voluntário:</v-label>
            <v-text-field v-model="debt.volunteerId" :disabled="true"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Competência:</v-label>
            <v-text-field v-model="debt.name"></v-text-field>
        </v-col>
         <v-col cols="12" md="6">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Descrição:</v-label>
            <v-text-field v-model="debt.description"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Valor:</v-label>
            <v-text-field v-model="debt.amount" type="number" ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Data de Vencimento:</v-label>
            <VueDatePicker v-model="debt.dueDate" :format="format" auto-apply :enableTimePicker="false" locale="pt-BR" />
        </v-col>
        <v-col cols="12" md="6">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Data de Pagamento:</v-label>
            <VueDatePicker v-model="debt.paidAt" :format="format" auto-apply :enableTimePicker="false" locale="pt-BR" />
        </v-col>
    </v-row>
    </UiParentCard>
</template>
