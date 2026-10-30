"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Compass, Eye, EyeOff } from "lucide-react";

type AuthFormProps = { mode: "login" | "register" };

export function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === "register";
  const [showPassword, setShowPassword] = useState(false);




  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <Link href="/" className="brand auth-brand" aria-label="Elsewhere home">
          <span className="brand-mark"><Compass size={20} strokeWidth={1.8} /></span>
          <span>elsewhere<span className="brand-period">.</span><small>TRAVEL, THOUGHTFULLY</small></span>
        </Link>

        <div className="auth-form-wrap">
          <Link href="/" className="back-link"><ArrowLeft size={15} /> Back to home</Link>
          <span className="eyebrow auth-eyebrow">{isRegister ? "CREATE YOUR FREE ACCOUNT" : "YOUR ELSEWHERE ACCOUNT"}</span>
          <h1>{isRegister ? "Create your account" : "Welcome back"}</h1>
          <p className="auth-intro">{isRegister ? "Save your favorite trips and keep your travel plans in one place." : "Enter your email and password to view your trips and saved places."}</p>

          <form className="auth-form" action="/">
            {isRegister && <div className="auth-field"><label htmlFor="name">Full name</label><input id="name" name="name" type="text" placeholder="Enter your full name" autoComplete="name" required /></div>}
            <div className="auth-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="name@example.com" autoComplete="email" required /></div>
            <div className="auth-field"><div className="password-label"><label htmlFor="password">Password</label>{!isRegister && <Link href="/login">Forgot password?</Link>}</div><div className="password-input"><input id="password" name="password" type={showPassword ? "text" : "password"} placeholder={isRegister ? "At least 8 characters" : "Enter your password"} autoComplete={isRegister ? "new-password" : "current-password"} minLength={8} required /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{isRegister && <span className="field-hint">Use at least 8 characters.</span>}</div>
            {isRegister && <label className="check-label"><input type="checkbox" required /> <span>I agree to the <Link href="/login">Terms of Service</Link> and <Link href="/login">Privacy Policy</Link>.</span></label>}
            <button className="button button-primary auth-submit" type="submit">{isRegister ? "Create account" : "Log in"} <ArrowRight size={17} /></button>
          </form>

          <div className="auth-switch">{isRegister ? "Already have an account?" : "Don’t have an account yet?"} <Link href={isRegister ? "/login" : "/register"}>{isRegister ? "Log in" : "Create account"}</Link></div>
          <p className="auth-terms">By continuing, you agree to our <Link href="/login">Terms</Link> and <Link href="/login">Privacy Policy</Link>.</p>
        </div>
        <div className="auth-foot"><span>© 2025 Elsewhere Travel Co.</span><Link href="/login">Need help?</Link></div>
      </section>

      <aside className={`auth-aside ${isRegister ? "auth-aside-register" : ""}`}>
        <div className="auth-aside-overlay" />
        <div className="auth-aside-copy"><span className="eyebrow hero-eyebrow">THE WORLD IS A LITTLE CLOSER</span><h2>Go where<br />you <em>feel most alive.</em></h2><div className="aside-review"><span className="review-stars">★★★★★</span><p>“The kind of trip that stays with you long after you’re home.”</p><small>— Maya R., traveled with us in Portugal</small></div></div>
        <span className="auth-aside-location">Aït Benhaddou, Morocco</span>
      </aside>
    </main>
  );
}
