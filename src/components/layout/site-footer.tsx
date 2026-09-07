import Link from "next/link";

import { getWhatsAppHref, site } from "@/content/site";

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
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/locations">Locations</Link>
              </li>
              <li>
                <Link href="/about">Our story</Link>
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
                <Link href="/partner#enquire">Enquire</Link>
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
          <a href={getWhatsAppHref()} rel="noreferrer noopener">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
