import { container } from "tsyringe";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

import type { scheduleEvent } from "../entities/scheduleEvent";
import { scheduleEventRepository } from "../repositories/scheduleEventRepository";

interface scheduleEventState {
  scheduleEvent: scheduleEvent | null;
  scheduleEvents: scheduleEvent[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const useScheduleEvents = defineStore("scheduleEvent", () => {
  const state = reactive<scheduleEventState>({
    scheduleEvent: null,
    scheduleEvents: [],
    isLoading: false,
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  });

  const repository = container.resolve(scheduleEventRepository);
  const getList = computed(() => state.scheduleEvents);
  const getItem = computed(() => state.scheduleEvent);
  const isLoading = computed(() => state.isLoading);
  const currentPage = computed(() => state.currentPage);
  const totalPages = computed(() => state.totalPages);
  const totalItems = computed(() => state.totalItems);

  const fetchScheduledEventById = async (id: string): Promise<void> => {
    state.isLoading = true;
    try {
      const data = await repository.getById(id);
      (state.scheduleEvent as any) = data;
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Failed fetching scheduled event');
    }
  };

  const getDataByQuery = async (query: string) => {
    if (!query) throw new Error("Query params not provided");
    state.isLoading = true;    
    try {
      const data = await repository.getScheduledEventsByQuery(query);
      state.scheduleEvents = data.result;
      state.currentPage = data.currentPage;
      state.totalPages = data.totalPages;
      state.totalItems = data.totalItems;
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Unable to fetch scheduled events by query')
    }
  };

  const createOrUpdate = async (event: any) => {
    state.isLoading = true;
    try {
      if (!event.id) {
        await repository.create(event);
      } else {
        await repository.update(event);
      }
    } catch (e) {
      state.isLoading = false;
      throw new Error(`Unable to ${event.id ? 'update' :  'create' } scheduled event`);
    }
    state.isLoading = false;
  };

  const getData = async () => {
    state.isLoading = true;

    const data = await repository.getScheduleEvents("", 1, 15);
    state.scheduleEvents = data.result;

    state.isLoading = false;
  };

  return {
    getData,
    getDataByQuery,
    fetchScheduledEventById,
    createOrUpdate,
    currentPage,
    totalPages,
    totalItems,
    getList,
    getItem,
    isLoading,
  };
});
