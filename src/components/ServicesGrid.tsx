import type { CSSProperties } from 'react'
import { MagnetStraight, Timer, Trophy, CheckCircle } from '@/components/slab'
import type { Icon } from '@/components/slab'
import Autopilot, { TOOLS } from '@/components/Autopilot'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Three bands, top to bottom: your three-step method (on a dark plate so it
 * is the first thing the eye lands on), the four services as cards that carry
 * the marks of what each one is built with, and the live automation demo
 * scaled into whatever height is left. Same object language as Home and
 * Projects: the glass, the bento card, plated marks, orange for the index
 * and the accent.
 *
 * Every string below is a PLACEHOLDER. Replace it, or hand this file to your
 * AI assistant and tell it what to put in each spot.
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Capture',
    body: 'Every inquiry is captured. No opportunity gets lost.',
    Icon: MagnetStraight,
    chips: ['Forms', 'Funnels', 'Websites'],
  },
  {
    index: '02',
    label: 'Connect',
    body: 'Automate follow-ups and keep everything connected.',
    Icon: Timer,
    chips: ['CRM', 'Automation', 'SMS', 'Email'],
  },
  {
    index: '03',
    label: 'Convert',
    body: 'Turn leads into appointments, customers, and sales.',
    Icon: Trophy,
    chips: ['Calendars', 'Inbox', 'Opportunities'],
  },
]

/* ---------- The services ---------- */

// Example tool marks from /public/icons. Swap for the tools you actually use.
const GHL = '/icons/gohighlevel.png'
const OPENAI = '/icons/openai.svg'
const CLAUDE = '/icons/ai/claude-color.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'AI-Assisted Funnels',
    description: 'Funnels designed to turn visitors into leads.',
    chip: 'Built to convert',
    logos: [GHL, CLAUDE, OPENAI],
    bullets: ['High-converting funnel pages', 'Lead capture & forms', 'AI-assisted build process'],
  },
  {
    index: '02',
    title: 'GHL Automation',
    description: 'Follow-up that runs on its own.',
    chip: 'Runs 24/7',
    logos: [GHL],
    bullets: ['Lead follow-up', 'Automated workflows', 'Notifications & task automation'],
  },
  {
    index: '03',
    title: 'GHL CRM Setup',
    description: 'A CRM built around your business.',
    chip: 'Easy to manage',
    logos: [GHL],
    bullets: ['Pipelines & stages', 'Tags & contact organization', 'Lead & customer tracking'],
  },
  {
    index: '04',
    title: 'GHL Ecommerce',
    description: 'Turn your GHL account into a selling system.',
    chip: 'Ready to sell',
    logos: [GHL],
    bullets: ['Products & checkout', 'Order workflows', 'Customer follow-up'],
  },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          GoHighLevel Systems Built for Your Business
        </h1>
        <p className="pgrid__lede">
          Automation, CRM, funnels, websites, and e-commerce — all built and connected inside GoHighLevel to create a smoother customer journey and a more efficient business.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">The Flow Method</span>
            <h2 className="sgrid__method-title" id="method-title">
              Capture. Connect. Convert.
              <br />
              <span>Everything connected.</span>
            </h2>
            <p className="sgrid__method-sub">
              Everything flows better when the right systems work together.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">Need something built?</h2>
            <p className="sgrid__offers-sub">Pick a service. Build a system.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 04</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* The live workflow. Its caption and the tool chips sit in a header
            above the window, so the canvas gets the whole glass width. */}
        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">Live automation</span>
              <h2 className="sgrid__flow-title">From first message to follow-up, automated.</h2>
              <p className="sgrid__flow-sub">
                A visitor sends the form. The system logs the lead, emails the booking link, alerts me on Telegram, tracks every booking change, and follows up with anyone who is not ready yet. Built on free tools.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools that power this flow">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>
      </div>
    </section>
  )
}