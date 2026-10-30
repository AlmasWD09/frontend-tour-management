import Link from "next/link";
import { ArrowLeft, Compass, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-top"><Link href="/" className="brand"><span className="brand-mark"><Compass size={20} strokeWidth={1.8} /></span><span>elsewhere<span className="brand-period">.</span><small>TRAVEL, THOUGHTFULLY</small></span></Link></div>
      <section className="not-found-content">
        <span className="not-found-coordinate"><MapPin size={14} /> SOMEWHERE OFF THE MAP</span>
        <p className="not-found-code">404</p>
        <h1>This stop isn’t<br /><em>on the map.</em></h1>
        <p className="not-found-copy">Looks like this page took a different turn. Let’s get you back to somewhere familiar.</p>
        <Link href="/" className="button button-primary"><ArrowLeft size={16} /> Back to home</Link>
      </section>
      <span className="not-found-decoration" aria-hidden="true">N</span>
      <p className="not-found-caption">THE BEST JOURNEYS HAVE A WAY BACK</p>
    </main>
  );
}
