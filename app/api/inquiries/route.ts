import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parentName = String(body.parent_name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!parentName || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  const db = supabaseAdmin();
  if (db) {
    const { error } = await db.from("inquiries").insert({
      kind: String(body.kind ?? "inquiry"),
      parent_name: parentName,
      email,
      student_name: body.student_name ? String(body.student_name) : null,
      grade_applying: body.grade_applying ? String(body.grade_applying) : null,
      dob: body.dob ? String(body.dob) : null,
      tour_date: body.tour_date ? String(body.tour_date) : null,
      start_term: body.start_term ? String(body.start_term) : null,
      subject: body.subject ? String(body.subject) : null,
      message,
    });
    if (error) {
      console.error("inquiry insert failed:", error.message);
      return NextResponse.json(
        { error: "We couldn't save your inquiry — please try again." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
