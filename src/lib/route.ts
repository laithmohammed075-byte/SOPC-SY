"use client";

import { useSyncExternalStore } from "react";
import { serviceIds, type ServiceId } from "@/content/site";

/**
 * Tiny hash router so the site keeps working as a single static file
 * (GitHub Pages or opened from disk). Service pages live at #/services/<id>;
 * every other hash is an in-page section anchor on the home page.
 */
export const servicePath = (id: ServiceId) => `#/services/${id}`;

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

const getHash = () => window.location.hash;

export function useHash() {
  return useSyncExternalStore(subscribe, getHash, () => "");
}

export function serviceFromHash(hash: string): ServiceId | null {
  const m = hash.match(/^#\/services\/([\w-]+)\/?$/);
  return m && (serviceIds as readonly string[]).includes(m[1]) ? (m[1] as ServiceId) : null;
}

/* ---- pre-selecting a service in the contact form, across page switches ---- */

export const SELECT_SERVICE_EVENT = "sopc:select-service";
let pendingService: string | null = null;

export function selectService(id: string) {
  pendingService = id;
  window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: id }));
}

export function consumePendingService() {
  const id = pendingService;
  pendingService = null;
  return id;
}
