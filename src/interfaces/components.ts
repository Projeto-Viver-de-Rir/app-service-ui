export interface SnackBar {
	color?: string;
	message: string;
	variant?: string;
	timeout?: number;
	show?: boolean;
	action?: Function;
	actionLabel?: string;
}
  
export interface SnackBarState {
	queue: Array<SnackBar>;
	busy: boolean;
	defaultTimeout: number;
	interval: any;
}