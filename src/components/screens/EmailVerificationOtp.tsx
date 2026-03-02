"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";

export interface EmailVerificationOtpProps { className?: string; }

export const EmailVerificationOtp: React.FC<EmailVerificationOtpProps> = () => {
  const router = useRouter();
  const verifyEmail = useMutation(api.owners.verifyEmail);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailMsg, setEmailMsg] = useState("");

  useEffect(() => {
    // Read from localStorage (set by CreateOwnerAccount)
    const email = localStorage.getItem("pending_signup_email");
    if (email) {
      setEmailMsg(`We sent a code to ${email}`);
    } else {
      router.push("/setup");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const email = localStorage.getItem("pending_signup_email");
      const pass  = localStorage.getItem("pending_signup_pass");
      if (!email || !pass) {
        throw new Error("Missing signup data. Please start over.");
      }

      // Hackathon simple hash:
      const emailHash = btoa(email);
      const passphraseHash = btoa(pass);

      const result = await verifyEmail({ emailHash, otpCode: otp, passphraseHash });
      
      // Verification success! Store ownerId and proceed
      localStorage.setItem("ownerId", result.ownerId);
      localStorage.removeItem("pending_signup_email");
      localStorage.removeItem("pending_signup_pass");

      router.push("/setup/about-you");

    } catch (err: any) {
      setError(err.message || "Invalid OTP code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-slate-100 h-screen overflow-hidden flex flex-row">
      {/* Left Sidebar (35%) */}
      <aside className="hidden md:flex w-[35%] h-full bg-[#0A1618] text-white p-12 flex-col justify-between relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: "radial-gradient(#13daec 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        ></div>
        
        <div className="relative z-10">
          <h1 className="text-2xl font-bold tracking-tight mb-20 text-white">Afterword</h1>
          <div className="mt-12">
            <p className="text-[#13ecec] text-sm font-medium mb-2">Step 1: Account Security</p>
            <div className="w-full h-[2px] bg-[#1c3535] rounded-full">
              <div className="w-2/4 h-full bg-[#13ecec] rounded-full shadow-[0_0_10px_#13ecec]"></div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10">
          <span className="material-symbols-outlined text-primary text-4xl mb-6 block">mark_email_read</span>
          <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-200">
            "Your digital assets are sensitive. We verify every account to ensure zero spam and absolute security for your estate."
          </p>
        </div>
      </aside>

      {/* Right Content (65%) */}
      <main className="w-full md:w-[65%] h-full flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto bg-[#102222]">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-4 mb-6 bg-[#13ecec]/10 rounded-full">
              <span className="material-symbols-outlined text-[#13ecec] text-3xl">mark_email_unread</span>
            </div>
            <h2 className="text-[32px] font-bold text-white mb-2">Check your email</h2>
            <p className="text-[#849a9a]">
              {emailMsg || "Enter the 6-digit verification code sent to your email address."}
            </p>
          </div>
          
          <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#849a9a] uppercase tracking-wider text-center">
                Verification Code
              </label>
              <input 
                autoFocus
                className="w-full h-14 px-4 text-center text-2xl tracking-[0.5em] rounded-md border border-[#254242] bg-transparent text-white focus:border-[#13ecec] focus:ring-1 focus:ring-[#13ecec] placeholder-[#4f6464] transition-colors" 
                maxLength={6}
                placeholder="000000" 
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} // only numbers
              />
            </div>
            
            {error && (
              <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-md text-center">
                {error}
              </div>
            )}
            
            <button 
              disabled={otp.length !== 6 || loading}
              className="mt-4 w-full h-12 bg-[#13ecec] hover:bg-[#0fbccb] disabled:bg-[#1c3535] disabled:text-[#4f6464] text-[#0A1618] font-bold text-base rounded-md transition-colors flex items-center justify-center gap-2"
              type="submit"
            >
              <span>{loading ? "Verifying..." : "Verify & Continue"}</span>
              {!loading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
            </button>
            
            <p className="text-[14px] text-center text-[#849a9a] mt-4">
              Didn't receive a code? <button className="text-[#13ecec] hover:text-white" type="button">Resend</button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};
