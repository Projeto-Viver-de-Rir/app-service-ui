<script lang="ts">
import type {ComputedRef, Ref} from 'vue'
import {defineComponent, computed, onMounted} from 'vue'

import { useEvents } from '../../stores/eventStore'
import type { event } from '../../entities/event'



interface SetupData {
    events: ComputedRef
}

const store = useEvents()

export default defineComponent({
    name: 'EventTable',
    setup(): SetupData {      
        onMounted(async () => {
            await store.getData();
        });

       const events = computed(() => store.getList)
       
        return {
            events
        }
}});

</script>
<template>
    <v-card class="border" elevation="0">
        <v-table class="month-table">
            <thead>
                <tr>
                    <th class="text-h6">Nome</th>
                    <th class="text-h6">Quando</th>
                    <th class="text-h6"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in events" :key="item.id" class="month-item">
                    <td>
                        <div class="d-flex align-left">
                              <div>
                                <h6 class="text-h6">{{ item.name }}</h6>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="d-left">
                              <div>
                                <h6 class="text-h6">{{ new Date(item.happenAt).toLocaleDateString() + " " + new Date(item.happenAt).getHours() + ":"+ new Date(item.happenAt).getMinutes() }}</h6>
                            </div>
                        </div>
                    </td>
<td>
                        <div class="d-flex align-right">
                            <div class="ml-4" style="width: 100px;">
                                <router-link tag="v-btn"
                                    class="btn btn-primary mr-2"
                                    
                                    :to="{name: 'DetailtEvent', params: { id: item.id }}"
                                >
                                    <v-btn size="small" color="primary" type="submit">Detalhes</v-btn>
                                </router-link>                                
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>
