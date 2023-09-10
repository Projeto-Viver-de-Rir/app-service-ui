import {
    MenuIcon,
    CircleIcon,
    CircleOffIcon,
    BrandChromeIcon,
    MoodSmileIcon,
    StarIcon,
    AwardIcon,
    CalendarEventIcon,
    UserCircleIcon,
    CashBanknoteIcon,
    GrainIcon,
    DashboardIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    {
        title: 'Dashboard',
        icon: DashboardIcon,
        to: '/'
    },
    {
        title: 'Eventos',
        icon: CalendarEventIcon,
        to: '/Eventos'
    },
    {
        title: 'Voluntários',
        icon: UserCircleIcon,
        to: '/Voluntarios'
    },
    {
        title: 'Mensalidade',
        icon: CashBanknoteIcon,
        to: '/Mensalidades'
    }
];

export default sidebarItem;
