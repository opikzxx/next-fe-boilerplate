import {
  ClipboardList,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export type NavItem = {
  href:
    | "/creator"
    | "/creator/clients"
    | "/creator/events"
    | "/creator/settings"
    | "/admin"
    | "/admin/pages"
    | "/admin/users"
    | "/admin/settings";
  labelKey:
    | "creator"
    | "clients"
    | "events"
    | "settings"
    | "overview"
    | "pages"
    | "users";
  icon: typeof LayoutDashboard;
  role: "admin" | "creator";
};

export const navItems: NavItem[] = [
  { href: "/creator", labelKey: "creator", icon: LayoutDashboard, role: "creator" },
  { href: "/creator/clients", labelKey: "clients", icon: Users, role: "creator" },
  { href: "/creator/events", labelKey: "events", icon: ClipboardList, role: "creator" },
  { href: "/creator/settings", labelKey: "settings", icon: Settings, role: "creator" },
  { href: "/admin", labelKey: "overview", icon: LayoutDashboard, role: "admin" },
  { href: "/admin/pages", labelKey: "pages", icon: FileText, role: "admin" },
  { href: "/admin/users", labelKey: "users", icon: Users, role: "admin" },
  { href: "/admin/settings", labelKey: "settings", icon: Settings, role: "admin" },
];

export function getNavItems(isAdmin: boolean) {
  return navItems.filter((item) => item.role === (isAdmin ? "admin" : "creator"));
}

const rootHrefs: NavItem["href"][] = ["/creator", "/admin"];

export function isNavItemActive(pathname: string, href: NavItem["href"]) {
  return rootHrefs.includes(href) ? pathname === href : pathname.startsWith(href);
}
