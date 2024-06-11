import type { team, teamResponse, teamsResponse } from '../../entities/team'

//abstract
export interface teamRepositoryInterface {
  search(name: string, page: number, pageSize: number): Promise<teamsResponse>;
  retrieve(id: string): Promise<teamResponse>;
  create(team: team): Promise<void>;  
  update(team: team): Promise<void>;
  delete(id: string): Promise<void>;
}