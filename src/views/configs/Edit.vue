<script lang="ts">
import type { storeToRefs } from 'pinia';
import type { ComputedRef, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref, defineComponent, onMounted, computed } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

import { useConfigs } from '../../stores/configStore'

interface SetupData {
    config: ComputedRef
    isLoading: ComputedRef<boolean>
}

export default defineComponent({
    name: 'configEdit',
    components: {
        BaseBreadcrumb,
        UiParentCard
    },
    setup(): SetupData {
        const page = ref({ title: 'Configurações' });
        const breadcrumbs = ref([
            {
                text: 'Dashboard',
                disabled: false,
                href: '/'
            },
            {
                text: 'Configurações',
                disabled: false,
                href: '/teams'
            },
            {
                text: 'Editar',
                disabled: true,
                href: '#'
            }
        ]);
        const route = useRoute();
        const router = useRouter();
        const store = useConfigs();
        
        onMounted(async () => {
            await store.retrieveItem(route.params['id']);
        });

        const config = computed(() => store.retrieveItem);
        const isLoading = computed(() => store.isLoading);

        const cancel = (): void => {
            router.push({ path: '/configs', replace: true });
        }

        const save = async ()  => {
            await store.save();
            router.push({ path: '/configs', replace: true });
        }

        return {
            config,
            isLoading,
            breadcrumbs,
            page,
            cancel,
            save
        }
    }
})

</script>

<template>
    <div v-if="isLoading" class="loading"></div>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <UiParentCard v-if="!isLoading && config !== null">
        <v-row>
            <v-col cols="12" md="12" style="text-align: right;">
                <v-btn style="margin-right:5px" size="large" @click="cancel()" color="light" type="submit">Cancelar</v-btn>
                <v-btn style="margin-right:5px" size="large" @click="save()" color="success" type="submit">Salvar</v-btn>
            </v-col>
        </v-row> 
        <v-row>
        <v-col cols="12" md="6">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Tipo:</v-label>
            <v-text-field v-model="config.type"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Descrição</v-label>
            <v-text-field v-model="config.description"></v-text-field>
        </v-col>
         <v-col cols="12" md="12">
            <v-label class="text-subtitle-1 font-weight-semibold text-lightText">Valor:</v-label>
            <v-text-field v-model="config.value"></v-text-field>
        </v-col>
    </v-row>
    </UiParentCard>
</template>
