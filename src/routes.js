import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdLogout,
  MdEditCalendar,
  MdOutlineShoppingCart,
  MdLogin,
  MdAdminPanelSettings,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
// import RTL from "views/admin/rtl";

// Auth Imports
// import SignInCentered from "views/auth/signIn";
import SignIn from "views/auth/signIn/index.jsx";
import OnBoarding from "views/auth/onBoarding";
import SignUp from "views/auth/signUp/index.jsx";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Analytics",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Planner",
    layout: "/admin",
    icon: <Icon as={MdEditCalendar} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Signin",
    layout: "/auth",
    path: "/sign-in",
    icon: (
      <Icon as={MdLogin} width='16px' height='16px' color='inherit' />
    ),
    component: SignIn,
    hide: true
  },
  {
    name: "Sign up",
    layout: "/auth",
    path: "/sign-up",
    icon: (
      <Icon as={MdLock} width='16px' height='16px' color='inherit' />
    ),
    component: SignUp,
    hide: true
  },
  {
    name: "onboarding",
    layout: "/auth",
    path: "/onboarding",
    icon: (
      <Icon as={MdLock} width='16px' height='16px' color='inherit' />
    ),
    component: OnBoarding,
    hide: true
  }
];


export const Logout = [
  {
    name: "Log Out",
    layout: "/auth",
    path: "/sign-out",
    icon: (
      <Icon as={MdLogout} width='16px' height='16px' color='inherit' />
    ),
    component: SignIn,
  }
];
export default routes;
