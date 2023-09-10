import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { computed, reactive } from 'vue'

import type { volunteer } from '../entities/volunteer'
import { volunteerFilter } from '../entities/volunteerFilter'
import { volunteerRepository } from '../repositories/volunteerRepository'

interface volunteerState {
  useer: volunteer | null,
  users: volunteer[],
  filters: volunteerFilter,
  isLoading: boolean,

  filterName: string,
  filterEmail: string
}

export const useVolunteers = defineStore('volunteer', () => {
  const state = reactive<volunteerState>({
    isLoading: true,
    filters: new volunteerFilter("",""),
    users: [],
    user: null
  })
  
  const userRepository = container.resolve(volunteerRepository)
  const getList = computed(() => state.users)
  const getUser = computed(() => state.user)
  const isLoading = computed(() => state.isLoading)
  const availability = computed(() => "0")
  
  const getData = async () => {
    state.isLoading = true
    const data = await userRepository.get()
    state.users = data.volunteers
    state.isLoading = false
  }

  const getById = async (id: number): Promise<void> => {
    state.isLoading = true
    const data = await userRepository.getById(id);
    state.user = data.volunteer;  
    state.isLoading = false
}

  const filter = async () => {

  }

  return {
    getData,
    getById,
    getUser,
    getList,
    isLoading,
    filter,
    availability
  }
})