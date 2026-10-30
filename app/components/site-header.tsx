"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Compass, Menu, X } from "lucide-react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="nav-inner container mx-auto max-w-[1180px] px-5">
        <Link href="/" className="brand" onClick={closeMenu} aria-label="Elsewhere home">
          <span className="brand-mark"><Compass size={20} strokeWidth={1.8} /></span>
          <span>elsewhere<span className="brand-period">.</span><small>TRAVEL, THOUGHTFULLY</small></span>
        </Link>

        <nav id="main-navigation" className={`nav-links ${open ? "nav-open" : ""}`} aria-label="Main navigation">
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/#trips" onClick={closeMenu}>Explore trips</Link>
          <Link href="/#about" onClick={closeMenu}>About us</Link>
        </nav>
        <div className="nav-desktop-actions">
          <Link href="/login" className="login-link">Log in</Link>
          <Link href="/register" className="button button-primary nav-cta">Create account <ArrowRight size={15} /></Link>
        </div>
        <button className="menu-toggle" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return <footer className="site-footer" id="about"><div className="container mx-auto max-w-[1180px] px-5"><div className="footer-top"><div className="footer-brand-block"><Link href="/" className="brand footer-brand"><span className="brand-mark"><Compass size={20} strokeWidth={1.8} /></span><span>elsewhere<span className="brand-period">.</span><small>TRAVEL, THOUGHTFULLY</small></span></Link><p>For the places that change<br />the way you see things.</p></div><div className="footer-column"><span>EXPLORE</span><Link href="/#trips">All trips</Link><Link href="/#trips">Our approach</Link><Link href="/register">Gift a trip</Link></div><div className="footer-column"><span>HERE TO HELP</span><Link href="/login">Your bookings</Link><Link href="/login">Get in touch</Link><Link href="/login">FAQs</Link></div><div className="footer-newsletter"><span>A LETTER FROM ELSEWHERE</span><p>Notes, places, and things worth getting out of bed for.</p><form action="/register" className="newsletter-form"><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" placeholder="Your email address" required /><button aria-label="Subscribe"><ArrowRight size={17} /></button></form></div></div><div className="footer-bottom"><span>© 2025 Elsewhere Travel Co.</span><span>Made for going places <span className="footer-heart">♥</span></span><div><Link href="/login">Privacy</Link><Link href="/login">Terms</Link></div></div></div></footer>;
}
