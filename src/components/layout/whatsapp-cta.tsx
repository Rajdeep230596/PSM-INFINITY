import { getWhatsAppHref } from "@/content/site";

export function WhatsAppCta() {
  return (
    <a className="whatsapp-cta" href={getWhatsAppHref()} rel="noreferrer noopener" aria-label="Chat on WhatsApp">
      WhatsApp
    </a>
  );
}
