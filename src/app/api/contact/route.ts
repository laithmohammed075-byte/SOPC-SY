import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";

/**
 * Contact form endpoint — NOT YET CONNECTED to any delivery service.
 *
 * To go live, implement `deliver()` with your provider (e.g. an SMTP relay,
 * Resend, SendGrid, or a CRM webhook) using server-side environment
 * variables, then set CONTACT_DELIVERY_ENABLED=true.
 *
 * Until then the endpoint validates input and responds 501 so the UI can
 * clearly tell visitors their message was not sent.
 */
async function deliver(payload: ContactPayload): Promise<void> {
  void payload;
  throw new Error("Contact delivery is not implemented.");
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload: ContactPayload = {
    fullName: String(body.fullName ?? "").slice(0, 200),
    company: String(body.company ?? "").slice(0, 200),
    email: String(body.email ?? "").slice(0, 200),
    phone: String(body.phone ?? "").slice(0, 40),
    service: String(body.service ?? "").slice(0, 80),
    message: String(body.message ?? "").slice(0, 5000),
  };

  const errors = validateContact(payload);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Validation failed", fields: Object.keys(errors) }, { status: 422 });
  }

  if (process.env.CONTACT_DELIVERY_ENABLED !== "true") {
    return NextResponse.json({ error: "Contact delivery is not configured" }, { status: 501 });
  }

  try {
    await deliver(payload);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
}
