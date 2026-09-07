import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story of PSM Infinity: a Kolkata studio founded by Sunandan Mitra for branding, technology, textile, and logistics.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Our story</p>
          <h1>
            Born of the brief,
            <br />
            raised in the city
          </h1>
        </div>
      </section>
      <section className="section">
        <div className="container about-grid">
          <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80" alt="Warm studio interior" />
          <div>
            <p className="eyebrow">The idea</p>
            <h2 className="section-title">
              A Kolkata heart.
              <br />
              A house of craft.
            </h2>
            <p className="lede">
              PSM Infinity began with a simple belief: the best visual work is slow where it should be slow, and exact
              where it should be exact. Branding that sounds like the person. Systems the company can live in. Technology,
              textile, and logistics treated as part of the same composition.
            </p>
            <p className="lede" style={{ marginTop: 16 }}>
              Sunandan Mitra took that ritual out of the deck and into Ballygunge — a studio opposite Maddox Square, open
              to anyone who wants the work to hold.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="split-head">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-title">
                Three promises
                <br />
                we keep.
              </h2>
            </div>
            <p className="lede">No corners cut. Only signal. Everything else is a consequence of that.</p>
          </div>
          <div className="values">
            <article className="feature">
              <span className="num">I</span>
              <h3>Listen with patience</h3>
              <p>A long conversation before the first mark — so the identity can be torn with the hands and still feel like you.</p>
            </article>
            <article className="feature">
              <span className="num">II</span>
              <h3>Craft with character</h3>
              <p>Type, colour, code, cloth, and route — made in the studio, not assembled from a catalogue.</p>
            </article>
            <article className="feature">
              <span className="num">III</span>
              <h3>Materials with names</h3>
              <p>Partners, mills, and builders we can introduce. The work has a provenance, not only a finish.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">The table</p>
            <h2 className="section-title">
              Made with care.
              <br />
              <em>Used with joy.</em>
            </h2>
            <p className="lede">
              We work for first names and house names. For the founder who needs a portrait, the company that needs a
              system, and the operator who needs the last mile to feel considered.
            </p>
            <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: 28 }}>
              <Link className="btn btn-primary" href="/locations">
                Find the studio
              </Link>
              <Link className="btn btn-ghost" href="/partner">
                Open a brief with us
              </Link>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" alt="Collaborators in a bright studio" />
        </div>
      </section>
    </>
  );
}
