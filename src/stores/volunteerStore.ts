import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { computed, reactive } from 'vue'

import type { volunteer } from '../entities/volunteer'
import { volunteerFilter } from '../entities/volunteerFilter'
import { volunteerRepository } from '../repositories/volunteerRepository'

interface volunteerState {
  user: volunteer | null,
  users: volunteer[],
  filters: volunteerFilter,
  isLoading: boolean,
  isEditing: boolean,
  filterName: string,
  filterEmail: string
}

export const useVolunteers = defineStore('volunteer', () => {
  const state = reactive<volunteerState>({
    isLoading: true,
    filters: new volunteerFilter("", ""),
    users: [],
    user: null,
    isEditing: false,
    filterName: '',
    filterEmail: ''
  })
  
  const userRepository = container.resolve(volunteerRepository)
  const getList = computed(() => state.users)
  const getUser = computed(() => state.user)
  const isLoading = computed(() => state.isLoading)
  const filters = computed(() => state.filters)
  const availability = computed(() => state.user?.availability)
  const isEditing = computed(() => state.isEditing)
  const getData = async () => {
    state.isLoading = true
    const data = await userRepository.get()
    state.users = data.result

    state.isLoading = false
  }

  const getById = async (id: string): Promise<void> => {
    state.isLoading = true
    const data = await userRepository.getById(id);
    state.user = data;  
    state.users.lastMonthAttendances = "0";
    state.users.actualMonthAttendances  = "0";
    state.users.lastMonthAbsences  = "0";
    state.users.actualMonthAbsences  = "0";
    console.log(state.users);
    state.isLoading = false
}

  const filter = async () => {

  }

  return {
    filter,
    getData,
    getById,
    getUser,
    getList,
    isLoading,
    isEditing,
    filters,
    availability
  }
})