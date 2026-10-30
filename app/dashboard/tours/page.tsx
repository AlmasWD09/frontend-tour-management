"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, MapPin, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useDashboard } from "../dashboard-provider";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function ToursPage() {
  const { tours, deleteTour } = useDashboard();
  const [query, setQuery] = useState("");
  const filteredTours = tours.filter((tour) => `${tour.title} ${tour.destination}`.toLowerCase().includes(query.toLowerCase()));

  function handleDelete(id: string, title: string) {
    if (window.confirm(`Delete “${title}”? This cannot be undone.`)) deleteTour(id);
  }

  return <div className="dashboard-page">
    <div className="dashboard-page-heading"><div><span className="dashboard-kicker">TRIP CATALOG</span><h1>Manage tours</h1><p>Add, update, or remove trips from your catalog.</p></div><Link href="/dashboard/tours/new" className="button button-primary"><Plus size={17} /> Add a tour</Link></div>
    <section className="dashboard-panel tours-panel"><div className="tour-toolbar"><div className="tour-count"><strong>{tours.length}</strong> {tours.length === 1 ? "tour" : "tours"}</div><label className="tour-search"><Search size={16} /><span className="sr-only">Search tours</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tours..." /></label></div>
      {filteredTours.length === 0 ? <div className="dashboard-empty"><MapPin size={24} /><h3>{tours.length ? "No matching tours" : "No tours yet"}</h3><p>{tours.length ? "Try another search term." : "Create your first tour to get started."}</p>{!tours.length && <Link href="/dashboard/tours/new" className="button button-primary"><Plus size={16} /> Add a tour</Link>}</div> : <div className="tour-table-wrap"><table className="tour-table"><thead><tr><th>TOUR</th><th>STATUS</th><th>DURATION</th><th>BOOKINGS</th><th>PRICE / PERSON</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{filteredTours.map((tour) => <tr key={tour.id}><td><div className="tour-table-name"><div className="tour-thumb" style={{ backgroundImage: `url('${tour.image}')` }} /><span><strong>{tour.title}</strong><small><MapPin size={12} /> {tour.destination}</small></span></div></td><td><span className={`tour-status ${tour.status.toLowerCase()}`}>{tour.status}</span></td><td>{tour.duration} days</td><td>{tour.bookings}</td><td><strong>{money(tour.price)}</strong></td><td><div className="tour-actions"><Link href={`/dashboard/tours/${tour.id}/edit`} className="icon-action" aria-label={`Edit ${tour.title}`}><Pencil size={16} /></Link><button className="icon-action delete-action" aria-label={`Delete ${tour.title}`} onClick={() => handleDelete(tour.id, tour.title)}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div>}
      <div className="dashboard-panel-footer"><span>Changes are saved in this browser.</span><Link href="/dashboard">Back to overview <ArrowUpRight size={14} /></Link></div>
    </section>
  </div>;
}
