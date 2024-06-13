import { fa } from 'vuetify/lib/locale/index.mjs'
import { container } from 'tsyringe'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

import type { team } from '../entities/team'
import { teamRepository } from '../repositories/teamRepository'

interface workingGroupState {
    workingGroups: team[],
    isLoading: false,
  }

export const useWorkingGroups = defineStore('workingGroups', () => {
  const state = reactive<workingGroupState>({
      workingGroups: [],
      isLoading: false
  })

  const repository = container.resolve(teamRepository);
  const isLoading = computed(() => state.isLoading)

  const searchFiscal = async () => {
    state.isLoading = true
    
    const data = await repository.search("", "1", 1, 15)
    state.workingGroups = data.result;

    state.isLoading = false;
  }

  const searchAdvisory = async () => {
    state.isLoading = true
    
    const data = await repository.search("", "2", 1, 15)
    state.workingGroups = data.result;

    state.isLoading = false;
  }

  const searchLegal = async () => {
    state.isLoading = true
    
    const data = await repository.search("", "3", 1, 15)
    state.workingGroups = data.result;

    state.isLoading = false;
  }

  const searchOperational = async () => {
    state.isLoading = true
    
    const data = await repository.search("", "4", 1, 15)
    state.workingGroups = data.result;

    state.isLoading = false;
  }

  const searchAdministrative = async () => {
    state.isLoading = true
    
    const data = await repository.search("", "5", 1, 15)
    state.workingGroups = data.result;

    state.isLoading = false;
  }

  return {
      searchFiscal,
      searchAdvisory,
      searchLegal,
      searchOperational,
      searchAdministrative,
      isLoading
  }
});