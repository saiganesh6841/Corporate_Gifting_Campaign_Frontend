import {
  Board24Filled,
  Board24Regular,
  Megaphone24Filled,
  Megaphone24Regular,
  PeopleCall24Filled,
  PeopleCall24Regular,
  PeopleCheckmark24Filled,
  PeopleCheckmark24Regular,
  PeopleTeam24Filled,
  PeopleTeam24Regular,
} from "@fluentui/react-icons";
import React from "react";

class SideBarMenu {
  static menuForSuperAdmin = [
    {
      display: "sideNavMenu.dashboard",
      link: "/admin/dashboard",
      linkPage: false,
      onclick: null,
      urlEndWith: "dashboard",
      className: "",
      permissionLevel: "Dashboard",
      regularIcon: <Board24Regular />,
      filledIcon: <Board24Filled style={{ color: "white" }} />,
      eventKey: "dashboard",
      subMenu: [],
    },
    {
      display: "sideNavMenu.users",
      link: "/admin/users",
      linkPage: false,
      onclick: null,
      urlEndWith: "users",
      className: "",
      permissionLevel: "Users",
      regularIcon: <PeopleTeam24Regular />,
      filledIcon: <PeopleTeam24Filled style={{ color: "white" }} />,
      eventKey: "users",
      subMenu: [],
    },

    // {
    //   display: "sideNavMenu.transactions",
    //   link: "/admin/transactions/history",
    //   linkPage: false,
    //   onclick: null,
    //   urlEndWith: "transactions",
    //   className: "",
    //   permissionLevel: "Transactions",
    //   regularIcon: <PersonMoney24Regular />,
    //   filledIcon: <PersonMoney24Filled />,
    //   eventKey: "transactions",
    //   isExpandIconVisible: true,
    //   stylesForExpandedMenu: (pathUrl, displayName) =>
    //     // pass the url which is common in all the sub menus like /admin/inventory which is common in  challenges categories and golden tips
    //     pathUrl.includes("/admin/transactions") &&
    //     displayName === "sideNavMenu.transactions",

    //   subMenu: [
    //     {
    //       display: "sideNavMenu.history",
    //       link: "/admin/transactions/history",
    //       linkPage: false,
    //       onclick: null,
    //       urlEndWith: "history",
    //       className: "",
    //       permissionLevel: "History",
    //       regularIcon: <History24Regular />,
    //       filledIcon: <History24Filled />,
    //       eventKey: "history",
    //     },
    //     {
    //       display: "sideNavMenu.requests",
    //       link: "/admin/transactions/requests",
    //       linkPage: false,
    //       onclick: null,
    //       urlEndWith: "requests",
    //       className: "",
    //       permissionLevel: "Requests",
    //       regularIcon: <Money24Regular />,
    //       filledIcon: <Money24Filled />,
    //       eventKey: "requests",
    //     },
    //   ],
    // },

    {
      display: "sideNavMenu.security",
      link: "/admin/security/role",
      linkPage: false,
      onclick: null,
      urlEndWith: "security",
      className: "",
      permissionLevel: "Security",
      regularIcon: <PeopleCall24Regular />,
      filledIcon: <PeopleCall24Filled />,
      eventKey: "security",
      isExpandIconVisible: true,
      stylesForExpandedMenu: (pathUrl, displayName) =>
        // pass the url which is common in all the sub menus like /admin/security which is common in  roles
        pathUrl.includes("/admin/security") &&
        displayName === "sideNavMenu.security",
      subMenu: [
        {
          display: "sideNavMenu.role_function",
          link: "/admin/security/role",
          linkPage: false,
          onclick: null,
          urlEndWith: "role",
          className: "",
          permissionLevel: "Role",
          regularIcon: <PeopleCheckmark24Regular />,
          filledIcon: <PeopleCheckmark24Filled />,
          eventKey: "role",
        },
      ],
    },
    {
      display: "sideNavMenu.setting",
      link: "/admin/setting",
      linkPage: false,
      onclick: null,
      urlEndWith: "setting",
      className: "",
      permissionLevel: "Setting", //Advertisement
      regularIcon: <Megaphone24Regular />,
      filledIcon: <Megaphone24Filled style={{ color: "white" }} />,
      eventKey: "setting",
      subMenu: [],
    },
  ];
}
export default SideBarMenu;
