import { useState, useEffect, useRef } from "react";

// Professional Stylesheet with added utility for sub-pages
const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0e0f0c;
    --bg: #111210;
    --surface: #181a16;
    --card: #1e2019;
    --lime: #c8f135;
    --lime-dim: rgba(200,241,53,0.12);
    --muted: #6b6e62;
    --light: #e8ead8;
    --border: rgba(200,241,53,0.12);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--light); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

  /* NOISE & GLOW */
  .noise { position: fixed; inset: 0; pointer-events: none; z-index: 200; opacity: 0.03; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  .cursor-glow { position: fixed; pointer-events: none; z-index: 1; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(200,241,53,0.04) 0%, transparent 70%); transform: translate(-50%, -50%); transition: left 0.4s ease, top 0.4s ease; }

  /* NAV */
  nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 3.5rem; background: rgba(14,15,12,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
  .nav-logo { font-family: 'Courier Prime', monospace; font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--lime); cursor: pointer; }
  .nav-links { display: flex; gap: 2.5rem; align-items: center; }
  .nav-links a { font-family: 'Courier Prime', monospace; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .nav-links a:hover { color: var(--lime); }
  .nav-cta { font-family: 'Courier Prime', monospace; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.6rem 1.4rem; background: var(--lime); color: var(--ink); border: none; cursor: pointer; }

  /* SECTIONS */
  section { padding: 8rem 4rem; min-height: 80vh; }
  .section-label { font-family: 'Courier Prime', monospace; font-size: 0.68rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--lime); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.8rem; }
  .section-label::before { content:''; display:block; width:2rem; height:1px; background:var(--lime); }
  .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; line-height: 1.1; margin-bottom: 3rem; }
  .section-title em { font-style: italic; color: var(--lime); }

  /* CARDS */
  .work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  .work-card { background: var(--card); padding: 3rem; border: 1px solid var(--border); cursor: pointer; transition: all 0.3s ease; }
  .work-card:hover { transform: translateY(-5px); border-color: var(--lime); }
  .work-tag { font-family: 'Courier Prime', monospace; font-size: 0.65rem; color: var(--lime); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.1em; }
  .work-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem; }
  .work-excerpt { font-size: 0.95rem; line-height: 1.6; color: var(--muted); }
  
  .btn-primary { font-family: 'Courier Prime', monospace; font-size: 0.75rem; letter-spacing: 0.1em; padding: 1rem 2rem; background: var(--lime); color: var(--ink); border: none; cursor: pointer; text-transform: uppercase; margin-top: 1.5rem; }
  .btn-ghost { background: none; border: 1px solid var(--border); color: var(--light); padding: 0.8rem 1.5rem; cursor: pointer; font-family: 'Courier Prime', monospace; font-size: 0.7rem; text-transform: uppercase; }

  /* FOOTER */
  footer { padding: 4rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; font-family: 'Courier Prime', monospace; font-size: 0.65rem; color: var(--muted); }

  @media (max-width: 900px) { .work-grid { grid-template-columns: 1fr; } section { padding: 4rem 1.5rem; } nav { padding: 1rem; } .nav-links { display: none; } }
`;

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState("home");
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const h = e => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  // --- SUB-PAGES CONTENT ---

  const SalesPagePreview = () => (
    <section className="reveal visible">
      <div className="section-label">01 / Direct Response</div>
      <h2 className="section-title">High-Ticket <em>Sales Letters.</em></h2>
      <div className="work-grid">
        <div className="work-card">
          <div className="work-tag">Landing Page & Sales Letter</div>
          <div className="work-title">The "Founders Circle" Method</div>
          <p className="work-excerpt">A long-form sales page for a high-ticket coaching program. Focused on psychological triggers, authority building, and a frictionless CTA. Resulted in a 12% conversion rate increase for the client.</p>
        </div>
        <div className="work-card">
          <div className="work-tag">SaaS Landing Page</div>
          <div className="work-title">Automation OS</div>
          <p className="work-excerpt">Re-writing the hero section and features list to focus on "Time Saved" instead of "Tool Specs." Increased sign-ups by 24% in the first month.</p>
        </div>
      </div>
      <button className="btn-ghost" style={{marginTop: '3rem'}} onClick={() => setCurrentPage("home")}>← Back to Portfolio</button>
    </section>
  );

  const EmailAdPreview = () => (
    <section className="reveal visible">
      <div className="section-label">02 / Retention & Traffic</div>
      <h2 className="section-title">Emails & <em>Ad Creative.</em></h2>
      <div className="work-grid">
        <div className="work-card">
          <div className="work-tag">Email Marketing</div>
          <div className="work-title">The "Unread" Sequence</div>
          <p className="work-excerpt">A 5-part email sequence designed to reactivate dead leads. Used humor and aggressive benefit-stacking to recover lost revenue.</p>
        </div>
        <div className="work-card">
          <div className="work-tag">Social Ads (Meta/Google)</div>
          <div className="work-title">The Scroll-Stopper Scripts</div>
          <p className="work-excerpt">Short-form ad copy focused on the first 3 seconds. High CTR scripts that turned passive scrollers into active buyers.</p>
        </div>
      </div>
      <button className="btn-ghost" style={{marginTop: '3rem'}} onClick={() => setCurrentPage("home")}>← Back to Portfolio</button>
    </section>
  );

  return (
    <>
      <style>{style}</style>
      <div className="noise" />
      <div className="cursor-glow" style={{ left: mouse.x, top: mouse.y }} />

      <nav>
        <div className="nav-logo" onClick={() => setCurrentPage("home")}>Gideon David Bureimoh</div>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); }}>Work</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("sales"); }}>Sales Pages</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("ads"); }}>Emails & Ads</a>
          <button className="nav-cta" onClick={scrollToContact}>Hire Me</button>
        </div>
      </nav>

      {currentPage === "home" ? (
        <>
          <section id="hero">
            <div className="section-label">Senior Conversion Specialist</div>
            <h1 className="section-title">I don't just write.<br />I build <em>revenue.</em></h1>
            <p style={{maxWidth: '600px', color: 'var(--muted)', lineHeight: '1.8', fontSize: '1.1rem'}}>
              Forget "content." You need copy that hits your customers' psychological triggers and forces them to act. 
              I combine direct-response copywriting with technical web development to create high-converting sales systems.
            </p>
            <div style={{display:'flex', gap: '1rem', marginTop: '3rem'}}>
               <button className="btn-primary" onClick={() => setCurrentPage("sales")}>View Sales Pages</button>
               <button className="btn-ghost" onClick={() => setCurrentPage("ads")}>See Email & Ads →</button>
            </div>
          </section>

          <section id="work" style={{background: 'var(--surface)'}}>
            <div className="section-label">The Portfolio</div>
            <h2 className="section-title">Click a category to see <em>the results.</em></h2>
            <div className="work-grid">
              <div className="work-card" onClick={() => setCurrentPage("sales")}>
                <div className="work-tag">Category 01</div>
                <div className="work-title">Landing Pages & Sales Letters</div>
                <p className="work-excerpt">Psychology-driven pages designed to convert cold traffic into high-ticket buyers.</p>
              </div>
              <div className="work-card" onClick={() => setCurrentPage("ads")}>
                <div className="work-tag">Category 02</div>
                <div className="work-title">Email Sequences & Scroll-Stop Ads</div>
                <p className="work-excerpt">Retention and acquisition copy that lowers your cost-per-click and increases LTV.</p>
              </div>
            </div>
          </section>

          <section id="contact">
            <div className="section-label">Direct Line</div>
            <h2 className="section-title">Stop wasting traffic.<br /><em>Start converting.</em></h2>
            <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem'}}>
              <div>
                <p style={{color: 'var(--muted)', marginBottom: '2rem'}}>I am currently accepting select projects for Q3 2026. If you want copy that actually moves the needle, reach out via the channels below.</p>
                <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                  <a href="mailto:gideondavidbureimoh@gmail.com" style={{color: 'var(--lime)', fontSize: '1.2rem', textDecoration: 'none'}}>gideondavidbureimoh@gmail.com</a>
                  <p style={{fontFamily: 'Courier Prime', fontSize: '0.8rem'}}>TELEGRAM: @bureimohgideondavid</p>
                  <p style={{fontFamily: 'Courier Prime', fontSize: '0.8rem'}}>INSTAGRAM: @gideondavidbureimoh</p>
                  <p style={{fontFamily: 'Courier Prime', fontSize: '0.8rem'}}>LINKEDIN: [Add Link Later]</p>
                </div>
              </div>
              <div style={{background: 'var(--card)', padding: '2rem', border: '1px solid var(--border)'}}>
                 <p style={{fontFamily: 'Courier Prime', fontSize: '0.7rem', color: 'var(--lime)', marginBottom: '1rem'}}>QUICK MESSAGE</p>
                 <p style={{fontSize: '0.9rem', color: 'var(--muted)'}}>For the fastest response, message me directly on **Telegram** or **Email** with your project details and budget.</p>
              </div>
            </div>
          </section>
        </>
      ) : currentPage === "sales" ? (
        <SalesPagePreview />
      ) : (
        <EmailAdPreview />
      )}

      <footer>
        <span>© 2026 Gideon David Bureimoh. Strategically Built.</span>
        <span>Nigeria ✦ Remote Worldwide</span>
      </footer>
    </>
  );
      }
