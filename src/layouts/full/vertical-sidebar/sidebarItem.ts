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
    { header: 'Início' },
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
        to: '/personal-profile'
    },
    {
        title: 'Minhas Mensalidades',
        icon: CashBanknoteIcon,
        to: '/personal-debts'
    },    
    { header: 'Grupos de trabalho' },
    {
        title: 'Executivo',
        icon: BrandApplePodcastIcon,
        to: '/working-groups/executive'
    },
    {
        title: 'Coordenação',
        icon: UserSearchIcon,
        to: '/working-groups/operational'
    },    
    {
        title: 'Conselho consultivo',
        icon: BoxMultiple0Icon,
        to: '/working-groups/advisory'
    },
    {
        title: 'Conselho fiscal',
        icon: CashIcon,
        to: '/working-groups/fiscal'
    },
    { header: 'Gestão' },
    {
        title: 'Mensalidades',
        icon: CoinIcon,
        to: '/mensalidades'
    },
    {
        title: 'Presença no trimestre',
        icon: AwardIcon,
        to: '/reports/attendancy'
    },
    {
        title: 'Inadimplência atual',
        icon: UserExclamationIcon,
        to: '/reports/non-payment'
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
                to: '/teams'
            },                        
            {
                title: 'Sistema',
                icon: SettingsAutomationIcon,
                to: '/configs'
            }
        ]
    }    
];

export default sidebarItem;
