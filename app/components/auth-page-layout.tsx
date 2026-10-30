import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Compass } from "lucide-react";

export function AuthPageLayout({ children, isRegister = false }: { children: ReactNode; isRegister?: boolean }) {
  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <Link href="/" className="brand auth-brand" aria-label="Elsewhere home">
          <span className="brand-mark"><Compass size={20} strokeWidth={1.8} /></span>
          <span>elsewhere<span className="brand-period">.</span><small>TRAVEL, THOUGHTFULLY</small></span>
        </Link>
        <div className="auth-form-wrap">
          <Link href="/" className="back-link"><ArrowLeft size={15} /> Back to home</Link>
          {children}
        </div>
        <div className="auth-foot"><span>© 2025 Elsewhere Travel Co.</span><Link href="/login">Need help?</Link></div>
      </section>
      <aside className={`auth-aside ${isRegister ? "auth-aside-register" : ""}`}>
        <div className="auth-aside-overlay" />
        <div className="auth-aside-copy">
          <span className="eyebrow hero-eyebrow">THE WORLD IS A LITTLE CLOSER</span>
          <h2>Go where<br />you <em>feel most alive.</em></h2>
          <div className="aside-review"><span className="review-stars">★★★★★</span><p>“The kind of trip that stays with you long after you’re home.”</p><small>— Maya R., traveled with us in Portugal</small></div>
        </div>
        <span className="auth-aside-location">Aït Benhaddou, Morocco</span>
      </aside>
    </main>
  );
}
