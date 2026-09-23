import { getWhatsAppUrl } from "@/lib/constants";

export function WhatsAppCta() {
  const whatsappUrl = getWhatsAppUrl(
    "Hello PSM Infinity, I am seeking a confidential inquiry regarding your global services.",
  );

  return (
    <a
      className="whatsapp-cta"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Concierge on WhatsApp"
    >
      <svg className="whatsapp-cta-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.8c4.47 0 8.11 3.64 8.11 8.11 0 4.47-3.64 8.11-8.11 8.11-1.4 0-2.76-.36-3.95-1.04l-.28-.16-3.11.82.83-3.04-.18-.3A8.07 8.07 0 013.94 11.91c0-4.47 3.64-8.11 8.11-8.11z" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
