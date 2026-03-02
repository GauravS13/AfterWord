import { exchangeCodeForToken } from "@/lib/gmail-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code  = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state"); // Usually estateId or session
  const error = request.nextUrl.searchParams.get("error");

  // User cancelled consent
  if (error === "access_denied") {
    return NextResponse.redirect(new URL("/connect?error=cancelled", request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/connect?error=no_code", request.url));
  }

  // Verify state matches what was stored (CSRF check)
  // In this simplified version, state is the estateId to scan for.

  // Exchange code for token
  const tokenData = await exchangeCodeForToken(code);

  if (!tokenData.access_token) {
    return NextResponse.redirect(new URL("/connect?error=auth_failed", request.url));
  }

  // We would normally fire a convex action here to store the token and start the scan,
  // or simply redirect to a scan page with the token securely stored in a session.
  // For now, redirect to the scan dashboard passing necessary state.
  return NextResponse.redirect(new URL(`/scan?estateId=${state}&token=acquired`, request.url));
}
