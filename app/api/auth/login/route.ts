import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { createSession, SESSION_COOKIE, type SessionFields } from "@/lib/auth";

export async function POST(req: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const username = (body.username ?? "").trim().toLowerCase();
  const password = body.password ?? "";
  if (!username || !password) {
    return NextResponse.json(
      { error: "Enter your username and password." },
      { status: 400 }
    );
  }

  // small constant-ish delay to blunt brute force / timing probes
  await new Promise((r) => setTimeout(r, 350));

  let session: SessionFields | null = null;

  const db = supabaseAdmin();
  if (!db) console.error("login: supabase admin client unavailable (missing env)");
  if (db) {
    const { data: user, error } = await db
      .from("portal_users")
      .select("id,username,password_hash,full_name,role,grade")
      .eq("username", username)
      .maybeSingle();
    if (error) console.error("login: portal_users query failed:", error.message);
    if (!user) console.error("login: no portal user found for:", username);

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      session = {
        sub: String(user.id),
        username: user.username,
        name: user.full_name,
        role: user.role,
        grade: user.grade ?? null,
      };
    }
  }

  // env-based fallback so the portal still works if the database is unreachable
  if (
    !session &&
    process.env.ADMIN_USERNAME &&
    process.env.ADMIN_PASSWORD &&
    username === process.env.ADMIN_USERNAME.toLowerCase() &&
    password === process.env.ADMIN_PASSWORD
  ) {
    session = {
      sub: "env-admin",
      username,
      name: "Maya Okonkwo-Reyes",
      role: "student",
      grade: "Grade 10",
    };
  }

  if (!session) {
    return NextResponse.json(
      { error: "That username and password don't match our records." },
      { status: 401 }
    );
  }

  const token = await createSession(session);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}
