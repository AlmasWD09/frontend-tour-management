"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, ImagePlus } from "lucide-react";
import type { Tour, TourStatus } from "../dashboard-data";

type TourFormValues = Omit<Tour, "id" | "bookings">;

export function TourForm({ initialTour, submitLabel, onSubmit }: { initialTour?: Tour; submitLabel: string; onSubmit: (tour: TourFormValues) => void }) {
  const [title, setTitle] = useState(initialTour?.title ?? "");
  const [destination, setDestination] = useState(initialTour?.destination ?? "");
  const [duration, setDuration] = useState(String(initialTour?.duration ?? ""));
  const [price, setPrice] = useState(String(initialTour?.price ?? ""));
  const [status, setStatus] = useState<TourStatus>(initialTour?.status ?? "Draft");
  const [image, setImage] = useState(initialTour?.image ?? "");
  const [description, setDescription] = useState(initialTour?.description ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ title: title.trim(), destination: destination.trim(), duration: Number(duration), price: Number(price), status, image: image.trim() || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", description: description.trim() });
  }

  return <div className="dashboard-page tour-editor-page"><Link href="/dashboard/tours" className="editor-back"><ArrowLeft size={15} /> Back to tours</Link><div className="dashboard-page-heading editor-heading"><div><span className="dashboard-kicker">TOUR DETAILS</span><h1>{initialTour ? "Edit tour" : "Add a new tour"}</h1><p>Share the details travelers need to plan their trip.</p></div></div>
    <form className="tour-editor" onSubmit={handleSubmit}><div className="editor-section"><div className="editor-section-title"><span>01</span><div><h2>Trip information</h2><p>Give your tour a clear name and destination.</p></div></div><div className="editor-fields"><label className="editor-field editor-wide">Tour name<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. A quiet escape to Bali" required maxLength={80} /></label><label className="editor-field editor-wide">Destination<input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="e.g. Ubud, Indonesia" required maxLength={80} /></label><label className="editor-field">Duration (days)<input type="number" value={duration} onChange={(event) => setDuration(event.target.value)} min="1" max="365" placeholder="5" required /></label><label className="editor-field">Price per person (USD)<div className="currency-input"><span>$</span><input type="number" value={price} onChange={(event) => setPrice(event.target.value)} min="1" step="1" placeholder="850" required /></div></label><label className="editor-field editor-wide">Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What will travelers experience on this trip?" rows={4} maxLength={500} required /></label></div></div>
      <div className="editor-section"><div className="editor-section-title"><span>02</span><div><h2>Presentation</h2><p>Choose a cover image and publishing status.</p></div></div><div className="editor-fields"><label className="editor-field editor-wide">Cover image URL <span className="field-optional">(optional)</span><div className="image-url-input"><ImagePlus size={17} /><input type="url" value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://example.com/your-tour-photo.jpg" /></div></label><label className="editor-field editor-wide">Tour status<select value={status} onChange={(event) => setStatus(event.target.value as TourStatus)}><option value="Draft">Draft — only visible to your team</option><option value="Published">Published — available to travelers</option></select></label></div></div>
      <div className="editor-actions"><Link href="/dashboard/tours" className="button button-outline">Cancel</Link><button className="button button-primary" type="submit"><Check size={17} /> {submitLabel}</button></div>
    </form>
  </div>;
}
