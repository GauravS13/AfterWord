import { redirect } from "next/navigation";

/**
 * /invite?token=... landing page for invitees.
 * Redirects to the VerificationGate where the invitee verifies
 * the deceased's identity before accessing the estate.
 */
export default async function InvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    redirect("/");
  }

  // Redirect to the VerificationGate with the invite token
  redirect(`/verify/${encodeURIComponent(token)}`);
}
