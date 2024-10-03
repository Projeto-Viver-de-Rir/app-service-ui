/**
 * @fileoverview Compilation of methods that handles action permissions for the current user.
 */

import type { eventVolunteerResponse } from "@/entities/event";
import { UserPermissionTypes } from "@/interfaces/permissions";
import { useAccountData } from "@/stores/accountStore";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const accountStore =  useAccountData();

/**
 * This method returns a boolean conditioned on the existence of admin role on user permissions.
 *
 * @returns true if 'administrative' value exists and the user permissions.
 */
export const isCurrentUserAdministrative = (): boolean => {
    const user = getUserContext();
    if (!user.id) return false;
    return user.permissions.includes(UserPermissionTypes.ADMINISTRATIVE)
}

/**
 * This method returns a boolean conditioned on the existence of admin role on user permissions.
 *
 * @returns true if 'operational' value exists and the user permissions.
 */
export const isCurrentUserOperational = (): boolean => {
    const user = getUserContext();
    if (!user.id) return false;
    return user.permissions.includes(UserPermissionTypes.OPERATIONAL)
}

/**
 * This method returns a boolean conditioned on the existence of admin role on user permissions.
 *
 * @returns true if 'operational' value exists and the user permissions.
 */
export const isCurrentUserAllowedToManage = (eventCoordinators: Array<eventVolunteerResponse>): boolean => {
    const user = getUserContext();
    if (!user.id) return false;
    return user.permissions.includes(UserPermissionTypes.OPERATIONAL) && 
        !!eventCoordinators.find((c) => c.volunteer.id === user.volunteer.id)
}

/**
 * Returns a boolean conditioned on the existence of the volunteer.id of the current user on a given presences array.
 * 
 * @param presences Array of presences of the event to be checked
 * @returns true if the volunteer.id of the current user value exists on the given presences list.
 */
export const isCurrentUserPresentOnEvent = (presences: Array<eventVolunteerResponse>): boolean => {
    const user = getUserContext();
    if (!user.id) return false;
    return !!presences.find((p) => p.volunteer.id === user.volunteer.id);
}

/**
 * Returns a boolean that checks if the current user is the provided volunteer, by id.
 * 
 * @param volunteer provided volunteer to be checked on the user
 * @returns true if the volunteer.id of the current user equals the id of the provided volunteer.
 */
export const isCurrentUserTheVolunteer = (id: string): boolean => {
    const user = getUserContext();
    if (!user.id || !id) return false;
    return user.volunteer.id === id;
}

/**
 * This method returns a situational user context based on the app workflow.
 * If user data comes from enroll workflow, user context will be retrieved from accountStore.
 * If user data comess from authentication flow, user context will be retrieved from authStore.
 *
 * @returns user object if volunteer property exists.
 */
export const getUserContext = (): Record<string, any> => {
    const authUser = authStore.user;
    const accountUser = accountStore.account;
    if (authUser?.volunteer) return authUser;
    else if (accountUser?.volunteer) return accountUser;
    return {}
}
