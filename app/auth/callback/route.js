import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  // The '/auth/callback' route  is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs

  const requestURL = new URL(request.url);
  const code = requestURL.searchParams.get("code");

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
