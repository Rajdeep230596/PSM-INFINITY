export const WHATSAPP_CONFIG = {
  // Country code 91 + 9007331000 (no spaces, plus signs, or hyphens)
  phoneNumber: "919007331000",
  defaultMessage: "Hello PSM Infinity, I would like to inquire about your private allocations.",
} as const;

export function getWhatsAppUrl(customMessage?: string): string {
  const message = encodeURIComponent(customMessage || WHATSAPP_CONFIG.defaultMessage);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${message}`;
}

export function openWhatsApp(customMessage?: string) {
  window.open(getWhatsAppUrl(customMessage), "_blank", "noopener,noreferrer");
}

export function enquireWhatsApp(title: string, category: string) {
  openWhatsApp(
    `Hello PSM Infinity Concierge, I would like to inquire about the allocation: "${title}" in ${category}.`,
  );
}
