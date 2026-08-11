import type { LucideIcon } from "lucide-react";
import {
  Cable,
  Cloud,
  Database,
  Globe,
  Headset,
  Lock,
  RadioTower,
  Server,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Wifi,
} from "lucide-react";

type ServiceItem = {
  slug: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
};

type ServiceCategory = {
  id: string;
  icon: LucideIcon;
  labelKey: string;
  items: ServiceItem[];
};

const serviceCategories: ServiceCategory[] = [
  {
    id: "connectivity",
    icon: Wifi,
    labelKey: "category_connectivity",
    items: [
      {
        slug: "/services",
        icon: Globe,
        titleKey: "item_dedicated_internet_title",
        descriptionKey: "item_dedicated_internet_desc",
      },
      {
        slug: "/services",
        icon: Cable,
        titleKey: "item_fiber_title",
        descriptionKey: "item_fiber_desc",
      },
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    labelKey: "category_cloud",
    items: [
      {
        slug: "/services",
        icon: Server,
        titleKey: "item_cloud_hosting_title",
        descriptionKey: "item_cloud_hosting_desc",
      },
      {
        slug: "/services",
        icon: Database,
        titleKey: "item_data_center_title",
        descriptionKey: "item_data_center_desc",
      },
    ],
  },
  {
    id: "security",
    icon: ShieldCheck,
    labelKey: "category_security",
    items: [
      {
        slug: "/services",
        icon: ShieldAlert,
        titleKey: "item_managed_security_title",
        descriptionKey: "item_managed_security_desc",
      },
      {
        slug: "/services",
        icon: Lock,
        titleKey: "item_firewall_title",
        descriptionKey: "item_firewall_desc",
      },
    ],
  },
  {
    id: "managed",
    icon: Settings2,
    labelKey: "category_managed",
    items: [
      {
        slug: "/services",
        icon: RadioTower,
        titleKey: "item_noc_title",
        descriptionKey: "item_noc_desc",
      },
      {
        slug: "/services",
        icon: Headset,
        titleKey: "item_it_support_title",
        descriptionKey: "item_it_support_desc",
      },
    ],
  },
];

export { serviceCategories };
export type { ServiceCategory, ServiceItem };
