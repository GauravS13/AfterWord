import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { VerificationGate } from "../../../components/screens/VerificationGate";

export default async function VerificationGatePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  // Call Convex query server-side (no auth needed)
  const tokenData = await fetchQuery(api.inviteTokens.validateInviteToken, { rawToken: token });

  return <VerificationGate token={token} tokenData={tokenData} />;
}
