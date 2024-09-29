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
import proUser2 from "@/assets/images/svgs/icon-inbox.svg";
import proUser3 from "@/assets/images/svgs/icon-tasks.svg";
const profileDD: profileType[] = [
  {
    avatar: proUser1,
    title: "My Profile",
    subtitle: "Account settings",
    href: "/apps/profile",
  },
  {
    avatar: proUser3,
    title: "My Tasks",
    subtitle: "To-do and Daily tasks",
    href: "/apps/task",
  },
];

//
// Language
//
import flag1 from "@/assets/images/flag/icon-flag-en.svg";
import flag2 from "@/assets/images/flag/icon-flag-fr.svg";
import flag3 from "@/assets/images/flag/icon-flag-ro.svg";
import flag4 from "@/assets/images/flag/icon-flag-zh.svg";
const languageDD: languageType[] = [
  { title: "English", subtext: "UK", value: "en", avatar: flag1 },
  { title: "français", subtext: "French", value: "fr", avatar: flag2 },
  { title: "عربي", subtext: "Arbic", value: "ro", avatar: flag3 },
  { title: "中国人", subtext: "Chinese", value: "zh", avatar: flag4 },
];

//
// AppsLink
//
import img2 from "@/assets/images/svgs/icon-dd-cart.svg";
import img3 from "@/assets/images/svgs/icon-dd-invoice.svg";
import img4 from "@/assets/images/svgs/icon-dd-date.svg";
import img5 from "@/assets/images/svgs/icon-dd-mobile.svg";
import img6 from "@/assets/images/svgs/icon-dd-lifebuoy.svg";
import img7 from "@/assets/images/svgs/icon-dd-message-box.svg";
import img8 from "@/assets/images/svgs/icon-dd-application.svg";
const appsLink: appsLinkType[] = [
  {
    avatar: img3,
    title: "User Profile App",
    subtext: "Get profile details",
    href: "/apps/user/profile",
  },
  {
    avatar: img5,
    title: "Contact Application",
    subtext: "2 Unsaved Contacts",
    href: "/apps/contacts",
  },
  {
    avatar: img6,
    title: "Account Setting App",
    subtext: "Account settings",
    href: "/pages/account-settings",
  }
];

//
// Quick Links
//
const quickLink: quickLinksType[] = [
  {
    title: "Pricing Page",
    href: "/pages/pricing",
  },
  {
    title: "Authentication Design",
    href: "/auth/login",
  },
  {
    title: "Register Now",
    href: "/auth/register",
  },
  {
    title: "404 Error Page",
    href: "/auth/404",
  },
  {
    title: "User Application",
    href: "/apps/user/profile",
  }
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
  appsLink,
  quickLink,
  searchSugg,
};
