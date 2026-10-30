import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import { SiteFooter, SiteHeader } from "./components/site-header";

const trips = [
  { name: "A quiet escape to Bali", place: "Ubud, Indonesia", price: "$840", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85", tag: "Most loved", rating: "4.96" },
  { name: "The blue streets of Chefchaouen", place: "Chefchaouen, Morocco", price: "$620", image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=900&q=85", tag: "Culture trip", rating: "4.92" },
  { name: "Slow mornings in the Dolomites", place: "South Tyrol, Italy", price: "$1,140", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85", tag: "Small group", rating: "4.98" },
];

const benefits = [
  { icon: Compass, title: "Trips with a point of view", text: "Thoughtful itineraries made by people who know and love the place." },
  { icon: ShieldCheck, title: "Good people, all the way", text: "Local hosts, small groups, and support whenever you need it." },
  { icon: Sparkles, title: "The details are handled", text: "Stay curious. We’ll take care of the planning, pacing, and little things." },
];

export default function Home() {
  return <><SiteHeader /><main>
    <section className="hero">
      <div className="hero-shade" />
      <div className="hero-content container mx-auto max-w-[1180px] px-5">
        <span className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> MADE FOR THE WAY YOU WANDER</span>
        <h1>Somewhere new<br />feels like <em>yourself.</em></h1>
        <p>Good trips make room for the unexpected. Find your next somewhere with people who know it best.</p>
        <div className="hero-actions"><Link href="/register" className="button button-light">Find your next trip <ArrowRight size={17} /></Link><a href="#trips" className="hero-text-link">Explore the collection <ArrowUpRight size={16} /></a></div>
        <div className="hero-note"><span className="avatar-stack"><i>J</i><i>M</i><i>A</i></span><span><b>Loved by 12,000+ travelers</b><small>Real people. Really good trips.</small></span></div>
      </div>
      <div className="hero-caption"><MapPin size={14} /> Madeira, Portugal <span>·</span> 32°44&apos; N 16°57&apos; W</div>
      <div className="hero-index">01 <span /> 04</div>
    </section>

    <section className="intro-section container mx-auto max-w-[1180px] px-5">
      <div><span className="eyebrow">A BETTER WAY TO GET AWAY</span><h2>Less itinerary.<br /><em>More feeling.</em></h2></div>
      <div className="intro-copy"><p>We believe the best trips aren’t measured by how much you see. They’re about the conversations, the detours, and that feeling of being exactly where you’re meant to be.</p><Link href="/register" className="underlined-link">A little more about us <ArrowUpRight size={16} /></Link></div>
    </section>

    <section className="trips-section" id="trips"><div className="container mx-auto max-w-[1180px] px-5"><div className="section-heading"><div><span className="eyebrow">A FEW PLACES TO BEGIN</span><h2>Good trips, <em>good stories.</em></h2></div><Link href="/register" className="underlined-link desktop-link">See every trip <ArrowRight size={16} /></Link></div>
      <div className="trip-grid">{trips.map((trip) => <article className="trip-card" key={trip.name}><Link href="/register" className="trip-image" style={{ backgroundImage: `url('${trip.image}')` }} aria-label={`Explore ${trip.name}`}><span className="trip-tag">{trip.tag}</span><span className="trip-save"><Star size={15} /></span></Link><div className="trip-meta"><div><h3>{trip.name}</h3><p><MapPin size={13} /> {trip.place}</p></div><span className="trip-rating"><Star size={13} fill="currentColor" /> {trip.rating}</span></div><div className="trip-price">From <b>{trip.price}</b> <span>/ person</span></div></article>)}</div>
      <Link href="/register" className="underlined-link mobile-link">See every trip <ArrowRight size={16} /></Link>
    </div></section>

    <section className="values-section container mx-auto max-w-[1180px] px-5"><div className="values-heading"><span className="eyebrow">THE WAY WE TRAVEL</span><h2>Thoughtful by<br /><em>nature.</em></h2><p>Travel should leave you with more than photos. We make space for the kind of moments that stay with you.</p></div><div className="benefit-list">{benefits.map(({icon: Icon, title, text}, i) => <div className="benefit" key={title}><span className="benefit-number">0{i + 1}</span><span className="benefit-icon"><Icon size={21} strokeWidth={1.6} /></span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="benefit-arrow" size={18} /></div>)}</div></section>

    <section className="cta-section"><div className="cta-image" /><div className="cta-content container mx-auto max-w-[1180px] px-5"><span className="eyebrow hero-eyebrow">YOUR NEXT CHAPTER IS OUT THERE</span><h2>Take the<br /><em>long way.</em></h2><p>There’s a little more life waiting beyond the usual. Let’s go find it.</p><Link href="/register" className="button button-light">Start somewhere <ArrowRight size={17} /></Link></div><span className="cta-location"><MapPin size={14} /> Dolomites, Italy</span></section>
  </main><SiteFooter /></>;
}
