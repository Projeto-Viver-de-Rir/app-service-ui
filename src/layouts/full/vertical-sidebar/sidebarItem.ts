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
  SettingsAutomationIcon,
} from "vue-tabler-icons";

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
  roles?: string[];
}

const sidebarItem: menu[] = [
  { 
    header: "Início",
    roles: ["volunteer"]
  },
  {
    title: "Dashboard",
    icon: DashboardIcon,
    to: "/dashboard",
    roles: ["volunteer"]
  },
  {
    title: "Eventos",
    icon: CalendarEventIcon,
    to: "/events",
    roles: ["volunteer"]
  },
  {
    title: "Voluntários",
    icon: UsersIcon,
    to: "/volunteers",
    roles: ["volunteer"]
  },

  { 
    header: "Minha área",
    roles: ["volunteer"] 
  },
  {
    title: "Meu Perfil",
    icon: UserCircleIcon,
    to: "/personal-profile",
    roles: ["volunteer"]
  },
  {
    title: "Minhas Mensalidades",
    icon: CashBanknoteIcon,
    to: "/personal-debts",
    roles: ["volunteer"]
  },

  { 
    header: "Grupos de trabalho",
    roles: ["volunteer"] 
  },
  {
    title: "Executivo",
    icon: BrandApplePodcastIcon,
    to: "/working-groups/executive",
    roles: ["volunteer"]
  },
  {
    title: "Coordenação",
    icon: UserSearchIcon,
    to: "/working-groups/operational",
    roles: ["volunteer"]
  },
  {
    title: "Conselho consultivo",
    icon: BoxMultiple0Icon,
    to: "/working-groups/advisory",
    roles: ["volunteer"]
  },
  {
    title: "Conselho fiscal",
    icon: CashIcon,
    to: "/working-groups/fiscal",
    roles: ["volunteer"]
  },

  { 
    header: "Gestão",
    roles: ["fiscal", "administrative"]
  },
  {
    title: "Mensalidades",
    icon: CoinIcon,
    to: "/debts",
    roles: ["administrative"],
  },
  {
    title: "Presença no trimestre",
    icon: AwardIcon,
    to: "/reports/attendancy",
    roles: ["administrative"],
  },
  {
    title: "Inadimplência atual",
    icon: UserExclamationIcon,
    to: "/reports/non-payment",
    roles: ["fiscal", "administrative"],
  },
  {
    title: "Configurações",
    icon: SettingsIcon,
    to: "/",
    roles: ["administrative"],
    children: [
      {
        title: "Eventos Planejados",
        icon: CalendarTimeIcon,
        to: "/schedule-events",
        roles: ["administrative"]
      },
      {
        title: "Equipes",
        icon: FriendsIcon,
        to: "/teams",
        roles: ["administrative"]
      },
      {
        title: "Sistema",
        icon: SettingsAutomationIcon,
        to: "/configs",
        roles: ["administrative"]
      },
    ],
  },
];

export default sidebarItem;
