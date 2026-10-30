import type { Metadata } from "next";
import { AuthPageLayout } from "../components/auth-page-layout";
import { RegisterForm } from "../components/register-form";


export const metadata: Metadata = { title: "Create an account — Elsewhere", description: "Create an Elsewhere account and start planning your next trip." };

export default function RegisterPage() {
  return <AuthPageLayout isRegister><RegisterForm /></AuthPageLayout>;
}
