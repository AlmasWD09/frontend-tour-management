"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useLoginApiMutation } from "@/redux/api/web-auth/authApi";
import { saveAccessToken } from "@/redux/auth-token";

type LoginValues = { email: string; password: string };
type LoginResponse = {
  success?: boolean;
  message?: string;
  data?: { accessToken?: string };
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loginApi, { isLoading }] = useLoginApiMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = (await loginApi(payload).unwrap()) as LoginResponse;
      // console.log("res---- 40 --->", response);

      const accessToken = response.data?.accessToken;
      if (!accessToken) {
        toast.error(response.message || "");
        return;
      }

      saveAccessToken(accessToken);
      toast.success(response.message || "");
      reset();
      router.replace("/dashboard");
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "",
      );
    }
  }

  return (
    <>
      <span className="eyebrow auth-eyebrow">YOUR ELSEWHERE ACCOUNT</span>
      <h1>Welcome back</h1>
      <p className="auth-intro">
        Enter your email and password to view your trips and saved places.
      </p>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="auth-field">
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            {...register("email", {
              required: "Enter your email address.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address.",
              },
            })}
          />
          {errors.email && (
            <span className="auth-field-error" id="login-email-error">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="auth-field">
          <div className="password-label">
            <label htmlFor="login-password">Password</label>
            <Link href="/login">Forgot password?</Link>
          </div>
          <div
            className={`password-input ${errors.password ? "input-invalid" : ""}`}
          >
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={
                errors.password ? "login-password-error" : undefined
              }
              {...register("password", { required: "Enter your password." })}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="auth-field-error" id="login-password-error">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          className="button button-primary auth-submit"
          type="submit"
          disabled={isSubmitting || isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"} <ArrowRight size={17} />
        </button>
      </form>
      <div className="auth-switch">
        Don’t have an account yet? <Link href="/register">Create account</Link>
      </div>
      <p className="auth-terms">
        By continuing, you agree to our <Link href="/login">Terms</Link> and{" "}
        <Link href="/login">Privacy Policy</Link>.
      </p>
    </>
  );
}
