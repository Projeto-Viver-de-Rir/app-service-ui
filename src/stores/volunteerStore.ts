import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { computed, reactive } from 'vue'

import type { volunteer } from '../entities/volunteer'
import { volunteerFilter } from '../entities/volunteerFilter'
import { volunteerRepository } from '../repositories/volunteerRepository'
import { useAuthStore } from '@/stores/auth';

interface volunteerState {
  user: volunteer | null,
  initialUser: volunteer | null,
  users: volunteer[],
  filters: volunteerFilter,
  isLoading: boolean,
  isEditing: boolean,
  filterName: string,
  filterEmail: string,
  canEdit: boolean,
  action: string,
}

export const useVolunteers = defineStore('volunteer', () => {
  const state = reactive<volunteerState>({
    isLoading: true,
    filters: new volunteerFilter("", ""),
    users: [],
    user: null,
    isEditing: false,
    filterName: '',
    filterEmail: '',
    initialUser: null,
    action: 'D',
    canEdit: false
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
    const data = await userRepository.get("","");
    state.users = data.result

    state.isLoading = false
  }

  const getById = async (id: string): Promise<void> => {
    state.isLoading = true
    const data = await userRepository.getById(id);
    state.user = data;  
    state.initialUser = data;
    state.users.lastMonthAttendances = "0";
    state.users.actualMonthAttendances  = "0";
    state.users.lastMonthAbsences  = "0";
    state.users.actualMonthAbsences  = "0";
    state.isLoading = false

}

  const filter = async () => {
    state.isLoading = true
    const data = await userRepository.get(state.filters.name, state.filters.nickname)
    state.users = data.result
    state.isLoading = false;
  }

  const edit = async ()  => {
    state.isEditing = true;
  }

  const cancel = async ()  => {
    if(state.action === "D"){
      state.isEditing = false;
      state.user = state.initialUser;
    }
    else history.go(-1);
  }

  const changeAvailability = async (availability: string)  => {
    let user = state.user!;

    if(!availability.includes("1") && 
    !availability.includes("2")
    && !availability.includes("3")
    && !availability.includes("4")
    && !availability.includes("5")
    && !availability.includes("6")
    && !availability.includes("0")
    )
      user.availability = "";
    else{
      let days = availability.split(',');
      let newAvailability = '';
      days.forEach(element => {
        if(element !== ''){
          newAvailability = newAvailability + element+',';
        }
      });
      newAvailability = newAvailability.slice(0,-1);
      user.availability = newAvailability;
    }

    state.user = user;
  }


  const save = async ()  => {
    state.isLoading = true
    var userToSent = state.user;
    console.log(userToSent?.availability)

    await userRepository.update({
        id: userToSent?.id,
        name: userToSent?.name,
        nickname: userToSent?.nickname,
        email: userToSent?.email,
        phone: userToSent?.phone,
        address: userToSent?.address,
        city: userToSent?.city,
        state: userToSent?.state,
        zip : userToSent?.zip,
        birthDate: userToSent?.birthDate,
        identifier: userToSent?.identifier,
        availability: userToSent?.availability,
        comments: userToSent?.comments,
        status: userToSent?.status
      });

    state.isLoading = false
    state.isEditing = false
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
    availability,
    edit,
    cancel,
    save,
    changeAvailability    
  }
})