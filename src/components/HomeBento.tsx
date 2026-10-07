import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Robot,
  Medal,
  Stack,
  Quotes,
  FunnelSimple,
  Gear,
  AddressBook,
  Globe,
  AppWindow,
  SealCheck,
} from '@/components/slab'
import { websiteFunnel, type Funnel } from '@/data/funnels'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { sections, credentials } from '@/data/profile'

/**
 * Home's showcase: one card per rail view, each an index of what that view
 * holds, each built from content the portfolio already ships. Every card is
 * a link. Nothing here invents a fact - the funnels, the tools, the clients
 * and the credentials are the same records the views render in full.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */

const thumbSrc = (f: Funnel) =>
  `/home/${f.dir ?? 'funnels'}-${f.file.replace('.html', '.jpeg')}`

// The Projects card's drifting row: your real pages (up to four), each once.
// Placeholders only fill in while there is no real page yet.
const REAL_PAGES = websiteFunnel.filter((f) => !f.file.startsWith('placeholder-'))
const PROJECT_SHOTS = (REAL_PAGES.length ? REAL_PAGES : websiteFunnel).slice(0, 4)

const OFFERS = [
  { Icon: FunnelSimple, title: 'Service One', note: 'PLACEHOLDER one-liner' },
  { Icon: Gear, title: 'Service Two', note: 'PLACEHOLDER one-liner' },
  { Icon: AddressBook, title: 'Service Three', note: 'PLACEHOLDER one-liner' },
  { Icon: Globe, title: 'Service Four', note: 'PLACEHOLDER one-liner' },
  { Icon: AppWindow, title: 'Service Five', note: 'PLACEHOLDER one-liner' },
] as const

const CLIENTS = [
  { name: 'Client Name 1', role: 'PLACEHOLDER - your role for them', work: 'Tag · Tag · Tag', logo: '/placeholders/logo.svg' },
  { name: 'Client Name 2', role: 'PLACEHOLDER - your role for them', work: 'Tag · Tag · Tag', logo: '/placeholders/logo.svg' },
  { name: 'Client Name 3', role: 'PLACEHOLDER - your role for them', work: 'Tag · Tag · Tag' },
]

// Three photos of you, fanned. Small copies are fine - the fan shows them under 100px.
const PHOTOS = ['/about/photo-1.jpg', '/about/photo-2.jpg', '/about/photo-3.jpg']

/** The AI systems as a flat list: every leaf of the Projects tree, in order. */
const leaves = (n: StackNode): StackNode[] =>
  n.children?.length ? n.children.flatMap(leaves) : [n]
const AI_BUILDS = leaves(aiStack)

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const half = Math.ceil(AI_BUILDS.length / 2)
  const toolRows = [AI_BUILDS.slice(0, half), AI_BUILDS.slice(half)]

  return (
    <nav
      className={`bento${sections.testimonials ? '' : ' bento--no-quotes'}${sections.credentials ? '' : ' bento--no-creds'}`}
      aria-label="Explore the portfolio"
    >
      {/* Projects: the funnel thumbnails drift upward on a looped track. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="Funnels, websites, and workflows built to solve real problems." />
        <div className="bento__media bento__reel" aria-hidden="true">
          <div className="bento__reel-track">
            {[...PROJECT_SHOTS, ...PROJECT_SHOTS].map((f, i) => (
              <span key={i} className="bento__shot">
                <img src={thumbSrc(f)} alt="" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* About: a fanned stack of photos. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="PLACEHOLDER - one line about you." />
        <div className="bento__media bento__fan" aria-hidden="true">
          {PHOTOS.map((src, i) => (
            <span key={src} className="bento__photo" style={{ ['--i' as string]: i }}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </Link>

      {/* AI builds: the systems from the Projects tree, two chip rows
          scrolling against each other. */}
      <Link to="/projects" className="bento__card bento__card--ai">
        <CardHead Icon={Robot} title="AI Builds" desc="PLACEHOLDER - one line on your AI or side builds." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {toolRows.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((n, i) => (
                  <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                    <n.Icon size={15} weight="duotone" />
                    {n.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* Credentials: the badge that matters, on its plate. Hidden while
          sections.credentials is false (src/data/profile.ts). */}
      {sections.credentials && (
        <Link to="/about" className="bento__card bento__card--creds">
          <CardHead Icon={Medal} title="Credentials" desc="Certified through Make Academy: Foundation and Intermediate." />
          <div className="bento__media bento__badge" aria-hidden="true">
            <span className="bento__badge-pair">
              {credentials.map((c) => (
                <span key={c.name} className="bento__badge-ring bento__badge-ring--cert">
                  <img src={c.badgeSrc} alt="" width={84} height={84} />
                </span>
              ))}
            </span>
            <span className="bento__badge-tag">
              <SealCheck size={14} weight="fill" />
              {credentials[0].issuer}
            </span>
          </div>
        </Link>
      )}

      {/* Services: the five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="PLACEHOLDER - what you offer, and to whom." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* Testimonials: client cards drifting up a clipped column. Hidden
          while sections.testimonials is false (src/data/profile.ts). */}
      {sections.testimonials && (
        <Link to="/testimonials" className="bento__card bento__card--quotes">
          <CardHead Icon={Quotes} title="Testimonials" desc="PLACEHOLDER - one line on your clients." />
          <div className="bento__media bento__reviews" aria-hidden="true">
            <div className="bento__reviews-track">
              {[...CLIENTS, ...CLIENTS].map((c, i) => (
                <span key={i} className="bento__review">
                  <span className="bento__review-top">
                    {c.logo ? (
                      <img src={c.logo} alt="" width={18} height={18} />
                    ) : (
                      <Quotes size={14} weight="fill" />
                    )}
                    <b>{c.name}</b>
                  </span>
                  <span className="bento__review-role">{c.role}</span>
                  <span className="bento__review-work">{c.work}</span>
                </span>
              ))}
            </div>
          </div>
        </Link>
      )}
    </nav>
  )
}