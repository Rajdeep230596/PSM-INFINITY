import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";
import { BootLoader } from "@/components/motion/boot-loader";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { site } from "@/content/site";

import "./globals.css";
import "./whatsapp.css";
import "./first-ascent/first-ascent.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Premium Visual Experiences`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} is-booting`} data-scroll-behavior="smooth">
      <body>
        <noscript>
          <style>{`.boot-loader{display:none!important}html.is-booting{overflow:auto!important}`}</style>
        </noscript>
        <BootLoader />
        <SmoothScroll>
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
          <WhatsAppCta />
        </SmoothScroll>
      </body>
    </html>
  );
}
