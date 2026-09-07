"use client";

import { FormEvent, useState } from "react";

export default function PartnerPage() {
  const [note, setNote] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNote("Thank you. The studio will reach out within two business days.");
    event.currentTarget.reset();
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Partnerships</p>
          <h1>
            Bring Infinity
            <br />
            to your house
          </h1>
          <p className="lede" style={{ margin: "16px auto 0" }}>
            Join a studio built on slow briefs, honest materials, and neighbourhood tables.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="split-head">
            <div>
              <p className="eyebrow">Why Infinity</p>
              <h2 className="section-title">
                A studio people
                <br />
                <em>return to.</em>
              </h2>
            </div>
            <p className="lede">
              We look for passionate partners who share our commitment to craft and clarity. You bring the house. We
              bring the system, the materials, and the playbook.
            </p>
          </div>
          <div className="stats">
            <article className="stat">
              <strong>Five practices</strong>
              <span>Branding, technology, textile, logistics — one composition</span>
            </article>
            <article className="stat">
              <strong>Kolkata</strong>
              <span>A Ballygunge studio, work that travels</span>
            </article>
            <article className="stat">
              <strong>Full support</strong>
              <span>Identity, build, sourcing, and launch</span>
            </article>
          </div>
          <div className="steps">
            <article className="step">
              <span>I</span>
              <h3>Enquire</h3>
              <p>Tell us about you, your house, and the window for the work.</p>
            </article>
            <article className="step">
              <span>II</span>
              <h3>Discover</h3>
              <p>A conversation on scope, materials, and studio fit.</p>
            </article>
            <article className="step">
              <span>III</span>
              <h3>Build</h3>
              <p>Identity, surfaces, cloth, and route — composed together.</p>
            </article>
            <article className="step">
              <span>IV</span>
              <h3>Open</h3>
              <p>Launch support, the system locked, the work in the world.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section" id="enquire">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">Enquire</p>
            <h2 className="section-title">
              Let&apos;s make it
              <br />
              happen.
            </h2>
            <p className="lede">Share a few details and the studio will write back within two business days.</p>
            <p className="lede" style={{ marginTop: 16 }}>
              Identity, technology, textile programmes, and logistics come with the partnership — as one brief, not four
              vendors.
            </p>
          </div>
          <form className="form" onSubmit={onSubmit}>
            <label>
              Full name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Mobile
              <input name="phone" type="tel" required placeholder="10-digit number" />
            </label>
            <label>
              Email
              <input name="email" type="email" required placeholder="you@email.com" />
            </label>
            <label>
              City
              <input name="city" required placeholder="Where is the work?" />
            </label>
            <label>
              Practice
              <select name="practice" required defaultValue="">
                <option value="">Select</option>
                <option>Personal branding</option>
                <option>Corporate branding</option>
                <option>Technology</option>
                <option>Textile</option>
                <option>Logistics</option>
                <option>A composed brief</option>
              </select>
            </label>
            <label>
              How soon?
              <select name="timeline" required defaultValue="">
                <option value="">Select</option>
                <option>Within 1 month</option>
                <option>Within 3 months</option>
                <option>Within 6 months</option>
                <option>Just exploring</option>
              </select>
            </label>
            <label className="full">
              A little about you
              <textarea name="message" placeholder="House, locality, questions…" />
            </label>
            <div className="full">
              <button className="btn btn-primary" type="submit">
                Send enquiry
              </button>
            </div>
            {note ? <p className="form-note">{note}</p> : null}
          </form>
        </div>
      </section>
    </>
  );
}
