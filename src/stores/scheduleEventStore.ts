import { fa } from "vuetify/lib/locale/index.mjs";
import { container } from "tsyringe";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

import type { scheduleEvent } from "../entities/scheduleEvent";
import { scheduleEventFilter } from "../entities/scheduleEventFilter";
import { scheduleEventRepository } from "../repositories/scheduleEventRepository";

interface scheduleEventState {
  scheduleEvent: scheduleEvent | null;
  initialScheduleEvent: scheduleEvent | null;
  scheduleEvents: scheduleEvent[];
  filters: scheduleEventFilter;
  isEditing: boolean;
  isLoading: boolean;
  action: string;
  showModel: boolean;
}

export const useScheduleEvents = defineStore("scheduleEvent", () => {
  const state = reactive<scheduleEventState>({
    scheduleEvent: null,
    initialScheduleEvent: null,
    scheduleEvents: [],
    filters: new scheduleEventFilter(""),
    isEditing: false,
    isLoading: false,
    action: "D",
    showModel: false,
  });

  const repository = container.resolve(scheduleEventRepository);
  const filters = computed(() => state.filters);
  const getList = computed(() => state.scheduleEvents);
  const getItem = computed(() => state.scheduleEvent);
  const showModel = computed(() => state.showModel);
  const isLoading = computed(() => state.isLoading);

  const getById = async (id: string): Promise<void> => {
    state.isLoading = true;

    const data = await repository.getById(id);
    state.scheduleEvent = data;

    state.isLoading = false;
  };

  const getData = async () => {
    state.isLoading = true;

    const data = await repository.getScheduleEvents("", 1, 15);
    state.scheduleEvents = data.result;

    state.isLoading = false;
  };

  const filter = async () => {
    state.isLoading = true;

    const data = await repository.getScheduleEvents(state.filters.name, 1, 15);
    state.scheduleEvent = data.result;

    state.isLoading = false;
  };

  const save = async () => {
    state.isLoading = true;
    var scheduleEventToSent = state.scheduleEvent;

    await repository.update({
      id: scheduleEventToSent!.id,
      name: scheduleEventToSent!.name,
      description: scheduleEventToSent!.description,
      address: scheduleEventToSent!.address,
      city: scheduleEventToSent!.city,
      meetingPoint: scheduleEventToSent!.meetingPoint,
      occupancy: scheduleEventToSent!.occupancy,
      dayOfWeek: scheduleEventToSent!.dayOfWeek,
      occurrence: scheduleEventToSent!.occurrence,
    });

    state.isLoading = false;
    state.isEditing = false;
  };

  return {
    getData,
    filter,
    getList,
    getItem,
    filters,
    showModel,
    getById,
    save,
    isLoading,
  };
});
