import Link from "next/link";

import { getWhatsAppUrl } from "@/lib/constants";
import { site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3>{site.name}</h3>
            <p>{site.description}</p>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li>
                <Link href="/ground-zero" prefetch={true}>
                  Ground Zero
                </Link>
              </li>
              <li>
                <Link href="/first-ascent" prefetch={true}>
                  First Ascent
                </Link>
              </li>
              <li>
                <Link href="/second-ascent" prefetch={true}>
                  Second Ascent
                </Link>
              </li>
              <li>
                <Link href="/skydeck" prefetch={true}>
                  Skydeck
                </Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/locations">Locations</Link>
              </li>
              <li>
                <Link href="/our-story">Our story</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Partner</h4>
            <ul>
              <li>
                <Link href="/partner">Work with the studio</Link>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl("Hello PSM Infinity, I would like to enquire about a studio partnership.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            <p>
              Mon–Sat
              <br />
              10:00 am – 8:00 pm
            </p>
            <p>
              <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>
        <div className="copyright">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span>Branding · Technology · Textile · Logistics</span>
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
