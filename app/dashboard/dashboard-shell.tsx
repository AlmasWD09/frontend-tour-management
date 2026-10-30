"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Compass, LayoutDashboard, LogOut, Map, Menu, Plus, X } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/tours", label: "Tours", icon: Map, exact: false },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dashboard-shell">
      {menuOpen && <button className="dashboard-backdrop" aria-label="Close sidebar" onClick={() => setMenuOpen(false)} />}
      <aside className={`dashboard-sidebar ${menuOpen ? "dashboard-sidebar-open" : ""}`}>
        <Link href="/" className="brand dashboard-brand" onClick={() => setMenuOpen(false)}><span className="brand-mark"><Compass size={20} strokeWidth={1.8} /></span><span>elsewhere<span className="brand-period">.</span><small>TRAVEL ADMIN</small></span></Link>
        <div className="sidebar-label">WORKSPACE</div>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return <Link key={href} href={href} className={`dashboard-nav-link ${active ? "active" : ""}`} onClick={() => setMenuOpen(false)}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{label === "Tours" && <span className="sidebar-count">→</span>}</Link>;
          })}
        </nav>
        <Link href="/dashboard/tours/new" className="dashboard-add-link" onClick={() => setMenuOpen(false)}><Plus size={17} /> Add a tour</Link>
        <div className="sidebar-bottom"><div className="sidebar-user"><span className="user-avatar">E</span><span><b>Elsewhere Admin</b><small>Travel manager</small></span><ArrowUpRight size={15} /></div><Link href="/login" className="logout-link"><LogOut size={17} /> Log out</Link></div>
      </aside>

      <div className="dashboard-main"><header className="dashboard-topbar"><button className="dashboard-menu-toggle" aria-label={menuOpen ? "Close sidebar" : "Open sidebar"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button><div className="dashboard-breadcrumb">Workspace <span>/</span> <b>{pathname === "/dashboard" ? "Overview" : pathname.startsWith("/dashboard/tours") ? "Tours" : "Dashboard"}</b></div><Link href="/" className="view-site-link">View website <ArrowUpRight size={15} /></Link></header><main className="dashboard-content">{children}</main></div>
    </div>
  );
}
