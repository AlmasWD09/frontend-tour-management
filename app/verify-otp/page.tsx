import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthPageLayout } from "../components/auth-page-layout";
import { VerifyOtpForm } from "../components/verify-otp-form";

export const metadata: Metadata = {
  title: "Verify your email - Elsewhere",
  description: "Verify your email address to finish creating your account.",
};

type VerifyOtpPageProps = PageProps<"/verify-otp">;

export default function VerifyOtpPage({ searchParams }: VerifyOtpPageProps) {
  return (
    <AuthPageLayout isOtp>
      <Suspense fallback={<p className="auth-intro">Loading verification page...</p>}>
        <VerifyOtpContent searchParams={searchParams} />
      </Suspense>
    </AuthPageLayout>
  );
}

async function VerifyOtpContent({ searchParams }: VerifyOtpPageProps) {
  const params = await searchParams;
  const email = Array.isArray(params.email) ? params.email[0] : params.email;

  return <VerifyOtpForm email={email ?? ""} />;
}
