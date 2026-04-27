"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "../../lib/auth";

export default function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (password.trim().length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const result = loginUser(email, password);

    if (!result.success) {
      setError(result.error ?? "Invalid email or password");
      return;
    }

    setError(null);
    router.push("/dashboard");
  }

  return (
    <form
      action={handleSubmit}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8"
    >
      <h2 className="text-2xl font-bold mb-2 text-(--primary) text-center md:text-left">
        Welcome Back
      </h2>

      <p className="text-sm mb-6 text-slate-500 text-center md:text-left">
        Continue building intentional routines.
      </p>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 text-(--primary)"
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            data-testid="auth-login-email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-2 text-(--primary)"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            data-testid="auth-login-password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        data-testid="auth-login-submit"
        className="mt-6 w-full rounded-xl px-4 py-3 font-semibold text-white bg-(--primary) hover:opacity-95"
      >
        Sign In
      </button>

      <div className="mt-5 text-center text-sm text-slate-500">
        New to Routines?{" "}
        <p className="inline-block text-slate-500 hover:text-(--tertiary)">
            <Link
            href="/signup"
            className="font-medium"
            >
               Create an account
            </Link>
        </p>
      </div>
    </form>
  );
}