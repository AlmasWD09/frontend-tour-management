"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, CircleDollarSign, Map, Plus, Users } from "lucide-react";
import { useDashboard } from "./dashboard-provider";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function DashboardPage() {
  const { tours } = useDashboard();
  const published = tours.filter((tour) => tour.status === "Published").length;
  const bookings = tours.reduce((total, tour) => total + tour.bookings, 0);
  const revenue = tours.reduce((total, tour) => total + tour.bookings * tour.price, 0);
  const stats = [
    { label: "Total tours", value: tours.length, icon: Map, note: `${published} currently published`, trend: "up" },
    { label: "Total bookings", value: bookings, icon: Users, note: "Across all your tours", trend: "up" },
    { label: "Estimated revenue", value: money(revenue), icon: CircleDollarSign, note: "Based on current bookings", trend: "up" },
    { label: "Draft tours", value: tours.length - published, icon: CalendarDays, note: "Ready when you are", trend: "down" },
  ];

  return <div className="dashboard-page">
    <div className="dashboard-page-heading"><div><span className="dashboard-kicker">YOUR TRAVEL BUSINESS</span><h1>Dashboard overview</h1><p>Here’s what’s happening with your tours.</p></div><Link href="/dashboard/tours/new" className="button button-primary"><Plus size={17} /> Add a tour</Link></div>
    <section className="stats-grid" aria-label="Tour business summary">{stats.map(({ label, value, icon: Icon, note, trend }) => <article className="stat-card" key={label}><div className="stat-card-top"><span>{label}</span><span className="stat-icon"><Icon size={18} /></span></div><strong>{value}</strong><p><span className={`stat-trend ${trend}`}><ArrowUpRight size={13} /></span>{note}</p></article>)}</section>
    <section className="dashboard-panel"><div className="panel-heading"><div><h2>Your tours</h2><p>Manage the trips you offer to travelers.</p></div><Link href="/dashboard/tours" className="panel-link">All tours <ArrowRight size={15} /></Link></div>
      {tours.length === 0 ? <div className="dashboard-empty"><Map size={25} /><h3>No tours yet</h3><p>Add your first tour to start managing your travel offerings.</p><Link href="/dashboard/tours/new" className="button button-primary"><Plus size={16} /> Add your first tour</Link></div> : <div className="recent-tour-list">{tours.slice(0, 4).map((tour) => <div className="recent-tour-row" key={tour.id}><div className="tour-thumb" style={{ backgroundImage: `url('${tour.image}')` }} /><div className="recent-tour-info"><strong>{tour.title}</strong><span>{tour.destination} · {tour.duration} days</span></div><span className={`tour-status ${tour.status.toLowerCase()}`}>{tour.status}</span><span className="recent-tour-bookings">{tour.bookings} bookings</span><strong className="recent-tour-price">{money(tour.price)}</strong><Link href={`/dashboard/tours/${tour.id}/edit`} className="icon-action" aria-label={`Edit ${tour.title}`}><ArrowUpRight size={17} /></Link></div>)}</div>}
      {tours.length > 0 && <div className="dashboard-panel-footer"><span><ArrowDownRight size={14} /> Keep your tour details up to date</span><Link href="/dashboard/tours">Manage tours <ArrowRight size={14} /></Link></div>}
    </section>
  </div>;
}
