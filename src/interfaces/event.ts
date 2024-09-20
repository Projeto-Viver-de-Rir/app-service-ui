export enum EventDateStatusTypes {
    DUE = 'due',
    ALMOST_DUE = 'almost_due',
    CLOSED = 'closed',
}

export interface ButtonProps {
    size?: string;
    color?: string;
    variant?: string;
    icon: string;
}

export interface RouterLinkProps {
    name: string;
    params: Record<string, any>;
}

export interface ActionButton {
    id: number;
    label?: string;
    button: ButtonProps;
    link?: RouterLinkProps;
    visible?: boolean;
    disabled?: boolean;
    tooltip?: boolean;
    tooltipLabel?: string;
    onClick?: () => Promise<void> | void | null;
}
