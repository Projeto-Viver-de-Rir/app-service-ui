/**
 * @fileoverview Compilation of methods that handles action permissions for the current user.
 */

import type { eventVolunteerResponse } from "@/entities/event";
import { UserPermissionTypes } from "@/interfaces/permissions";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

/**
 * This method returns a boolean conditioned on the existence of admin role on user permissions.
 *
 * @returns true if 'administrative' value exists and the user permissions.
 */
export const isCurrentUserAdministrative = (): boolean => {
    const user = authStore.user;
    if (!user) return false;
    return user.permissions.includes(UserPermissionTypes.ADMINISTRATIVE)
}

/**
 * This method returns a boolean conditioned on the existence of admin role on user permissions.
 *
 * @returns true if 'operational' value exists and the user permissions.
 */
export const isCurrentUserOperational = (): boolean => {
    const user = authStore.user;
    if (!user) return false;
    return user.permissions.includes(UserPermissionTypes.OPERATIONAL)
}

/**
 * Returns a boolean conditioned on the existence of the volunteer.id of the current user on a given presences array.
 * 
 * @param presences Array of presences of the event to be checked
 * @returns true if the volunteer.id of the current user value exists on the given presences list.
 */
export const isCurrentUserPresentOnEvent = (presences: Array<eventVolunteerResponse>): boolean => {
    const user = authStore.user;
    if (!user) return false;
    return !!presences.find((p) => p.volunteer.id === user.volunteer.id);
}

/**
 * Returns a boolean that checks if the current user is the provided volunteer, by id.
 * 
 * @param volunteer provided volunteer to be checked on the user
 * @returns true if the volunteer.id of the current user equals the id of the provided volunteer.
 */
export const isCurrentUserTheVolunteer = (id: string): boolean => {
    const user = authStore.user;
    if (!user || !id) return false;
    return user.volunteer.id === id;
}
