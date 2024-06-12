import { fa } from 'vuetify/lib/locale/index.mjs'
import { container } from 'tsyringe'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

import type { config } from '../entities/config'
import { configFilter } from '../entities/configFilter'
import { configRepository } from '../repositories/configRepository'

interface configState {
    config: config | null,
    initialConfig: config | null,
    configs: config[],
    filters: configFilter,
    isEditing: boolean,
    isLoading: boolean,
    action: string,
    showModel : boolean
  }

  export const useConfigs = defineStore('config', () => {
    const state = reactive<configState>({
        config: null,
        initialConfig: null,
        configs: [],
        filters: new configFilter(""),
        isEditing: false,
        isLoading: false,
        action: 'D',
        showModel: false
    })

    const repository = container.resolve(configRepository);
    const filters = computed(() => state.filters) 
    const getList = computed(() => state.configs)
    const getItem = computed(() => state.config)
    const showModel = computed(() => state.showModel)    
    const isLoading = computed(() => state.isLoading)
    
    const searchWithFilters = async () => {
      state.isLoading = true
      
      const data = await repository.search("", 1, 15)
      state.configs = data.result;

      state.isLoading = false;
    }

    const filter = async () => {
      state.isLoading = true
      
      const data = await repository.search(state.filters.type, 1, 15)
      state.configs = data.result;
  
      state.isLoading = false;
    }

    const retrieveItem = async (id: string): Promise<void> => {
        state.isLoading = true;
        
        const data = await repository.retrieve(id);
        state.config = data;

        state.isLoading = false;
    }
   
    const save = async ()  => {
        state.isLoading = true
        var configToSent = state.config;
    
        await repository.update({
            id: configToSent!.id,
            type: configToSent!.type,
            description: configToSent!.description,
            value: configToSent!.value
          });
    
        state.isLoading = false
        state.isEditing = false
      }


    return {
        searchWithFilters,
        filter,
        retrieveItem,
        save,        
        getList,
        getItem,
        filters,
        showModel,
        isLoading
    }
  });