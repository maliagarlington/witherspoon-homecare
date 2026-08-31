"use client";

import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { business } from "@/content/site-content";
import { UploadIcon, FileIcon } from "./icons";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];

function validateFile(file: File): string | null {
  const ext = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
  if (!ACCEPTED_EXTENSIONS.includes(ext)) {
    return "Please upload a PDF, DOC, or DOCX file.";
  }
  if (file.size > MAX_FILE_BYTES) {
    return "That file is too large. Please upload a file under 5MB.";
  }
  return null;
}

export function ResumeUploadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function applyFile(file: File | null) {
    if (!file) {
      setFileName(null);
      setFileError(null);
      return;
    }
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      setFileName(null);
      // Clear the input so an invalid file can't be silently submitted.
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFileError(null);
    setFileName(file.name);
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0] ?? null;
    if (file && fileInputRef.current) {
      const transfer = new DataTransfer();
      transfer.items.add(file);
      fileInputRef.current.files = transfer.files;
    }
    applyFile(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: new FormData(form),
      });

      if (res.status === 503) {
        setStatus("unconfigured");
        return;
      }
      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
      setFileName(null);
      setFileError(null);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border-2 border-brand-pink-deep bg-brand-pink-tint p-6 text-lg font-semibold text-brand-ink"
      >
        Thanks, we&rsquo;ll be in touch! We&rsquo;ve received your resume and
        will follow up soon. For anything urgent, call us at{" "}
        <a href={business.phoneHref} className="underline">
          {business.phone}
        </a>
        .
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {(status === "error" || status === "unconfigured") && (
        <div
          role="alert"
          className="rounded-xl border-2 border-brand-pink-deep bg-brand-pink-tint p-4 text-brand-ink"
        >
          {status === "unconfigured"
            ? "Online resume submission isn't fully set up on this site yet. "
            : "Something went wrong sending your resume. "}
          Please call {business.phone} or email{" "}
          <a href={`mailto:${business.email}`} className="font-bold underline">
            {business.email}
          </a>{" "}
          directly and we&rsquo;ll help right away.
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="resume-name" className="text-lg font-bold text-brand-ink">
          Name
        </label>
        <input
          id="resume-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="min-h-[52px] rounded-xl border-2 border-brand-slate bg-white px-4 text-lg text-brand-ink focus-visible:border-brand-pink-deep"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="resume-email" className="text-lg font-bold text-brand-ink">
          Email
        </label>
        <input
          id="resume-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="min-h-[52px] rounded-xl border-2 border-brand-slate bg-white px-4 text-lg text-brand-ink focus-visible:border-brand-pink-deep"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="resume-phone" className="text-lg font-bold text-brand-ink">
          Phone
        </label>
        <input
          id="resume-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="min-h-[52px] rounded-xl border-2 border-brand-slate bg-white px-4 text-lg text-brand-ink focus-visible:border-brand-pink-deep"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="resume-message" className="text-lg font-bold text-brand-ink">
          Tell Us About Yourself{" "}
          <span className="font-medium text-brand-slate">(optional)</span>
        </label>
        <textarea
          id="resume-message"
          name="message"
          rows={4}
          placeholder="Availability, experience, anything else you'd like us to know"
          className="rounded-xl border-2 border-brand-slate bg-white px-4 py-3 text-lg text-brand-ink focus-visible:border-brand-pink-deep"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-lg font-bold text-brand-ink">
          Resume{" "}
          <span className="font-medium text-brand-slate">
            (PDF, DOC, or DOCX, max 5MB)
          </span>
        </span>

        <label
          htmlFor="resume-file"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors has-[:focus-visible]:border-brand-pink-deep has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-pink-tint-2 ${
            isDragging
              ? "border-brand-pink-deep bg-brand-pink-tint"
              : "border-brand-slate bg-white hover:border-brand-pink-deep hover:bg-brand-pink-tint"
          }`}
        >
          {fileName ? (
            <span className="flex items-center gap-2 break-all text-lg font-semibold text-brand-ink">
              <FileIcon className="h-6 w-6 shrink-0 text-brand-pink-deep" />
              {fileName}
            </span>
          ) : (
            <>
              <UploadIcon className="h-8 w-8 text-brand-pink-deep" />
              <span className="text-lg font-bold text-brand-pink-deep">
                Tap to Upload Your Resume
              </span>
              <span className="text-lg text-brand-slate">
                or drag and drop &middot; PDF, DOC, or DOCX &middot; max 5MB
              </span>
            </>
          )}
          <input
            ref={fileInputRef}
            id="resume-file"
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(event) => applyFile(event.target.files?.[0] ?? null)}
          />
        </label>
        {fileError && (
          <p role="alert" className="text-lg font-bold text-brand-pink-deep">
            {fileError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting" || !fileName || !!fileError}
        className="mt-2 inline-flex min-h-[52px] items-center justify-center whitespace-nowrap rounded-full bg-brand-pink-deep px-5 font-heading text-base font-bold text-white transition-colors hover:bg-[#93043f] disabled:opacity-60 sm:px-7 sm:text-lg"
      >
        {status === "submitting" ? "Sending…" : "Submit Application"}
      </button>
    </form>
  );
}
