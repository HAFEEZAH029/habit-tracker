"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupUser } from "../../lib/auth";

export default function SignupForm() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.trim().length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    const result = signupUser(email, password);

    if (!result.success) {
      setError(result.error || "User already exists");
      return;
    }

    setError(null);
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 mx-auto mb-4 bg-(--primary) rounded-xl flex items-center justify-center text-white text-xl">
          ✨
        </div>

        <h1 className="text-2xl font-bold text-(--primary) mb-2">
          Create your account
        </h1>

        <p className="text-sm text-slate-500">
          Experience the calm of disciplined progress.
        </p>
      </div>

      {/* Form Card */}
      <form
        action={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      >
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">
              EMAIL ADDRESS
            </label>

            <input
              name="email"
              type="email"
              placeholder="alex@routines.app"
              data-testid="auth-signup-email"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">
              PASSWORD
            </label>

            <input
              name="password"
              type="password"
              data-testid="auth-signup-password"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-100"
            />

            <p className="text-xs text-slate-400 mt-2">
              Must be at least 8 characters.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          data-testid="auth-signup-submit"
          className="mt-6 w-full rounded-xl py-3 font-semibold text-white bg-(--primary) hover:opacity-95 transition"
        >
          Get Started →
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <p className="inline-block text-slate-500 hover:text-(--tertiary)">
            <Link
            href="/login"
            className=" font-medium"
            >
              Log in
            </Link>
        </p>
      </div>
    </div>
  );
}