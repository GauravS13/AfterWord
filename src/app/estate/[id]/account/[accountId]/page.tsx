import { AccountPlaybook } from "../../../../../components/screens/AccountPlaybook";

export default function AccountPlaybookPage({ params }: { params: { id: string; accountId: string } }) {
  return <AccountPlaybook id={params.id} accountId={params.accountId} />;
}
