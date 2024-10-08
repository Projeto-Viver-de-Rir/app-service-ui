/**
 * @fileoverview Compilation of form rules
 */

/**
 * All rules for event form.
 * 
 * @returns object containing specific rules for event entity form.
 */
export const eventFormRules = (): Record<string, any> => {
	return {
		name: [
			(v: string): string | boolean => !!v || 'Nome do evento é obrigatório!',
		],
		meetingPoint: [
			(v: string): string | boolean => !!v || 'Ponto de encontro é obrigatório!',
		],
		address: [
			(v: string): string | boolean => !!v || 'O Endereço é obrigatório!',
		],
		city: [
			(v: string): string | boolean => !!v || 'A Cidade é obrigatória!',
		],
		occupancy: [
			(v: string): string | boolean => !!v || 'Vagas disponíveis é obrigatória!',
		],
	}
}

/**
 * All availability options.
 * 
 * @returns array of objects containing specific form availabilities options.
 */
export const availabilityOptions = (): Array<Record<string, any>> => {
	return [
		{
		  label: 'Segunda',
		  value: '1',
		},
		{
		  label: 'Terça',
		  value: '2',
		},
		{
		  label: 'Quarta',
		  value: '3',
		},
		{
		  label: 'Quinta',
		  value: '4',
		},
		{
		  label: 'Sexta',
		  value: '5',
		},
		{
		  label: 'Sábado',
		  value: '6',
		},
		{
		  label: 'Domingo',
		  value: '0',
		},
		{
		  label: 'Indefinido',
		  value: '9',
		},
	]
}