import type { eventPresenceResponse } from "../../entities/eventPresence.ts";

//abstract
export interface eventPresenceRepositoryInterface {
  getById(id: string): Promise<eventPresenceResponse>;

  create(eventId: string, volunteerId: string): Promise<void>;

  delete(presenceId: string): Promise<void>;
}
