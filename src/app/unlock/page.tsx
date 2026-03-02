"use client";

import React from "react";
import { MatchFoundOtpWaiting } from "../../components/screens/MatchFoundOtpWaiting";
import { NoMatchFound } from "../../components/screens/NoMatchFound";
import { UnlockConfirmed } from "../../components/screens/UnlockConfirmed";
import { UnlockEntry } from "../../components/screens/UnlockEntry";

type UnlockState = "ENTRY" | "OTP" | "NO_MATCH" | "CONFIRMED";

export default function UnlockPage() {
  const [step, setStep] = React.useState<UnlockState>("ENTRY");

  return (
    <>
      {step === "ENTRY" && (
        <UnlockEntry 
          onSearch={(found) => {
            if (found) setStep("OTP");
            else setStep("NO_MATCH");
          }} 
        />
      )}
      {step === "OTP" && (
        <MatchFoundOtpWaiting onConfirm={() => setStep("CONFIRMED")} />
      )}
      {step === "NO_MATCH" && (
        <NoMatchFound onRetry={() => setStep("ENTRY")} />
      )}
      {step === "CONFIRMED" && (
        <UnlockConfirmed />
      )}
    </>
  );
}
