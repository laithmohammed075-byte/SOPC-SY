/**
 * Contact form types, validation and submission.
 *
 * INTEGRATION POINT
 * -----------------
 * The browser posts to `/api/contact` (see src/app/api/contact/route.ts).
 * That route returns HTTP 501 until a delivery method is configured, and the
 * form then tells the visitor honestly that the message was NOT sent.
 * Connect an email service / CRM inside the route handler to go live.
 */

export type ContactPayload = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, true>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{6,20}$/;

export function validateContact(p: ContactPayload): ContactErrors {
  const e: ContactErrors = {};
  if (p.fullName.trim().length < 2) e.fullName = true;
  if (!EMAIL_RE.test(p.email.trim())) e.email = true;
  if (p.phone.trim() && !PHONE_RE.test(p.phone.trim())) e.phone = true;
  if (!p.service) e.service = true;
  if (p.message.trim().length < 10) e.message = true;
  return e;
}

export type SubmitResult = "success" | "not-configured" | "error";

export async function submitContact(payload: ContactPayload): Promise<SubmitResult> {
  // The standalone static build has no server, so nothing can be sent.
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") return "not-configured";
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.status === 501) return "not-configured";
    return res.ok ? "success" : "error";
  } catch {
    return "error";
  }
}
