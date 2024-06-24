import type { Api } from "../services/api";
import { inject, injectable } from "tsyringe";

import type { configRepositoryInterface } from "../interfaces/repositories/configRepositoryInterface";
import type {
  configsResponse,
  configResponse,
  config,
} from "@/entities/config";

@injectable()
export class configRepository implements configRepositoryInterface {
  constructor(@inject("ApiService") private apiService: Api) {}

  public async search(
    type: string,
    page: number,
    pageSize: number
  ): Promise<configsResponse> {
    const response = await this.apiService.invoke(
      "config?type=" + type + "&currentPage=" + page + "&pageSize=" + pageSize
    );

    return response.data;
  }

  public async retrieve(id: string): Promise<configResponse> {
    const response = await this.apiService.invoke("config/" + id);
    return response.data;
  }

  public async create(config: config): Promise<void> {
    const response = await this.apiService.post("config/" + config.id, config);
  }

  public async update(config: config): Promise<void> {
    await this.apiService.put("config/" + config.id, config);
  }

  public async delete(id: string): Promise<void> {
    const response = await this.apiService.delete("config/" + id);
  }
}
