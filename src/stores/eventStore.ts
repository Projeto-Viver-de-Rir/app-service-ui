import { defineStore } from "pinia";
import { container } from "tsyringe";
import { computed, reactive } from "vue";
import {
  finishEventRequest,
  type event,
} from "../entities/event";
import { createEventRequest } from "../entities/operation";
import { eventFilter } from "../entities/eventFilter";
import { eventRepository } from "../repositories/eventRepository";
import { eventPresenceRepository } from "../repositories/eventPresenceRepository";
import { operationRepository } from "../repositories/operationRepository";
import { useAuthStore } from "@/stores/auth";

export const EVENT_PLACES_MORE = 'Outro';

interface eventState {
  event: event | null;
  events: event[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  places: string[];
  filters: eventFilter;
  isLoading: boolean;
  numberConfirmed: number;
  volunteersPresent: Array<any>;
  volunteersConfirmed: finishEventRequest;
}

export const useEvents = defineStore("events", () => {
  const state = reactive<eventState>({
    isLoading: true,
    filters: new eventFilter(""),
    events: [],
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    places: [
      "Hospital Fêmina",
      "Hospital Criança Conceição",
      "Hospital Conceição (Adulto)",
      "Hospital São Pedro",
      "Asilo Padre Cacique",
      "FASE Padre Cacique",
      "FASE Cruzeiro",
      "Vila Safira",
      EVENT_PLACES_MORE,
    ],
    event: null,
    numberConfirmed: 0,
    volunteersPresent: [],
    volunteersConfirmed: new finishEventRequest([]),
  });

  const repository = container.resolve(eventRepository);
  const presenceRepository = container.resolve(eventPresenceRepository);
  const opRepository = container.resolve(operationRepository);
  const getList = computed(() => state.events);
  const getEvent = computed(() => state.event);
  const isLoading = computed(() => state.isLoading);
  const currentPage = computed(() => state.currentPage);
  const totalPages = computed(() => state.totalPages);
  const totalItems = computed(() => state.totalItems);
  const getPlaces = computed(() => state.places);
  const getNumberConfirmed = computed(() => state.numberConfirmed);
  const volunteersPresent = computed(() => state.volunteersPresent);

  const getDataByQuery = async (query: string) => {
    if (!query) throw new Error("Query params not provided");
    state.isLoading = true;    
    try {
      const data = await repository.getEventsByQuery(query);
      state.events = data.result;
      state.currentPage = data.currentPage;
      state.totalPages = data.totalPages;
      state.totalItems = data.totalItems;
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Unable to fetch events by query')
    }
  };

  const getById = async (id: string): Promise<void> => {
    state.isLoading = true;
    const data = await repository.getById(id);
    state.volunteersPresent = [];
    data.presences.forEach((f) =>
      state.volunteersPresent.push({
        presenceId: f.id,
        attented: true,
        id: f.volunteer.id,
        name: f.volunteer.name,
        nickname: f.volunteer.nickname,
        photo: f.volunteer.photo != null ? f.volunteer.photo : "",
      })
    );

    state.event = data;
    state.numberConfirmed = state.volunteersPresent.length;
    state.isLoading = false;
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
      throw new Error(`Unable to ${event.id ? 'update' :  'create' } event`);
    }
    state.isLoading = false;
  };

  const confirmVacancy = async () => {
    state.isLoading = true;
    try {
      const authStore = useAuthStore();
      await presenceRepository.create(state.event.id, authStore.user.volunteer.id);
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Unable to confirm vacancy')
    }
  };

  const finishEvent = async (presences: Array<string>) => {
    state.isLoading = true;
    try {
      await repository.finish(state.event.id, { presences });
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Unable to finish event')
    }
  };

  const fetchEventById = async (id: string): Promise<void> => {
    resetEvent();
    state.isLoading = true;
    try {
      const data = await repository.getById(id);
      state.event = data;
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Failed fetching event');
    }
  };

  const resetEvent = (): void => {
    state.event = null;
  }

  const processEventSchedule = async () => {
    state.isLoading = true;
    try {
      let date = new Date();
      var newDate = new Date(date.setMonth(date.getMonth() + 1));
      var request = new createEventRequest(newDate);
      await opRepository.createEvents(request);
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error('Failed processing event schedule');
    }
  };

  const removeParticipant = async (volunteer: any): Promise<void> => {
    state.isLoading = true;
    try { 
      await presenceRepository.delete(volunteer.presenceId);
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error(`error while removing pariticipant => ${e}`);
    }
  }

  const deleteSingleEvent = async (event: event) => {
    if (!event) return;
    state.isLoading = true;
    try { 
      await repository.delete(event.id);
      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      throw new Error(`error while deleting event => ${event.name}`);
    }
  };

  return {
    getDataByQuery,
    getList,
    isLoading,
    currentPage,
    totalPages,
    totalItems,
    getEvent,
    getById,
    fetchEventById,
    resetEvent,
    createOrUpdate,
    processEventSchedule,
    getPlaces,
    getNumberConfirmed,
    removeParticipant,
    finishEvent,
    confirmVacancy,
    volunteersPresent,
    deleteSingleEvent,
  };
});
