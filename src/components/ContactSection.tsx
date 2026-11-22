"use client";

import { AlertCircle, CheckCircle2, Clock, Info, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { company, serviceIds } from "@/content/site";
import { submitContact, validateContact, type ContactErrors, type ContactPayload, type SubmitResult } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n";
import { SELECT_SERVICE_EVENT, consumePendingService } from "@/lib/route";
import { Reveal, SectionHeading } from "./ui";

const empty: ContactPayload = { fullName: "", company: "", email: "", phone: "", service: "", message: "" };

function Field({
  label,
  error,
  optional,
  optionalLabel,
  children,
  id,
  className = "",
}: {
  label: string;
  error?: string;
  optional?: boolean;
  optionalLabel: string;
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-1.5 text-sm font-semibold text-ink">
        {label}
        {optional ? (
          <span className="text-xs font-normal text-muted">({optionalLabel})</span>
        ) : (
          <span aria-hidden className="text-gold-deep">*</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#b42318]">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/60 transition-all duration-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10";

export function ContactSection() {
  const { t, lang } = useLanguage();
  const f = t.contact.form;
  const uid = useId();
  const [values, setValues] = useState<ContactPayload>(() => ({ ...empty, service: consumePendingService() ?? "" }));
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | SubmitResult>("idle");

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      consumePendingService();
      setValues((v) => ({ ...v, service: id }));
      setErrors((er) => ({ ...er, service: undefined }));
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const set = (key: keyof ContactPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateContact(values);
    setErrors(errs);
    const firstInvalid = (Object.keys(errs) as (keyof ContactPayload)[])[0];
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }
    setStatus("sending");
    const result = await submitContact(values);
    setStatus(result);
    if (result === "success") setValues(empty);
  };

  const fid = (k: keyof ContactPayload) => `${uid}-${k}`;
  const aria = (k: keyof ContactPayload) => ({
    id: fid(k),
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${fid(k)}-error` : undefined,
  });
  const border = (k: keyof ContactPayload) => (errors[k] ? "border-[#e5a29b]" : "border-line");

  const info = [
    { icon: Mail, label: t.contact.email, value: company.contact.email, href: company.contact.email ? `mailto:${company.contact.email}` : undefined },
    { icon: Phone, label: t.contact.phone, value: company.contact.phone, href: company.contact.phone ? `tel:${company.contact.phone.replace(/\s/g, "")}` : undefined },
    { icon: MapPin, label: t.contact.address, value: company.contact.address[lang] },
    { icon: Clock, label: t.contact.hours, value: company.contact.hours[lang] },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-mint/60 to-transparent" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading id="contact-title" eyebrow={t.contact.eyebrow} title={t.contact.title} intro={t.contact.description} />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.4fr]">
          <Reveal className="h-full">
            <aside className="relative h-full overflow-hidden rounded-3xl border border-line bg-linear-to-b from-offwhite to-mint p-7 sm:p-9">
              <span aria-hidden className="gold-rule absolute inset-x-9 top-0" />
              <h3 className="font-display text-2xl text-ink">{t.contact.infoTitle}</h3>
              <ul className="mt-7 space-y-5">
                {info.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-gold/40">
                      <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">{label}</p>
                      {value ? (
                        href ? (
                          <a href={href} className="mt-0.5 block font-semibold text-ink hover:text-brand" dir="ltr">
                            {value}
                          </a>
                        ) : (
                          <p className="mt-0.5 font-semibold text-ink">{value}</p>
                        )
                      ) : (
                        <p className="mt-0.5 italic text-muted">{t.meta.tbc}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 flex items-start gap-2 rounded-2xl bg-white/70 p-4 text-sm text-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden />
                {t.contact.infoNote}
              </p>
            </aside>
          </Reveal>

          <Reveal delay={0.1}>
            <form noValidate onSubmit={onSubmit} className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-9" aria-describedby={`${uid}-status`}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={fid("fullName")} label={f.fullName} error={errors.fullName && f.errors.fullName} optionalLabel={f.optional}>
                  <input {...aria("fullName")} type="text" autoComplete="name" required value={values.fullName} onChange={set("fullName")} className={`${inputBase} ${border("fullName")}`} />
                </Field>
                <Field id={fid("company")} label={f.company} optional optionalLabel={f.optional}>
                  <input {...aria("company")} type="text" autoComplete="organization" value={values.company} onChange={set("company")} className={`${inputBase} ${border("company")}`} />
                </Field>
                <Field id={fid("email")} label={f.email} error={errors.email && f.errors.email} optionalLabel={f.optional}>
                  <input {...aria("email")} type="email" autoComplete="email" required dir="ltr" value={values.email} onChange={set("email")} className={`${inputBase} ${border("email")} rtl:text-right`} />
                </Field>
                <Field id={fid("phone")} label={f.phone} error={errors.phone && f.errors.phone} optional optionalLabel={f.optional}>
                  <input {...aria("phone")} type="tel" autoComplete="tel" dir="ltr" value={values.phone} onChange={set("phone")} className={`${inputBase} ${border("phone")} rtl:text-right`} />
                </Field>
                <Field id={fid("service")} label={f.service} error={errors.service && f.errors.service} optionalLabel={f.optional} className="sm:col-span-2">
                  <select {...aria("service")} required value={values.service} onChange={set("service")} className={`${inputBase} ${border("service")} appearance-none bg-[length:16px] bg-[position:right_1rem_center] bg-no-repeat pe-10 rtl:bg-[position:left_1rem_center]`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2308784C' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
                    <option value="" disabled>
                      {f.servicePlaceholder}
                    </option>
                    {serviceIds.map((id) => (
                      <option key={id} value={id}>
                        {t.services.items[id].title}
                      </option>
                    ))}
                    <option value="careers">{f.careers}</option>
                    <option value="general">{f.general}</option>
                  </select>
                </Field>
                <Field id={fid("message")} label={f.message} error={errors.message && f.errors.message} optionalLabel={f.optional} className="sm:col-span-2">
                  <textarea {...aria("message")} required rows={5} value={values.message} onChange={set("message")} className={`${inputBase} ${border("message")} resize-y`} />
                </Field>
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-2 hover:shadow-lift disabled:translate-y-0 disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      {f.sending}
                    </>
                  ) : (
                    <>
                      {f.submit}
                      <Send className="rtl-flip h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </>
                  )}
                </button>
              </div>

              <div id={`${uid}-status`} role="status" aria-live="polite" className="mt-5 empty:hidden">
                {status === "success" && (
                  <p className="flex items-start gap-2 rounded-2xl bg-mint p-4 text-sm font-medium text-brand">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {f.success}
                  </p>
                )}
                {status === "not-configured" && (
                  <p className="flex items-start gap-2 rounded-2xl bg-gold-soft/60 p-4 text-sm font-medium text-[#6d5517]">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {f.notConfigured}
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-start gap-2 rounded-2xl bg-[#fdecea] p-4 text-sm font-medium text-[#b42318]">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {f.failure}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
