import { defineStore } from "pinia";
import { container } from "tsyringe";
import { computed, reactive } from "vue";
import type { debtsReport } from "../entities/report";
import { reportRepository } from "../repositories/reportRepository";

interface debtState {
  debtsReport: debtsReport[];
  isEditing: boolean;
  isLoading: boolean;
  action: string;
  showModel: boolean;
  showModelGenerateDebts: boolean;
  startDateGenerateDebts: Date | null;
  endDateGenerateDebts: Date | null;
}

export const useReports = defineStore("debts", () => {
  const state = reactive<debtState>({
    debtsReport: [],
    isEditing: false,
    isLoading: false,
    action: "D",
    showModel: false,
    showModelGenerateDebts: false,
    startDateGenerateDebts: null,
    endDateGenerateDebts: null,
  });

  const repository = container.resolve(reportRepository);
  const isLoading = computed(() => state.isLoading);

  const getDebtsReportData = async (): Promise<void> => {
    state.isLoading = true;
    const data = await repository.getDebtsReport();
    state.debtsReport = data;
    state.isLoading = false;
  };

  const getDebtsReport = computed(() => state.debtsReport);

  return {
    getDebtsReportData,
    getDebtsReport,
    isLoading,
  };
});
