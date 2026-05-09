"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. Access Denied.");
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-gutter">
      <div className="w-full max-w-md">
        <div className="mb-stack-lg text-center">
          <span className="font-display-lg-mobile text-headline-md text-on-surface border-b-4 border-primary">
            MAGED ALMOLIKY
          </span>
          <h1 className="font-label-mono text-label-mono uppercase tracking-widest mt-8">
            Terminal Access / Admin Login
          </h1>
        </div>

        <div className="border-2 border-on-surface bg-surface-container-lowest p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(26,25,48,1)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
            {error && (
              <div className="bg-error-container text-on-error-container border border-on-surface p-4 font-label-mono text-xs uppercase">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label
                className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border border-on-surface font-body-md text-body-md text-on-surface p-4 w-full focus:outline-none focus:border-primary focus:border-2 bg-transparent"
                id="email"
                name="email"
                type="email"
                placeholder="admin@alexzenkins.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border border-on-surface font-body-md text-body-md text-on-surface p-4 w-full focus:outline-none focus:border-primary focus:border-2 bg-transparent"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              className={`brutalist-button-primary bg-on-surface text-on-primary font-label-mono text-label-mono uppercase tracking-widest p-6 w-full flex justify-between items-center mt-4 border border-on-surface hover:bg-primary hover:border-primary transition-all shadow-[4px_4px_0px_0px_rgba(26,25,48,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              type="submit"
            >
              <span>{isLoading ? "Authenticating..." : "Authorize Access"}</span>
              <span className="material-symbols-outlined">key</span>
            </button>
          </form>
        </div>

        <div className="mt-stack-lg text-center">
          <a
            href="/"
            className="font-label-mono text-xs uppercase text-on-surface-variant hover:text-primary transition-colors"
          >
            ← Return to Public Site
          </a>
        </div>
      </div>
    </div>
  );
}
