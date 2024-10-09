// project imports
import mock from "./mockAdapter";

import type {
  notificationType,
  profileType,
  languageType,
  appsLinkType,
  quickLinksType,
  searchType,
} from "@/types/HeaderTypes";
//
// Notification
//
import user1 from "@/assets/images/profile/user-1.jpg";
import user2 from "@/assets/images/profile/user-2.jpg";
import user3 from "@/assets/images/profile/user-3.jpg";
import user4 from "@/assets/images/profile/user-4.jpg";
import user5 from "@/assets/images/profile/user-5.jpg";

const notifications: notificationType[] = [
  {
    avatar: user1,
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    avatar: user2,
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    avatar: user3,
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    avatar: user4,
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
  {
    avatar: user5,
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    avatar: user1,
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
];

//
// Profile
//
import proUser1 from "@/assets/images/svgs/icon-account.svg";
const profileDD: profileType[] = [
  {
    avatar: proUser1,
    title: "Meu Perfil",
    subtitle: "Altere suas informações",
    href: "/personal-profile",
    to: "/personal-profile",
  }
];

//
// Language
//
import flag1 from "@/assets/images/flag/icon-flag-br.svg";
import flag2 from "@/assets/images/flag/icon-flag-en.svg";
const languageDD: languageType[] = [
  { title: "Português", subtext: "BR", value: "br", avatar: flag1 },
  { title: "English", subtext: "UK", value: "en", avatar: flag2 }
];

//
// Search Data
//
const searchSugg: searchType[] = [
  {
    title: "Modern",
    href: "/dashboards/modern",
  },
  {
    title: "Contacts",
    href: "/apps/contacts",
  },
  {
    title: "Pricing",
    href: "/pages/pricing",
  },
  {
    title: "Account Setting",
    href: "/pages/account-settings",
  },
];

export {
  notifications,
  profileDD,
  languageDD,
  searchSugg,
};
