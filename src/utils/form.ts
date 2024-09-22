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