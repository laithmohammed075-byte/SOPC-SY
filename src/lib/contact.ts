import { company } from "@/content/site";

/**
 * Contact form types, validation and submission.
 *
 * Messages are delivered by Web3Forms (https://web3forms.com) to the inbox
 * registered for `company.contact.formAccessKey` (info@sopc-sy.com). This works
 * from the static single-file site — no server needed.
 *
 * Without an access key the browser falls back to `/api/contact`, which
 * answers 501 until a server-side delivery method is configured; the form then
 * tells the visitor honestly that the message was NOT sent.
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

/** Extra, human-readable details included in the email. */
export type SubmitContext = { serviceLabel: string; language: string; botcheck: boolean };

export async function submitContact(payload: ContactPayload, ctx: SubmitContext): Promise<SubmitResult> {
  const key = company.contact.formAccessKey;

  if (key) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: `SOPC website enquiry — ${ctx.serviceLabel}`,
          from_name: "SOPC Website",
          replyto: payload.email,
          name: payload.fullName,
          email: payload.email,
          phone: payload.phone || "—",
          company: payload.company || "—",
          service: ctx.serviceLabel,
          message: payload.message,
          language: ctx.language,
          botcheck: ctx.botcheck, // honeypot: real visitors never tick it
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      return res.ok && data?.success ? "success" : "error";
    } catch {
      return "error";
    }
  }

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
