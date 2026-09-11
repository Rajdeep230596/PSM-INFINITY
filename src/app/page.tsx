import Link from "next/link";

import "./first-ascent/first-ascent.css";
import { FirstAscentGallery } from "@/components/first-ascent/FirstAscentGallery";
import { CinematicWalkthrough } from "@/components/home/cinematic-walkthrough";

export default function HomePage() {
  return (
    <>
      <CinematicWalkthrough />
      <FirstAscentGallery hideHero />
      <div className="home-cinematic">
      <section className="section">
        <div className="container">
          <div className="split-head">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-title">
                No shortcuts.
                <br />
                Only signal.
              </h2>
            </div>
            <p className="lede">
              A Kolkata studio that treats brand, technology, cloth, and movement as one composition — not five
              disconnected jobs.
            </p>
          </div>
          <div className="craft-grid">
            <article className="craft-card">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
                alt="Studio interior with warm light"
              />
              <h3>The atelier</h3>
              <p>A room in Ballygunge where the brief is read slowly, then made visible — on paper, on screen, on cloth.</p>
            </article>
            <div className="craft-stack">
              <article className="feature">
                <span className="num">I</span>
                <h3>Listen first</h3>
                <p>We begin with the person or the house, not the template. The work has to sound like you when we leave the room.</p>
              </article>
              <article className="feature">
                <span className="num">II</span>
                <h3>Honest materials</h3>
                <p>Type, colour, code, textile, and route — chosen because they hold, not because they trend.</p>
              </article>
              <article className="feature">
                <span className="num">III</span>
                <h3>Neighbourhood tables</h3>
                <p>Founded by Sunandan Mitra. Built for Kolkata, and for the work that travels from it.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="section hall">
        <div className="container">
          <p className="eyebrow">From the studio</p>
          <h2 className="section-title">The hall of craft</h2>
          <div className="price-chip">
            Practices from <strong>identity</strong>
          </div>
          <div className="menu-grid">
            <article className="pizza-card">
              <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80" alt="Personal branding desk" />
              <div className="body">
                <span className="tag">Identity</span>
                <h3>Personal branding</h3>
                <p>Name, portrait, and presence for the individual who needs to be recognised without raising their voice.</p>
                <div className="price">Atelier</div>
              </div>
            </article>
            <article className="pizza-card">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80" alt="Corporate workshop" />
              <div className="body">
                <span className="tag">House</span>
                <h3>Corporate branding</h3>
                <p>A system the whole company can live in — mark, language, and the rules that keep it coherent.</p>
                <div className="price">System</div>
              </div>
            </article>
            <article className="pizza-card">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80" alt="Technology circuit detail" />
              <div className="body">
                <span className="tag">Build</span>
                <h3>Technology</h3>
                <p>Digital surfaces that carry the brand through the work itself, not only the deck that sells it.</p>
                <div className="price">Studio</div>
              </div>
            </article>
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link className="btn btn-light" href="/services">
              View all services
            </Link>
          </div>
        </div>
      </section>
      <section className="section franchise-band">
        <div className="container">
          <div>
            <p className="eyebrow">Partner</p>
            <h2 className="section-title">
              Ready to bring Infinity
              <br />
              to your house?
            </h2>
            <p className="lede">
              We look for collaborators who care about craft as much as commerce — brands, houses, and operators who want
              the work to hold.
            </p>
          </div>
          <Link className="btn btn-light" href="/partner">
            Become a studio partner
          </Link>
        </div>
      </section>
      </div>
      <div className="home-afterglow">
      <section className="section reviews">
        <div className="container">
          <div className="split-head">
            <div>
              <p className="eyebrow">Whispers from the table</p>
              <h2 className="section-title">
                What the city
                <br />
                <em>keeps saying</em>
              </h2>
            </div>
            <p className="lede">Notes from people who sat with the brief long enough to see it become a mark, a site, a cloth, a route.</p>
          </div>
          <div className="review-grid">
            <article className="review-card">
              <span className="tag">Personal branding</span>
              <p>“They listened before they drew. The identity feels like me in a room I have not entered yet.”</p>
              <div className="reviewer">
                <div className="avatar">P</div>
                <div>
                  <strong>Priya</strong>
                  <br />
                  <small>Ballygunge</small>
                </div>
              </div>
            </article>
            <article className="review-card">
              <span className="tag">Corporate</span>
              <p>“A house system we can actually use — not a deck that dies in a folder. Quiet, exact, and ours.”</p>
              <div className="reviewer">
                <div className="avatar">A</div>
                <div>
                  <strong>Aryan</strong>
                  <br />
                  <small>Park Street</small>
                </div>
              </div>
            </article>
            <article className="review-card">
              <span className="tag">Textile</span>
              <p>“They treated cloth with the same attention as the mark. The programme holds from mill to table.”</p>
              <div className="reviewer">
                <div className="avatar">T</div>
                <div>
                  <strong>Trisha</strong>
                  <br />
                  <small>Alipore</small>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="split-head">
            <div>
              <p className="eyebrow">The studio feed</p>
              <h2 className="section-title">
                Certified considered,
                <br />
                <em>like the rest.</em>
              </h2>
            </div>
            <p className="lede">A little of the mark, the room, the cloth, and the city — as it happens.</p>
          </div>
          <div className="gallery-grid">
            <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80" alt="Brand sketching" />
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80" alt="Textile detail" />
            <img src="https://images.unsplash.com/photo-1486406149795-5d47cc2ffc11?auto=format&fit=crop&w=800&q=80" alt="City architecture" />
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Studio workspace" />
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
