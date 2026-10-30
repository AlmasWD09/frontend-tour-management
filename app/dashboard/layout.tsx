import type { ReactNode } from "react";
import "./dashboard.css";
import { DashboardProvider } from "./dashboard-provider";
import { DashboardShell } from "./dashboard-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardProvider><DashboardShell>{children}</DashboardShell></DashboardProvider>;
}
