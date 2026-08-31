import { NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "@/content/site-content";

// Handles both the Contact page ("general") and Careers page ("career") forms.
// Requires RESEND_API_KEY (and optionally CONTACT_TO_EMAIL) to be set as an
// environment variable — see README for setup. Without it, the form fails
// gracefully with a 503 so the UI can point people to call/email directly
// instead of silently pretending the message was sent.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.phone !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.phone.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const type = body.type === "career" ? "career" : "general";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — form submission was not delivered.",
      { type, name: body.name },
    );
    return NextResponse.json(
      { error: "Email delivery is not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.CONTACT_TO_EMAIL || business.email;
  const subject =
    type === "career"
      ? `New career inquiry from ${body.name}`
      : `New contact form submission from ${body.name}`;

  try {
    await resend.emails.send({
      from: `${business.name} Website <onboarding@resend.dev>`,
      to: toEmail,
      replyTo: email || undefined,
      subject,
      text: [
        `Type: ${type === "career" ? "Career inquiry" : "General inquiry"}`,
        `Name: ${body.name}`,
        `Phone: ${body.phone}`,
        email ? `Email: ${email}` : null,
        "",
        "Message:",
        body.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send email via Resend", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
