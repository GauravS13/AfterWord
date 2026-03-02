export function buildGmailAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id:     process.env.GOOGLE_CLIENT_ID!,
    redirect_uri:  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    response_type: "code",
    scope:         "https://www.googleapis.com/auth/gmail.metadata",
    access_type:   "offline",
    state,          // CSRF protection — store in session before redirecting
    prompt:        "consent",  // Always show consent screen
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export async function exchangeCodeForToken(code: string) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id:     process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri:  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      grant_type:    "authorization_code",
      code,
    }),
  });
  return response.json();
  // Returns: { access_token, token_type, expires_in, refresh_token, scope }
}
