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
    DashboardIcon,
    UsersIcon,
    BrandApplePodcastIcon,
    BoxMultiple0Icon,
    CashIcon,
    UserSearchIcon,
    CoinIcon,
    UserExclamationIcon,
    SettingsIcon,
    CalendarTimeIcon,
    FriendsIcon,
    SettingsAutomationIcon
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
        to: '/dashboard'
    },
    {
        title: 'Eventos',
        icon: CalendarEventIcon,
        to: '/eventos'
    },
    {
        title: 'Voluntários',
        icon: UsersIcon,
        to: '/voluntarios'
    },
    { header: 'Minha área' },
    {
        title: 'Meu Perfil',
        icon: UserCircleIcon,
        to: '/eventos'
    },
    {
        title: 'Minhas Mensalidades',
        icon: CashBanknoteIcon,
        to: '/mensalidades'
    },    
    { header: 'Grupos de trabalho' },
    {
        title: 'Executivo',
        icon: BrandApplePodcastIcon,
        to: '/a'
    },
    {
        title: 'Coordenação',
        icon: UserSearchIcon,
        to: '/d'
    },    
    {
        title: 'Conselho consultivo',
        icon: BoxMultiple0Icon,
        to: '/b'
    },
    {
        title: 'Conselho fiscal',
        icon: CashIcon,
        to: '/c'
    },
    { header: 'Gestão' },
    {
        title: 'Mensalidades',
        icon: CoinIcon,
        to: '/eventos'
    },
    {
        title: 'Presença no trimestre',
        icon: AwardIcon,
        to: '/eventos'
    },
    {
        title: 'Inadimplência atual',
        icon: UserExclamationIcon,
        to: '/eventos'
    },
    {
        title: 'Configurações',
        icon: SettingsIcon,
        to: '/',
        children: [
            {
                title: 'Eventos Planejados',
                icon: CalendarTimeIcon,
                to: '/schedule-events'
            },
            {
                title: 'Equipes',
                icon: FriendsIcon,
                to: '/team(transformar)'
            },                        
            {
                title: 'Sistema',
                icon: SettingsAutomationIcon,
                to: '/config(transformar)'
            }
        ]
    }    
];

export default sidebarItem;
