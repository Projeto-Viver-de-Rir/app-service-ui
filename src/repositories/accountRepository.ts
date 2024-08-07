import { inject, injectable } from "tsyringe";

import type { accountRepositoryInterface } from "../interfaces/repositories/accountRepositoryInterface";
import type { accountResponse, account } from "../entities/account";
import type { Api } from "../services/api";

@injectable()
export class accountRepository implements accountRepositoryInterface {
  constructor(@inject("ApiService") private apiService: Api) {}

  public async getCurrentUser(): Promise<accountResponse> {
    const response = await this.apiService.invoke("account/v2/myself");
    return response.data;
  }
  public async getCurrentUserWithToken(
    token: string
  ): Promise<accountResponse> {
    const response = await this.apiService.invokeWithToken(
      "account/v2/myself",
      token
    );
    return response.data;
  }
  public async update(account: account): Promise<void> {
    await this.apiService.post("account/enroll", account);
  }
  public async patchPhoto(file: BinaryData): Promise<void> {
    await this.apiService.patch("account/photo", file);
  }
}
