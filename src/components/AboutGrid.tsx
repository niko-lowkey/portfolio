import type { CSSProperties } from 'react'
import { MapPin } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the illustration
 * on the right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the four things you do - each carrying the marks
 * of the tools it is built with. The tools are the proof, so they are the
 * visual. Swap the marks below for your own (any square SVG/PNG in public/).
 */

const GHL = { src: '/icons/gohighlevel.png', name: 'GoHighLevel' }
const MAKE = { src: '/icons/make.png', name: 'Make.com' }
const ZAPIER = { src: '/icons/ai/zapier.svg', name: 'Zapier' }
const CLAUDE = { src: '/icons/ai/claude-color.svg', name: 'Claude' }
const OPENAI = { src: '/icons/openai.svg', name: 'ChatGPT' }
const GWS = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }
const APPS_SCRIPT = { src: '/icons/googleappsscript.svg', name: 'Google Apps Script' }
const SLACK = { src: '/icons/ai/slack-color.svg', name: 'Slack' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'GHL CRM & Automation',
    marks: [GHL, MAKE, ZAPIER],
  },
  {
    index: '02',
    title: 'Funnel Builder',
    marks: [GHL, CLAUDE, OPENAI],
  },
  {
    index: '03',
    title: 'Website Builder',
    marks: [GHL, CLAUDE],
  },
  {
    index: '04',
    title: 'Ops & Admin Support',
    marks: [GWS, APPS_SCRIPT, SLACK],
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          I turn repetitive business processes into automated systems that work for you.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            After 5 years of manually encoding staff performance, daily reports, and
            administrative tasks, I learned exactly where repetitive work slows a business
            down.
            <span> Now, I build systems that automate the work, organize the process, and keep
            everything moving.</span>
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate: just the location and working hours. */}
          <div className="agrid__bar">
            <span className="agrid__cell agrid__cell--wide">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">GMT+8 · US hours</span>
              </span>
            </span>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.aboutPortraitSrc}
            alt={profile.name}
            loading="eager"
            decoding="async"
            width={1100}
            height={852}
          />
        </div>
      </div>
    </section>
  )
}