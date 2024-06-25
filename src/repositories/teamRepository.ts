import type { Api } from "../services/api";
import { inject, injectable } from "tsyringe";

import type { teamRepositoryInterface } from "../interfaces/repositories/teamRepositoryInterface";
import type { teamsResponse, teamResponse, team } from "@/entities/team";

@injectable()
export class teamRepository implements teamRepositoryInterface {
  constructor(@inject("ApiService") private apiService: Api) {}

  public async search(
    name: string,
    teamType: string,
    page: number,
    pageSize: number
  ): Promise<teamsResponse> {
    const response = await this.apiService.invoke(
      "team?name=" +
        name +
        "&teamType=" +
        teamType +
        "&currentPage=" +
        page +
        "&pageSize=" +
        pageSize
    );

    return response.data;
  }

  public async retrieve(id: string): Promise<teamResponse> {
    const response = await this.apiService.invoke("team/" + id);
    return response.data;
  }

  public async create(team: team): Promise<void> {
    const response = await this.apiService.post("team/" + team.id, team);
  }

  public async update(team: team): Promise<void> {
    await this.apiService.put("team/" + team.id, team);
  }

  public async delete(id: string): Promise<void> {
    const response = await this.apiService.delete("team/" + id);
  }
}
