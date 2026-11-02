"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useRegisterApiMutation, useSendOtpApiMutation } from "@/redux/api/web-auth/authApi";
import toast from "react-hot-toast";

type RegisterValues = {
  fullName: string;
  email: string;
  password: string;
  termsAccepted: boolean;
};

function getEnglishMessage(message: string | undefined, fallback: string) {
  return message && !/[\u0980-\u09ff]/.test(message) ? message : fallback;
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessingRegistration, setIsProcessingRegistration] = useState(false);
  const [submittingStep, setSubmittingStep] = useState<"register" | "otp">("register");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterValues>({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      termsAccepted: false,
    },
  });

  const [registerApi] = useRegisterApiMutation();
  const [sendOtpApi] = useSendOtpApiMutation();

  const onSubmit = async (values: RegisterValues) => {
    setIsProcessingRegistration(true);
    setSubmittingStep("register");
    const payload = {
      name: values.fullName,
      email: values.email,
      password: values.password,
    };


    try {
      const res = await registerApi(payload).unwrap();
      toast.success(getEnglishMessage(res?.message, "Account created successfully."));
      reset();
      setSubmittingStep("otp");
      try {
        await sendOtpApi({ email: payload.email }).unwrap();
        toast.success("A verification code has been sent to your email.");
      } catch {
        toast.error("We couldn't send the code. Use Resend OTP on the verification page.");
      }
      router.push(`/verify-otp?email=${encodeURIComponent(payload.email)}`);
    } catch (error) {
      setIsProcessingRegistration(false);
      toast.error(
        getEnglishMessage(
          (error as { data?: { message?: string } })?.data?.message,
          "We couldn't create your account. Please check your details and try again.",
        ),
      );
    }
  };




  return (
    <div className="register-form-content">
      {isProcessingRegistration && (
        <div className="register-loading-overlay" role="status" aria-live="polite">
          <LoaderCircle className="register-loading-spinner" size={38} />
          <strong>
            {submittingStep === "register"
              ? "Creating your account…"
              : "Sending your verification code…"}
          </strong>
          <span>Please wait while we prepare email verification.</span>
        </div>
      )}
      <span className="eyebrow auth-eyebrow">CREATE YOUR FREE ACCOUNT</span>
      <h1>Create your account</h1>
      <p className="auth-intro">
        Save your favorite trips and keep your travel plans in one place.
      </p>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="auth-field">
          <label htmlFor="register-name">Full name</label>
          <input
            id="register-name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            aria-describedby={
              errors.fullName ? "register-name-error" : undefined
            }
            {...register("fullName", {
              required: "Enter your full name.",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters.",
              },
            })}
          />
          {errors.fullName && (
            <span className="auth-field-error" id="register-name-error">
              {errors.fullName.message}
            </span>
          )}
        </div>
        <div className="auth-field">
          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "register-email-error" : undefined}
            {...register("email", {
              required: "Enter your email address.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address.",
              },
            })}
          />
          {errors.email && (
            <span className="auth-field-error" id="register-email-error">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="auth-field">
          <label htmlFor="register-password">Password</label>
          <div
            className={`password-input ${errors.password ? "input-invalid" : ""}`}
          >
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              aria-describedby={
                errors.password ? "register-password-error" : undefined
              }
              {...register("password", {
                required: "Create a password.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
              })}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password ? (
            <span className="auth-field-error" id="register-password-error">
              {errors.password.message}
            </span>
          ) : (
            <span className="field-hint">Use at least 8 characters.</span>
          )}
        </div>
        <div className="register-terms-field">
          <label className="check-label">
            <input
              type="checkbox"
              aria-invalid={!!errors.termsAccepted}
              aria-describedby={
                errors.termsAccepted ? "register-terms-error" : undefined
              }
              {...register("termsAccepted", {
                validate: (value) =>
                  value || "Please accept the terms to continue.",
              })}
            />{" "}
            <span>
              I agree to the <Link href="/login">Terms of Service</Link> and{" "}
              <Link href="/login">Privacy Policy</Link>.
            </span>
          </label>
          {errors.termsAccepted && (
            <span className="auth-field-error" id="register-terms-error">
              {errors.termsAccepted.message}
            </span>
          )}
        </div>
        <button
          className="button button-primary auth-submit"
          type="submit"
          disabled={isProcessingRegistration}
        >
          {isProcessingRegistration ? (
            <>
              <LoaderCircle className="auth-loading-icon" size={17} />
              {submittingStep === "register" ? "Creating account…" : "Sending OTP…"}
            </>
          ) : (
            <>Create account <ArrowRight size={17} /></>
          )}
        </button>
      </form>
      <div className="auth-switch">
        Already have an account? <Link href="/login">Log in</Link>
      </div>
      <p className="auth-terms">
        By continuing, you agree to our <Link href="/login">Terms</Link> and{" "}
        <Link href="/login">Privacy Policy</Link>.
      </p>
    </div>
  );
}
