import { defineStore } from "pinia";
import { container } from "tsyringe";
import { computed, reactive } from "vue";
import { type NonPayment } from "../entities/reports";
import { reportsRepository } from "../repositories/reportsRepository";

interface reportsState {
  nonPayments: NonPayment[];
  presences: NonPayment[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const useReports = defineStore("reports", () => {
  const state = reactive<reportsState>({
    nonPayments: [],
    presences: [],
    isLoading: false,
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
  });

  const repository = container.resolve(reportsRepository);
  const getList = computed(() => state.nonPayments);
  const getPresencesList = computed(() => state.presences);
  /* Targets the createdAt property of the first index of array to get createdAt value. All records inside the array have the same value */
  const nonPaymentsCreatedAt = computed(() => state.nonPayments[0]?.createdAt);
  const presencesCreatedAt = computed(() => state.presences[0]?.createdAt);
  const isLoading = computed(() => state.isLoading);
  const currentPage = computed(() => state.currentPage);
  const totalPages = computed(() => state.totalPages);
  const totalItems = computed(() => state.totalItems);

  const getNonPaymentsByQuery = async (query: string) => {
    if (!query) throw new Error("Query params not provided");
    state.isLoading = true;    
    try {
      const data = await repository.getNonPaymentsByQuery(query);
      state.nonPayments = data.result;
      state.currentPage = data.currentPage;
      state.totalPages = data.totalPages;
      state.totalItems = data.totalItems;
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Unable to fetch non-payments by query')
    }
  };

  const getPresencesByQuery = async (query: string) => {
    if (!query) throw new Error("Query params not provided");
    state.isLoading = true;    
    try {
      const data = await repository.getPresencesByQuery(query);
      state.presences = data.result;
      state.currentPage = data.currentPage;
      state.totalPages = data.totalPages;
      state.totalItems = data.totalItems;
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Unable to fetch non-payments by query')
    }
  };

  const deleteNonPayment = async (id: string) => {
    if (!id) throw new Error("Query params not provided");
    state.isLoading = true;    
    try {
      await repository.deleteNonPayment(id);
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Unable to delete non-payment')
    }
  };

  const deletePresence = async (id: string) => {
    if (!id) throw new Error("Query params not provided");
    state.isLoading = true;    
    try {
      await repository.deletePresence(id);
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Unable to delete presence')
    }
  };

  const generateNewReport = async (type: string) => {
    if (!type) throw new Error("Type not provided");
    state.isLoading = true;    
    try {
      let response: any = null;
      if (type === 'non-payments') {
        response = await repository.generateNonPaymentsReport();
      } else {
        response = await repository.generatePresencesReport();
      }
      if (response.data && !response.data.isSuccess) {
        const errorMsg = response.data.errors[0];
        if (errorMsg) {
          throw new Error(errorMsg);
        } else {
          throw new Error(`Unable to generate ${type} report`);
        }
      }
      state.isLoading = false;
    } catch (e: any) {
      state.isLoading = false;
      throw new Error(e)
    }
  };

  return {
    getList,
    getPresencesList,
    nonPaymentsCreatedAt,
    presencesCreatedAt,
    currentPage,
    totalPages,
    totalItems,
    isLoading,
    getNonPaymentsByQuery,
    getPresencesByQuery,
    deleteNonPayment,
    deletePresence,
    generateNewReport,
  };
});
