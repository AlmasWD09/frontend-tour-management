"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  LoaderCircle,
  MailCheck,
  RotateCw,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  useSendOtpApiMutation,
  useVerifyOtpApiMutation,
} from "@/redux/api/web-auth/authApi";

type VerifyOtpFormProps = { email: string };

export function VerifyOtpForm({ email }: VerifyOtpFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpApiMutation();
  const [sendOtp, { isLoading: isResending }] = useSendOtpApiMutation();

  async function onVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) {
      toast.error("Email address is missing. Please register again.");
      return;
    }

    try {
      await verifyOtp({ email, otp }).unwrap();
      toast.success("Email verification complete.");
      router.replace("/login");
    } catch {
      toast.error("We couldn't verify that code. Check it and try again.");
    }
  }

  async function onResend() {
    if (!email) {
      toast.error("Email address is missing. Please register again.");
      return;
    }

    try {
      await sendOtp({ email }).unwrap();
      setOtp("");
      toast.success("A new verification code has been sent.");
    } catch {
      toast.error("We couldn't send a new code. Please try again shortly.");
    }
  }

  return (
    <section className="w-full rounded-[13px] border border-[#e5e8e1] bg-gradient-to-br from-white to-[#fbfcf9] p-[clamp(1.4375rem,3vw,2.125rem)] shadow-[0_18px_55px_#26372a12] max-sm:rounded-xl max-sm:p-[21px] [@media(max-height:760px)]:py-[17px] [@media(max-height:620px)]:px-5 [@media(max-height:620px)]:py-[13px]" aria-labelledby="otp-title">
      <div className="mb-[15px] grid size-[46px] place-items-center rounded-[13px] border border-[#dce7dc] bg-[#f0f6ef] text-primary max-sm:mb-4 max-sm:size-11 [@media(max-height:760px)]:mb-2 [@media(max-height:760px)]:size-10 [@media(max-height:620px)]:hidden" aria-hidden="true">
        <MailCheck size={25} strokeWidth={1.8} />
      </div>
      <span className="eyebrow auth-eyebrow mb-2 block text-[9px] tracking-[1.5px] [@media(max-height:620px)]:mb-1">ONE LAST STEP</span>
      <h1 className="!mb-[10px] !mt-0 !text-[clamp(31px,3.2vw,39px)] !leading-[1.12] !tracking-[-1.4px] max-sm:!text-[30px] [@media(max-height:760px)]:!mb-[7px] [@media(max-height:620px)]:!text-[27px]" id="otp-title">Verify your email</h1>
      <p className="mb-4 text-[13px] leading-[1.7] text-[#737970] max-sm:mb-4 max-sm:text-xs [@media(max-height:760px)]:mb-3 [@media(max-height:760px)]:leading-[1.55]">
        We sent a 6-digit verification code to your inbox. Enter it below to
        finish setting up your account.
      </p>

      {email ? (
        <div className="mb-4 flex flex-col gap-[5px] rounded-lg border border-[#e8ebe5] bg-[#f7f8f5] px-[15px] py-3 [@media(max-height:760px)]:mb-3 [@media(max-height:760px)]:py-[9px] [@media(max-height:620px)]:mb-2">
          <span className="text-[9px] font-bold tracking-[1px] text-[#8a9087]">CODE SENT TO</span>
          <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-semibold text-[#343a34]" title={email}>{email}</strong>
        </div>
      ) : (
        <div className="mb-[18px] text-xs leading-relaxed text-[#a64840]" role="alert">
          We couldn't find your email address. <Link href="/register">Register again</Link>.
        </div>
      )}

      <form className="flex flex-col" onSubmit={onVerify}>
        <label className="mb-2 text-xs font-semibold text-[#343a34]" htmlFor="verification-otp">Verification code</label>
        <input
          className="h-14 w-full rounded-lg border border-[#d8dcd5] bg-white px-[14px] text-center text-2xl font-semibold tracking-[.48em] text-[#26332b] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-[#c4c9c0] max-sm:h-[54px] max-sm:text-[22px] [@media(max-height:760px)]:h-[52px] [@media(max-height:620px)]:h-11 [@media(max-width:380px)]:text-[21px]"
          id="verification-otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="000000"
          value={otp}
          onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
          pattern="[0-9]{6}"
          maxLength={6}
          required
          aria-describedby="otp-hint"
        />
        <span className="mt-2 text-[10px] leading-[1.55] text-[#858b82] [@media(max-height:760px)]:mt-[5px] [@media(max-height:760px)]:leading-[1.35]" id="otp-hint">
          The code expires in 2 minutes. Check your Spam or Junk folder if you
          don't see the email.
        </span>
        <button
          className="button button-primary mt-[14px] flex min-h-[46px] items-center justify-center gap-[9px] rounded-lg text-[13px] [@media(max-height:760px)]:mt-3 [@media(max-height:620px)]:mt-2 [@media(max-height:620px)]:min-h-10"
          type="submit"
          disabled={isVerifying || !email || otp.length !== 6}
        >
          {isVerifying ? (
            <><LoaderCircle className="animate-spin" size={17} /> Verifying...</>
          ) : (
            <>Verify email <ArrowRight size={17} /></>
          )}
        </button>
      </form>

      <div className="mt-[11px] flex flex-wrap items-center justify-center gap-x-2 gap-y-[5px] text-[11px] text-[#737970] [@media(max-height:760px)]:mt-2 [@media(max-height:620px)]:mt-[5px]">
        <span>Didn't receive the code?</span>
        <button className="inline-flex items-center gap-[6px] px-0.5 py-[5px] font-bold text-primary disabled:cursor-wait disabled:opacity-60" type="button" onClick={onResend} disabled={isResending || !email}>
          {isResending ? (
            <><LoaderCircle className="animate-spin" size={14} /> Sending...</>
          ) : (
            <><RotateCw size={14} /> Resend code</>
          )}
        </button>
      </div>

      <div className="mt-[13px] flex items-start gap-2 rounded-lg border border-[#e3ebe1] bg-[#f4f8f2] px-[13px] py-[9px] text-[10px] leading-snug text-[#667264] [@media(max-height:760px)]:mt-[9px] [@media(max-height:760px)]:py-2 [@media(max-height:620px)]:hidden">
        <ShieldCheck className="shrink-0 text-primary" size={17} aria-hidden="true" />
        <span>Your account stays secure until your email is verified.</span>
      </div>

      <div className="auth-switch !mt-[11px] !text-[10px] !leading-relaxed [@media(max-height:760px)]:!mt-2 [@media(max-height:620px)]:!mt-[5px]">
        Need to use a different email? <Link href="/register">Go back to registration</Link>
      </div>
    </section>
  );
}
