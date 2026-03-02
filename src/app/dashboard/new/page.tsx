import { redirect } from "next/navigation";

export default function NewOwnerAccountPage() {
  redirect("/sign-up?redirect_url=/setup/progress");
}
