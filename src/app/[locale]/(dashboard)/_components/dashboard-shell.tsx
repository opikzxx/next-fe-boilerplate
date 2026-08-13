import { Toaster } from "@/components/ui/sonner";
import { DesktopSidebar } from "./desktop-sidebar";
import { MobileTabBar } from "./mobile-tab-bar";

type DashboardShellProps = {
  name: string;
  image?: string | null;
  isAdmin: boolean;
  children: React.ReactNode;
};

function DashboardShell(props: DashboardShellProps) {
  return (
    <div className="flex min-h-svh bg-white">
      <DesktopSidebar
        name={props.name}
        image={props.image}
        isAdmin={props.isAdmin}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 p-4 pb-20 md:pb-0">{props.children}</main>
      </div>

      <MobileTabBar isAdmin={props.isAdmin} />

      <Toaster position="top-right" closeButton />
    </div>
  );
}

export { DashboardShell };
