/**
 * @fileoverview Compilation of methods that helps display event info.
 */


import type { event } from "@/entities/event";
import { EventDateStatusTypes, type ActionButton } from "@/interfaces/event";
import { useEvents } from "@/stores/eventStore";

/**
 * This method returns a string value based on the event status.
 *
 * @param status A number value that reflects to the event status.
 * @returns string value for each status 1-Agendado, 2-Realizado 3-Cancelado. Defaults to an empty string.
 */
export const getStatusDescription = (status: number): string => {
  switch (status) {
    case 1:
      return 'Agendado'
    case 2:
      return 'Realizado';
    case 3:
      return 'Cancelado';
    default:
      return '';
  }
}


/**
 * This method returns a string value based on the day of week
 *
 * @param status A number value that reflects day of week.
 * @returns string value for each.
 */
export const getDayOfWeekDescription = (status: number): string => {
  switch (status) {
    case 0:
      return 'Domingo'
    case 1:
      return 'Segunda-Feira';
    case 2:
      return 'Terça-Feira';
    case 3:
      return 'Quarta-Feira';
    case 4:
      return 'Quinta-Feira';
    case 5:
      return 'Sexta-Feira';
    case 6:
      return 'Sábado';
    default:
      return '';
  }
}


/**
 * This method returns a string value based on the occurrence.
 *
 * @param status A number value that reflects to occurrence.
 * @returns string value for each occurrence. Defaults to an empty string.
 */
export const getOccurrenceDescription = (status: number): string => {
  switch (status) {
    case 0:
      return 'Semanal'
    case 1:
      return 'Primeira ocorrência do mês';
    case 2:
      return 'Segunda ocorrência do mês';
    case 3:
      return 'Terceira ocorrência do mês';
    case 4:
      return 'Quarta ocorrência do mês';
    case 99:
      return 'Última ocorrência do mês';
    default:
      return '';
  }
}

/**
 * This method returns an array of status filter options.
 *
 * @returns Array of objects containing status filter options: label for display name value for status identifier.
 */
export const getStatusFilterOptions = (): Array<Record<string, any>> => {
  return [
    {
      id: 0,
      label: 'Nenhum',
      value: 0,
    },
    {
      id: 1,
      label: 'Agendado',
      value: 1,
    },
    {
      id: 2,
      label: 'Realizado',
      value: 2,
    },
    {
      id: 3,
      label: 'Cancelado',
      value: 3,
    },
  ];
}

/**
 * This method returns an array of status filter options.
 *
 * @returns Array of objects containing day of week options: label for display name value for status identifier.
 */
export const getDayOfWeekOptions = (): Array<Record<string, any>> => {
  return [
    {
      id: 0,
      label: 'Nenhum',
      value: null,
    },
    {
      id: 1,
      label: 'Domingo',
      value: 0,
    },
    {
      id: 2,
      label: 'Segunda-Feira',
      value: 1,
    },
    {
      id: 3,
      label: 'Terça-Feira',
      value: 2,
    },
    {
      id: 4,
      label: 'Quarta-Feira',
      value: 3,
    },
    {
      id: 5,
      label: 'Quinta-Feira',
      value: 4,
    },
    {
      id: 6,
      label: 'Sexta-Feira',
      value: 5,
    },
    {
      id: 6,
      label: 'Sábado',
      value: 6,
    },
  ];
}


/**
 * This method returns an array of occurrence options.
 *
 * @returns Array of objects containing occurrence options: label for display name value for status identifier.
 */
export const getOccurrenceOptions = (): Array<Record<string, any>> => {
  return [
    {
      id: 0,
      label: 'Nenhum',
      value: null,
    },
    {
      id: 1,
      label: 'Semanal',
      value: 0,
    },
    {
      id: 2,
      label: 'Primeira ocorrência do mês',
      value: 1,
    },
    {
      id: 3,
      label: 'Segunda ocorrência do mês',
      value: 2,
    },
    {
      id: 4,
      label: 'Terceira ocorrência do mês',
      value: 3,
    },
    {
      id: 5,
      label: 'Quarta ocorrência do mês',
      value: 4,
    },
    {
      id: 6,
      label: 'Última ocorrência do mês',
      value: 99,
    },
  ];
}

/**
 * This method returns a boolean conditioned to the existence of a string value for volunteer avatar.
 *
 * @param photo A string value containing an image path with jpg or png format.
 * @returns true if photo string value exists and the value contains an image path with .jpg or .png format. Otherwise, returns false.
 */
export const isUserAvatarAvailable = (photo: string): boolean => {
  return !!(photo && (photo.includes('jpg') || photo.includes('png')))
}

/**
 * This method returns a formated string containing the date of the event on dd/mm format.
 *
 * @param date A Date string value containing an event Date and Time.
 * @returns A string value in the format of a dd/mm date.
 */
export const eventDate = (date: Date | string): string => {
  if (!date) return '';
  const newDate = new Date(date)
  let dd = newDate.getDate();
  let mm = newDate.getMonth() + 1;
  let dayOfMonth = dd < 10 ? `0${dd}` : dd.toString();
  let month = mm < 10 ? `0${mm}` : mm.toString();
  return `${dayOfMonth}/${month}`
}

/**
 * This method returns a formated string containing the date of the event on dd/mm format.
 *
 * @param date A Date string value containing an event Date and Time.
 * @returns A string value in the format of a dd/mm/aaaa date.
 */
export const eventFullDate = (date: Date | string): string => {
  if (!date) return '';
  const newDate = new Date(date)
  let dd = newDate.getDate();
  let mm = newDate.getMonth() + 1;
  let aaaa = newDate.getFullYear();
  let dayOfMonth = dd < 10 ? `0${dd}` : dd.toString();
  let month = mm < 10 ? `0${mm}` : mm.toString();
  return `${dayOfMonth}/${month}/${aaaa}`
}

/**
 * This method returns a formated string containing the hour of the event on hh:mm format.
 *
 * @param date A Date string value containing an event Date and Time.
 * @returns A string value in the format of a hh:mm time.
*/ 
export const eventHour = (date: Date | string): string => {
  if (!date) return '';
  const newHour = new Date(date)
  let hh = newHour.getHours();
  let mm = newHour.getMinutes();
  let hours = hh < 10 ? `0${hh}` : hh.toString();
  let minutes = mm < 10 ? `0${mm}` : mm.toString();
  return `${hours}:${minutes}`
}

/**
 * Returns a string to display the status of the event based on the date.
 *
 * @param date Date or string date to be checked
 * @returns string value for each event status due, almost_due, closed.
*/ 
export const eventDateStatus = (date: Date | string): EventDateStatusTypes | string => {
  if (!date) return '';
  let diffTime = Math.floor(new Date(date).valueOf() - new Date().valueOf());
  let days = diffTime / (24*60*60*1000);
  if (days > 1) {
    return EventDateStatusTypes.DUE
  } else if(days < 1 && days > 0) {
    return EventDateStatusTypes.ALMOST_DUE
  } else {
    // if 'hours' value is negative, most likely the event has been already closed.
    // the rule is defined on the FE but, an event that have a date greater than today, should not be listed on the dashboard
    // while having the status 2 or 3.
    return EventDateStatusTypes.CLOSED
  }
}

/**
 * Returns a boolean conditioned on the difference between occupancy and capacity.
 * 
 * @param event Event to be checked
 * @returns true if the event capacity is lower than event.occupancy.
 */
export const isEventFull = (event: event): boolean => {
  return event.capacity === 0;
}

/**
 * Returns an array of actions for the header menu.
 * 
 * @returns Array of objects for dynamic menu rendering.
 */
export const eventActions = (): Array<ActionButton> => {
  const currentEvent = useEvents().getEvent;
  return [
    {
      id: 0,
      label: 'Editar',
      button: {
        icon: 'mdi-pencil'
      },
      link: {
        name: 'EventForm',
        params: { id: currentEvent?.id }
      },
      visible: true,
    },
    {
      id: 1,
      label: 'Concluir',
      button: {
        icon: 'mdi-check-circle-outline',
      },
      visible: true,
    },
    {
      id: 2,
      label: 'Deletar',
      button: {
        icon: 'mdi-trash-can-outline',
        color: 'error'
      },
      visible: true,
    },
  ]
}

/**
 * Returns an array of actions for the header menu.
 * 
 * @returns Array of objects for dynamic menu rendering.
 */
export const eventListActions = (): Array<ActionButton> => {
  return [
    {
      id: 0,
      label: 'Gerar Agenda',
      button: {
        icon: 'mdi-calendar-month-outline',
        color: 'warning'
      },
      visible: true,
    },
    {
      id: 1,
      label: 'Adicionar Evento',
      button: {
        icon: 'mdi-plus-thick',
        color: 'success'
      },
      link: {
        name: 'EventForm',
        params: {}
      },
      visible: true,
    },
  ]
}


/**
 * Returns an array of actions for the header menu.
 * 
 * @returns Array of objects for dynamic menu rendering.
 */
export const schedulledEventsListActions = (): Array<ActionButton> => {
  return [
    {
      id: 0,
      label: 'Adicionar',
      button: {
        icon: 'mdi-plus-thick',
        color: 'success'
      },
      link: {
        name: 'ScheduledEventForm',
        params: {}
      },
      visible: true,
    },
  ]
}