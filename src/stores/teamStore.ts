import { fa } from "vuetify/lib/locale/index.mjs";
import { container } from "tsyringe";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

import type { team } from "../entities/team";
import { teamFilter } from "../entities/teamFilter";
import { teamRepository } from "../repositories/teamRepository";

interface teamState {
  team: team | null;
  initialTeam: team | null;
  teams: team[];
  filters: teamFilter;
  isEditing: boolean;
  isLoading: boolean;
  action: string;
  showModel: boolean;
}

export const useTeams = defineStore("team", () => {
  const state = reactive<teamState>({
    team: null,
    initialTeam: null,
    teams: [],
    filters: new teamFilter(""),
    isEditing: false,
    isLoading: false,
    action: "D",
    showModel: false,
  });

  const repository = container.resolve(teamRepository);
  const filters = computed(() => state.filters);
  const getList = computed(() => state.teams);
  const getItem = computed(() => state.team);
  const showModel = computed(() => state.showModel);
  const isLoading = computed(() => state.isLoading);

  const searchWithFilters = async () => {
    state.isLoading = true;

    const data = await repository.search("", "", 1, 15);
    state.teams = data.result;

    state.isLoading = false;
  };

  const filter = async () => {
    state.isLoading = true;

    const data = await repository.search(state.filters.name, "", 1, 15);
    state.teams = data.result;

    state.isLoading = false;
  };

  const retrieveItem = async (id: string): Promise<void> => {
    state.isLoading = true;

    const data = await repository.retrieve(id);
    state.team = data;

    state.isLoading = false;
  };

  const save = async () => {
    state.isLoading = true;
    var teamToSent = state.team;

    await repository.update({
      id: teamToSent!.id,
      name: teamToSent!.name,
      description: teamToSent!.description,
      type: teamToSent!.type,
      status: teamToSent!.status,
    });

    state.isLoading = false;
    state.isEditing = false;
  };

  return {
    searchWithFilters,
    filter,
    retrieveItem,
    save,
    getList,
    getItem,
    filters,
    showModel,
    isLoading,
  };
});
