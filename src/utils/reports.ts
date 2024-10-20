/**
 * @fileoverview Compilation of methods that helps display reports screen.
 */

import { type ActionButton } from "@/interfaces/event";

/**
 * Returns an array of actions for the header menu.
 * 
 * @returns Array of objects for dynamic menu rendering.
 */
export const reportsListActions = (): Array<ActionButton> => {
  return [
    {
      id: 0,
      label: 'Gerar Novo Relatório',
      button: {
        icon: 'mdi-calendar-month-outline',
        color: 'warning'
      },
      visible: true,
    },
  ]
}
