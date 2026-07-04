import { ClipboardList, LayoutDashboard, Settings, Users } from "lucide-react";

export type NavItem = {
  href:
    | "/dashboard"
    | "/dashboard/clients"
    | "/dashboard/events"
    | "/dashboard/settings";
  labelKey: "dashboard" | "clients" | "events" | "settings";
  icon: typeof LayoutDashboard;
};

export const navItems: NavItem[] = [
  { href: "/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
  { href: "/dashboard/clients", labelKey: "clients", icon: Users },
  { href: "/dashboard/events", labelKey: "events", icon: ClipboardList },
  { href: "/dashboard/settings", labelKey: "settings", icon: Settings },
];
