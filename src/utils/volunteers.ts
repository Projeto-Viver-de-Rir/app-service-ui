/**
 * @fileoverview Compilation of methods that helps display event info.
 */

import { type ActionButton } from "@/interfaces/event";
import { useVolunteers } from "@/stores/volunteerStore";

/**
 * Returns an array of actions for the header menu.
 * 
 * @returns Array of objects for dynamic menu rendering.
 */
export const volunteerActions = (): Array<ActionButton> => {
  const currentVolunteer = useVolunteers().getCurrentVolunteer
  return [
    {
      id: 0,
      label: 'Editar',
      button: {
        icon: 'mdi-pencil'
      },
      link: {
        name: 'DetailtUser',
        params: { id: currentVolunteer?.id }
      },
      visible: true,
    },
    {
      id: 1,
      label: 'Deletar',
      button: {
        icon: 'mdi-trash-can-outline',
        color: 'error'
      },
      visible: true,
    },
    {
      id: 2,
      label: 'Mensalidades',
      button: {
        icon: 'mdi-currency-usd',
      },
      link: {
        name: 'ListDebt',
      },
      visible: true,
    },
    
  ]
}