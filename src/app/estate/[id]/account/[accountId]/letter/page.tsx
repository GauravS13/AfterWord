import { LetterPreview } from "../../../../../../components/screens/LetterPreview";

export default function LetterPreviewPage({ params }: { params: { id: string; accountId: string } }) {
  return <LetterPreview id={params.id} accountId={params.accountId} />;
}
