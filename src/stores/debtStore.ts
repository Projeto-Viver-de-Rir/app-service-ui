import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { computed, reactive } from 'vue'
import { payRequest, type debt } from '../entities/debt'
import type { volunteer } from '../entities/volunteer'
import { debtFilter } from '../entities/debtFilter'
import { debtRepository } from '../repositories/debtRepository'
import { operationRepository } from '../repositories/operationRepository'
import { volunteerRepository } from '../repositories/volunteerRepository'
import { createDebtsRequest }from '../entities/operation'
import { fa } from 'vuetify/lib/locale/index.mjs'

interface debtState {
    debt: debt | null,
    initialDebt: debt | null,
    debts: debt[],
    users: [],
    filters: debtFilter,
    isEditing: boolean,
    isLoading: boolean,
    action: string,
    showModel : boolean,
    showModelGenerateDebts : boolean
    startDateGenerateDebts: Date | null,
    endDateGenerateDebts: Date | null,
    generateDebtsRequest: createDebtsRequest
  }

  export const useDebts = defineStore('debts', () => {
    const state = reactive<debtState>({
        debt: null,
        initialDebt: null,
        debts: [],
        users: [],
        filters: new debtFilter("", ""),
        isEditing: false,
        isLoading: false,
        action: 'D',
        showModel: false,
        showModelGenerateDebts: false,
        startDateGenerateDebts: null,
        endDateGenerateDebts: null,
        generateDebtsRequest: new createDebtsRequest(new Date,new Date)
    })

    const repository = container.resolve(debtRepository);
    const opRepository = container.resolve(operationRepository)
    const userRepository = container.resolve(volunteerRepository)
    const filters = computed(() => state.filters) 
    const getList = computed(() => state.debts)
    const getDebt = computed(() => state.debt)
    const users = computed(() => state.users);
    const showModel = computed(() => state.showModel)
    const showModelGenerateDebts = computed(() => state.showModelGenerateDebts)
    const startDateGenerateDebts = computed(() => state.startDateGenerateDebts)
    const endDateGenerateDebts = computed(() => state.endDateGenerateDebts)
    const generateDebtsRequest = computed(() => state.generateDebtsRequest)

    const getById = async (id: string): Promise<void> => {
        state.isLoading = true
        const data = await repository.getById(id);
        state.debt = data;  
        state.isLoading = false    
    }

    const getData = async () => {
        state.isLoading = true
        const data = await repository.getDebts("","",1,15)
        state.debts = data.result

        const userData = await userRepository.get("","",1,2000);
        console.log(userData);
        userData.result.forEach((element)=>{
            state.users.push({value:element.id, title:element.name});
        });

        state.isLoading = false;    
      }

      const filter = async () => {
        state.isLoading = true
        const data = await repository.getDebts(state.filters.volunteerId,state.filters.name,1,15)
        state.debts = data.result,
        state.isLoading = false;
      }



    const openModalPayment = async (debt: debt) => {
        state.showModel = true
        state.debt = debt;
    }

    const confirmPayment = async () => {
        state.isLoading = true
        
        var request = new payRequest(state.debt!.paidAt!);
        await repository.pay(state.debt!.id,request);

        state.isLoading = true
        state.showModel = false
    }
    const closeModalPayment = async () => {
        state.showModel = false
        var debt = state.debt!;
        debt.paidAt = null;
        state.debt = debt;
    }
    
    const save = async ()  => {
        state.isLoading = true
        var debtToSent = state.debt;
    
        await repository.update({
            id: debtToSent!.id,
            name: debtToSent!.name,
            description: debtToSent!.description,
            amount: debtToSent!.amount,
            dueDate: debtToSent!.dueDate,
            volunteerId: debtToSent!.volunteerId,
            paidAt: debtToSent!.paidAt
          });
    
        state.isLoading = false
        state.isEditing = false
      }


    const openModalGenerateDebts = async () => {
        state.showModelGenerateDebts = true

    }

    const closeModalGenerateDebts = async () => {
        state.showModelGenerateDebts = false
        state.startDateGenerateDebts = null;
        state.endDateGenerateDebts = null;

    }

    const generateDebts = async () => {
        console.log(state.generateDebtsRequest.startsAt);
        console.log(state.generateDebtsRequest.endsAt);
        state.isLoading = true;
        opRepository.createDebts(new createDebtsRequest(state.generateDebtsRequest.startsAt, state.generateDebtsRequest.endsAt))
        state.isLoading = false
    }
    return {
        getData,
        filter,
        getList,
        getDebt,
        users,
        filters,
        showModel,
        openModalPayment,
        closeModalPayment,
        confirmPayment,
        getById,
        save,
        showModelGenerateDebts,
        startDateGenerateDebts,
        endDateGenerateDebts,
        openModalGenerateDebts,
        closeModalGenerateDebts,
        generateDebts,
        generateDebtsRequest
    }
  });