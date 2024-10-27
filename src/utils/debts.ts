/**
 * @fileoverview Compilation of methods that helps display debts info.
 */

import { type ActionButton } from "@/interfaces/event";
import { useVolunteers } from "@/stores/volunteerStore";

/**
 * This method returns a string value based on the debts status.
 *
 * @param status A string value that reflects to the paidAt status.
 * @returns if paidAt value exists returns Pago, else Pendente. 
 */
export const getSituationDescription = (paid: boolean): string => {
    return paid ? 'Pago' : 'Pendente'
}

/**
 * This method returns an array of status filter options.
 *
 * @returns Array of objects containing status filter options: label for display name value for status identifier.
 */
export const getSituationFilterOptions = (): Array<Record<string, any>> => {
  return [
    {
      id: 0,
      label: 'Nenhum',
      value: null,
    },
    {
      id: 1,
      label: 'Pago',
      value: true,
    },
    {
      id: 2,
      label: 'Pendente',
      value: false,
    }
  ];
}

/**
 * This method returns an array of years filter options.
 *
 * @returns Array of objects containing the last 8 years filter options: label for display name value for year identifier.
 */
export const getYearFilterOptions = (): Array<Record<string, any>> => {
  var max = new Date().getFullYear()
  var min = max - 2
  var years = []

  for (var i = max; i >= min; i--) {
    years.push(i)
  }

  return years.map((year, index) => ({
    id: index,
    label: year.toString(),
    value: year,
  }))
}
