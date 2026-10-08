/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline. Every value below is a PLACEHOLDER.
 * Replace the text, or hand this file to your AI assistant and tell it what
 * to put in each field.
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

import { Briefcase, SealCheck, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Big portrait on the About page (transparent PNG, sits on the card's bottom edge). */
  aboutPortraitSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Angelo Alob',
  firstName: 'Angelo',
  handle: '@angeloalob',
  role: 'GHL Specialist (CRM Automation, Funnel & Website Builder)',
  avatarSrc: '/avatar.png',
  aboutPortraitSrc: '/about/portrait.png',
  verifiedLabel: 'PLACEHOLDER - what the tick means (e.g. a certification)',
  email: 'nikzalob@gmail.com',
  location: 'Based in the Philippines',
  // Pick any icon from https://phosphoricons.com and import it above.
  stats: [
    { value: '0 yrs', label: 'PLACEHOLDER', Icon: Briefcase },
    { value: '#000', label: 'PLACEHOLDER', Icon: SealCheck },
    { value: 'GMT+0', label: 'PLACEHOLDER', Icon: Clock },
  ],
  // The intro types this line, then flies it into the Home headline.
  // Keep it short: two halves, 5-8 words total.
  // Non-breaking spaces (\u00a0) keep each sentence whole, so the headline only
  // ever wraps between sentences.
  displayName: {
    line1: 'Automate\u00a0the\u00a0Busywork.',
    line2: 'Grow\u00a0the\u00a0Business.',
  },
  hero: {
    body: 'I help businesses build funnels, websites, eCommerce stores, CRM setup, and automations in GoHighlevel that streamline operations and turn more leads into customers.',
    portraitSrc: '/avatar.png',
    portraitAlt: 'Portrait of Angelo Alob',
  },
  socials: [
    { label: 'Facebook profile', href: 'https://www.facebook.com/nikolowkey/', iconPath: '/icons/facebook.svg' },
    { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/angelo-alob-36666914b/', iconPath: '/icons/linkedin.svg' },
    { label: 'Instagram profile', href: 'https://www.instagram.com/gelo.niko.x/', iconPath: '/icons/instagram.svg' },
    { label: 'OnlineJobs.ph profile', href: 'https://www.onlinejobs.ph/jobseekers/info/5126890', iconPath: '/icons/onlinejobs.svg' },
  ],
}

/**
 * Sections switched off until there is real content for them. Set one to
 * true to bring it back: the sidebar link, the Home card and the page itself
 * all follow this one switch. (`credentials` controls the Credentials card on
 * Home and the certificate cells on About; the list itself is `credentials`
 * below.)
 */
/**
 * Placeholder items hidden for now. Remove an id (or set aiBuilds to false)
 * to bring it back. Nothing is deleted, only not shown.
 *   Projects page ids: 'plan' (Sample Document), 'ai' (Your systems title
 *   here), 'apps' (Apps and tools), 'framework' (Featured Project Two),
 *   'workflow' (Featured Project Three).
 */
export const hidden = {
  aiBuilds: true,
  projects: ['plan', 'ai', 'apps', 'framework', 'workflow'] as string[],
}

export const sections = {
  showcase: false,
  testimonials: false,
  credentials: false,
}

/**
 * Certifications shown on Home (Credentials card) and About. Badge images and
 * PDFs live in public/certificates/. Newest first is fine; the order here is
 * the order shown.
 */
export type Credential = {
  name: string
  issuer: string
  issued: string
  badgeSrc: string
  pdfSrc: string
}

export const credentials: Credential[] = [
  {
    name: 'Make Intermediate',
    issuer: 'Make Academy',
    issued: 'Jul 2026',
    badgeSrc: '/certificates/make-intermediate.png',
    pdfSrc: '/certificates/make-intermediate.pdf',
  },
  {
    name: 'Make Foundation',
    issuer: 'Make Academy',
    issued: 'Jul 2026',
    badgeSrc: '/certificates/make-foundation.png',
    pdfSrc: '/certificates/make-foundation.pdf',
  },
]