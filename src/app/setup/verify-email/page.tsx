import { redirect } from "next/navigation";

export default function VerifyEmailPage() {
  redirect("/setup/personal-details");
}
