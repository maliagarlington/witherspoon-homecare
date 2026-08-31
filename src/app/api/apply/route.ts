import { NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "@/content/site-content";

// Handles the Careers page resume upload. Reuses the same RESEND_API_KEY
// (and optional CONTACT_TO_EMAIL) as /api/contact, see README for setup.
// Without it, the form fails gracefully with a 503 so the UI can point
// people to call/email directly instead of silently pretending the resume
// was sent.
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");
  const resume = formData.get("resume");

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof phone !== "string" ||
    !phone.trim() ||
    !(resume instanceof File) ||
    resume.size === 0
  ) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const ext = `.${resume.name.split(".").pop()?.toLowerCase() ?? ""}`;
  const typeLooksValid =
    ACCEPTED_EXTENSIONS.includes(ext) ||
    (resume.type && ACCEPTED_MIME_TYPES.includes(resume.type));
  if (!typeLooksValid) {
    return NextResponse.json(
      { error: "Please upload a PDF, DOC, or DOCX file." },
      { status: 400 },
    );
  }

  if (resume.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { error: "That file is too large. Please upload a file under 5MB." },
      { status: 413 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[apply] RESEND_API_KEY is not set. Resume submission was not delivered.",
      { name },
    );
    return NextResponse.json(
      { error: "Email delivery is not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.CONTACT_TO_EMAIL || business.email;
  const messageText = typeof message === "string" ? message.trim() : "";

  try {
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    await resend.emails.send({
      from: `${business.name} Website <onboarding@resend.dev>`,
      to: toEmail,
      replyTo: email,
      subject: `New resume submission from ${name}`,
      text: [
        "Type: Resume submission",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        ...(messageText ? [messageText, ""] : []),
        "Resume attached.",
      ].join("\n"),
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[apply] Failed to send resume email via Resend", error);
    return NextResponse.json(
      { error: "Failed to send your application." },
      { status: 500 },
    );
  }
}
