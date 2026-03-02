import { Id } from "../../../../convex/_generated/dataModel";
import { ExecutorAddAccounts } from "../../../components/screens/ExecutorAddAccounts";

export default function ExecutorAddAccountsPage({ searchParams }: { searchParams: { estateId: string } }) {
  const estateId = searchParams.estateId as Id<"estates">;
  
  if (!estateId) {
    return <div className="p-8 text-center text-red-500">Missing estate context. Please start from the invitation link again.</div>;
  }
  
  return <ExecutorAddAccounts estateId={estateId} />;
}
