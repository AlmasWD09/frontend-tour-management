import type { Metadata } from "next";
import { AuthPageLayout } from "../components/auth-page-layout";
import { LoginForm } from "../components/login-form";


export const metadata: Metadata = { title: "Log in — Elsewhere", description: "Sign in to your Elsewhere travel account." };

export default function LoginPage() {
  return <AuthPageLayout><LoginForm /></AuthPageLayout>;
}
