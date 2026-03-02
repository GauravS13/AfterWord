import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { EstateBoard } from "../../../components/screens/EstateBoard";

export default async function EstateBoardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ownerId = id as Id<"owners">;

  // Fetch owner accounts server-side (no auth needed for invitee access)
  const ownerAccounts = await fetchQuery(api.owners.getOwnerAccountsByOwnerId, { ownerId });

  return <EstateBoard id={id} ownerAccounts={ownerAccounts} />;
}
