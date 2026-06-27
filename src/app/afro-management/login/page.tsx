"use client";

import React, { useState, useTransition } from "react";
import { initiateLogin, verifyOTP } from "@/app/auth-actions";
import { FiTerminal, FiKey, FiLock, FiCpu, FiAlertTriangle } from "react-icons/fi";

export default function LoginPage() {
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // State 1 parameters
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // State 2 parameters
  const [otpCode, setOtpCode] = useState("");

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("password", password);

    startTransition(async () => {
      const res = await initiateLogin(formData);
      if (res.success) {
        setSuccessMsg(res.message || "Uplink authorization code sent.");
        setStep("otp");
      } else {
        setErrorMsg(res.error || "Failed to initiate authentication link.");
      }
    });
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    startTransition(async () => {
      const res = await verifyOTP(otpCode);
      // If it returns a result, it means there's a validation error.
      // (If successful, it redirects, which is handled by next/navigation)
      if (res && !res.success) {
        setErrorMsg(res.error || "Uplink code verification failed.");
      }
    });
  };

  return (
    <main className="max-w-md mx-auto px-6 pt-36 pb-24 min-h-screen text-zinc-100 font-mono flex flex-col justify-center">
      <div className="border border-zinc-800 bg-zinc-950/80 rounded-lg p-8 shadow-[0_0_30px_rgba(16,185,129,0.03)] border-t-2 border-t-emerald-500">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-4 mb-6">
          <div className="flex items-center gap-2 text-emerald-500">
            <FiTerminal className="text-xl animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-bold">SECURE_SHELL v1.2</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FiCpu className="text-emerald-500" /> Admin Terminal Access
          </h1>
          <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
            {step === "credentials" 
              ? "Verify root administrator identity to request verification payload." 
              : "Secure transmission sent. Input 2FA verification key."}
          </p>
        </div>

        {/* Step 1: Credentials Form */}
        {step === "credentials" && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">ADMIN_ID</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-zinc-500"><FiKey size={16} /></span>
                <input 
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Input Admin Identifier"
                  required
                  disabled={isPending}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded pl-10 pr-4 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:border-emerald-500/50 transition-all duration-300 placeholder:text-zinc-600 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">PASSWORD</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-zinc-500"><FiLock size={16} /></span>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Input Passkey"
                  required
                  disabled={isPending}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded pl-10 pr-4 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:border-emerald-500/50 transition-all duration-300 placeholder:text-zinc-600 disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-emerald-500 text-zinc-950 font-bold py-2.5 rounded hover:bg-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              {isPending ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full"></span>
                  Verifying credentials...
                </>
              ) : (
                "Initiate Auth Link"
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP Form */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">TWO_FACTOR_UPLINK_CODE</label>
              <input 
                type="text"
                maxLength={6}
                pattern="[0-9]{6}"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="######"
                required
                disabled={isPending}
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-3 text-center text-xl font-bold tracking-[8px] text-[var(--foreground)] focus:outline-none focus:border-emerald-500/50 transition-all duration-300 placeholder:text-zinc-700 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-emerald-500 text-zinc-950 font-bold py-2.5 rounded hover:bg-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              {isPending ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full"></span>
                  Verifying uplink code...
                </>
              ) : (
                "Verify Secure Uplink"
              )}
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                setStep("credentials");
                setErrorMsg(null);
                setSuccessMsg(null);
                setOtpCode("");
              }}
              className="w-full bg-transparent border border-zinc-800 text-zinc-400 py-2 rounded text-xs hover:bg-zinc-900 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Back to Credentials
            </button>
          </form>
        )}

        {/* Status Message Logs */}
        {(errorMsg || successMsg) && (
          <div className="mt-6 border-t border-zinc-900/60 pt-4 text-xs font-mono space-y-2">
            {successMsg && (
              <div className="text-emerald-500 bg-emerald-950/20 border border-emerald-900/40 p-2.5 rounded flex gap-2">
                <span>[INFO]:</span>
                <span>{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div className="text-red-500 bg-red-950/20 border border-red-900/40 p-2.5 rounded flex gap-2">
                <FiAlertTriangle className="flex-shrink-0 mt-0.5 text-red-400" />
                <div>
                  <span className="font-bold">[ERR_SEC]: </span>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
