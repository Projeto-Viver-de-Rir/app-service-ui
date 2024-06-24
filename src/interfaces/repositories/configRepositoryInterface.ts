import type {
  config,
  configResponse,
  configsResponse,
} from "../../entities/config";

//abstract
export interface configRepositoryInterface {
  search(
    type: string,
    page: number,
    pageSize: number
  ): Promise<configsResponse>;
  retrieve(id: string): Promise<configResponse>;
  create(obj: config): Promise<void>;
  update(obj: config): Promise<void>;
  delete(id: string): Promise<void>;
}
