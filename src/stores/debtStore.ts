import { defineStore } from "pinia";
import { container } from "tsyringe";
import { computed, reactive } from "vue";
import { payRequest, type debt } from "../entities/debt";
import type { volunteer } from "../entities/volunteer";
import { debtFilter } from "../entities/debtFilter";
import { debtRepository } from "../repositories/debtRepository";
import { operationRepository } from "../repositories/operationRepository";
import { volunteerRepository } from "../repositories/volunteerRepository";
import { createDebtsRequest } from "../entities/operation";

interface debtState {
  debt: debt | null;
  initialDebt: debt | null;
  debts: debt[];
  personalDebts: {
    results: debt[] | null;
    sumAmount: number;
    count: number;
  };
  users: [];
  filters: debtFilter;
  isEditing: boolean;
  isLoading: boolean;
  action: string;
  showModel: boolean;
  showModelGenerateDebts: boolean;
  startDateGenerateDebts: Date | null;
  endDateGenerateDebts: Date | null;
  generateDebtsRequest: createDebtsRequest;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const useDebts = defineStore("debts", () => {
  const state = reactive<debtState>({
    debt: null,
    initialDebt: null,
    personalDebts: {
      results: null,
      sumAmount: 0,
      count: 0,
    },
    debts: [],
    users: [],
    filters: new debtFilter("", ""),
    isEditing: false,
    isLoading: false,
    action: "D",
    showModel: false,
    showModelGenerateDebts: false,
    startDateGenerateDebts: null,
    endDateGenerateDebts: null,
    generateDebtsRequest: new createDebtsRequest(new Date(), new Date()),
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
  });

  const repository = container.resolve(debtRepository);
  const opRepository = container.resolve(operationRepository);
  const userRepository = container.resolve(volunteerRepository);
  const filters = computed(() => state.filters);
  const getList = computed(() => state.debts);
  const getPersonalDebts = computed(() => state.personalDebts);
  const getDebt = computed(() => state.debt);
  const users = computed(() => state.users);
  const showModel = computed(() => state.showModel);
  const showModelGenerateDebts = computed(() => state.showModelGenerateDebts);
  const startDateGenerateDebts = computed(() => state.startDateGenerateDebts);
  const endDateGenerateDebts = computed(() => state.endDateGenerateDebts);
  const generateDebtsRequest = computed(() => state.generateDebtsRequest);
  const isLoading = computed(() => state.isLoading);
  const currentPage = computed(() => state.currentPage);
  const totalPages = computed(() => state.totalPages);
  const totalItems = computed(() => state.totalItems);
  const getById = async (id: string): Promise<void> => {
    state.isLoading = true;
    const data = await repository.getById(id);
    state.debt = data;
    state.isLoading = false;
  };

  const getData = async () => {
    state.isLoading = true;
    const data = await repository.getDebts("", "", 1, 15);
    state.debts = data.result;

    const userData = await userRepository.get("", "", 1, 2000);
    state.users = [];
    userData.result.forEach((element) => {
      state.users.push({ value: element.id, title: element.name });
    });

    state.isLoading = false;
  };

  const getDataByYear = async (volunteerId: string) => {
    state.isLoading = true;
    const data = await repository.getDebts(volunteerId, "", 1, 30);

    const groupedData: any = {};

    data.result.forEach((item) => {
      const year = new Date(item.dueDate).getFullYear();

      if (!groupedData[year]) {
        groupedData[year] = [{ ...item }];
      } else {
        groupedData[year] = [...groupedData[year], { ...item }];
      }
    });

    const openDebts = data.result.filter((item) => item.paidAt === null);

    state.personalDebts = {
      results: groupedData,
      sumAmount: openDebts.reduce((acc, cur) => acc + cur.amount, 0),
      count: openDebts.length,
    };

    const userData = await userRepository.get("", "", 1, 2000);
    state.users = [];
    userData.result.forEach((element) => {
      state.users.push({ value: element.id, title: element.name });
    });

    state.isLoading = false;
  };

  const filter = async () => {
    state.isLoading = true;
    const data = await repository.getDebts(
      state.filters.volunteerId,
      state.filters.name,
      1,
      15
    );
    (state.debts = data.result), (state.isLoading = false);
  };

  const openModalPayment = async (debt: debt) => {
    state.showModel = true;
    state.debt = debt;
  };

  const confirmPayment = async () => {
    state.isLoading = true;

    var request = new payRequest(state.debt!.paidAt!);
    await repository.pay(state.debt!.id, request);

    state.isLoading = true;
    state.showModel = false;
  };
  const closeModalPayment = async () => {
    state.showModel = false;
    var debt = state.debt!;
    debt.paidAt = null;
    state.debt = debt;
  };

  const save = async () => {
    state.isLoading = true;
    var debtToSent = state.debt;

    await repository.update({
      id: debtToSent!.id,
      name: debtToSent!.name,
      description: debtToSent!.description,
      amount: debtToSent!.amount,
      dueDate: debtToSent!.dueDate,
      volunteerId: debtToSent!.volunteerId,
      paidAt: debtToSent!.paidAt,
    });

    state.isLoading = false;
    state.isEditing = false;
  };

  const openModalGenerateDebts = async () => {
    state.showModelGenerateDebts = true;
  };

  const closeModalGenerateDebts = async () => {
    state.showModelGenerateDebts = false;
    state.startDateGenerateDebts = null;
    state.endDateGenerateDebts = null;
  };

  const generateDebts = async () => {
    state.isLoading = true;
    opRepository.createDebts(
      new createDebtsRequest(
        state.generateDebtsRequest.startsAt,
        state.generateDebtsRequest.endsAt
      )
    );
    state.isLoading = false;
  };

  const getMonthlyPaymentsByQuery = async (query: string) => {
    if (!query) throw new Error("Query params not provided");
    state.isLoading = true;
    try {
      const data = await repository.getByQuery(query);
      state.debts = data.result;
      state.currentPage = data.currentPage;
      state.totalPages = data.totalPages;
      state.totalItems = data.totalItems;
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Unable to fetch monthly payments')
    }
  };

  return {
    getData,
    filter,
    getList,
    getPersonalDebts,
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
    generateDebtsRequest,
    getDataByYear,
    isLoading,
    currentPage,
    totalPages,
    totalItems,
    getMonthlyPaymentsByQuery,
  };
});
