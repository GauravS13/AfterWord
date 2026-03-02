import { EvidenceBundle } from "../../../../components/screens/EvidenceBundle";

export default function EvidenceBundlePage({ params }: { params: { id: string } }) {
  return <EvidenceBundle id={params.id} />;
}
