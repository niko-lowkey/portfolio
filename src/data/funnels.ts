export type FunnelTag = 'Lead Capture' | 'Funnel' | 'Checkout' | 'Website'

export type Funnel = {
  file: string
  label: string
  tag: FunnelTag
  desc: string
  /** Public subfolder the HTML + thumbnail live under. Default 'funnels'. */
  dir?: 'funnels' | 'samples'
  /** Optional 3:4 portrait thumbnail for the spinning reel and the stacked
   *  preview cards, which are portrait. Falls back to the standard thumbnail. */
  reelThumb?: string
}

/**
 * Your funnel pages and website samples.
 *
 * To add your own: drop the page's HTML in public/funnels/ (single pages) or
 * public/samples/ (full websites), add an entry here, then run
 * `node scripts/make-thumbs.mjs` to render its thumbnails.
 */

/** A real funnel page: lives in public/funnels/, shown 16:9. */
const dentalBooking: Funnel = {
  file: 'dental-clinic-booking.html',
  label: 'Dental Clinic Appointment Booking',
  tag: 'Funnel',
  reelThumb: '/funnels/thumbs/dental-clinic-booking-portrait.jpeg',
  desc: 'Concept booking funnel for a dental clinic: services, a short "how booking works" section, and an appointment request form that opens from every Book button.',
}

/** A real funnel page: lives in public/funnels/, shown 16:9. */
const carRental: Funnel = {
  file: 'car-rental.html',
  label: 'Car Rental',
  tag: 'Funnel',
  reelThumb: '/funnels/thumbs/car-rental-portrait.jpeg',
  desc: 'Concept lead-capture funnel for a premium car rental brand (Southline): a fleet showcase, a simple three-step flow, and a quote request form that opens from every call-to-action button.',
}

/** A full multi-section website: lives in public/samples/, shown 3:4. */
const barberWebsite: Funnel = {
  file: 'iron-and-ivy.html',
  label: 'Barbershop Website',
  tag: 'Website',
  desc: 'Concept website for an Austin barbershop (Iron & Ivy): a scroll-driven cinematic experience, services, barber profiles and memberships.',
  dir: 'samples',
}

/** A full multi-section website: lives in public/samples/, shown 3:4. */
const hotelWebsite: Funnel = {
  file: 'arden-and-row.html',
  label: 'Boutique Hotel Website',
  tag: 'Website',
  desc: 'Concept website for an independent boutique hotel (Arden & Row): rooms, restaurant and bar, wellness, and a reservation request form.',
  dir: 'samples',
}

/** A full multi-section website: lives in public/samples/, shown 3:4. */
const outdoorWebsite: Funnel = {
  file: 'willow-and-pine.html',
  label: 'Outdoor Stays Website',
  tag: 'Website',
  desc: 'Concept website for a nature-first retreat in Bend, Oregon (Willow & Pine): campsites, canvas tents and cabins, a fire circle, a cafe, and an availability check.',
  dir: 'samples',
}

/** A full multi-section website: lives in public/samples/, shown 3:4. */
const carRentalWebsite: Funnel = {
  file: 'northline-drive.html',
  label: 'Car Rental Website',
  tag: 'Website',
  desc: 'Concept website for a premium car rental brand (Northline Rentals): a filterable fleet, how it works, locations, reviews, and an availability check form.',
  dir: 'samples',
}

/** A full multi-section website: lives in public/samples/, shown 3:4. */
const spaWebsite: Funnel = {
  file: 'aurelia-rituals.html',
  label: 'Wellness Spa Website',
  tag: 'Website',
  desc: 'Concept website for a premium urban wellness spa (Aurelia): signature experiences, a treatment menu, memberships and gift cards, and a multi-step booking flow.',
  dir: 'samples',
}

/** The "Pages and sites" reel: funnels and full sites together. */
export const websiteFunnel: Funnel[] = [barberWebsite, spaWebsite, carRental, carRentalWebsite, outdoorWebsite, dentalBooking, hotelWebsite]

/**
 * Tag -> color map. Brand-external colors that identify the page type, passed
 * to CSS via an inline --tag-color custom property.
 */
export const tagColors: Record<FunnelTag, string> = {
  'Lead Capture': '#8b5cf6',
  Funnel: '#ec4899',
  Checkout: '#f59e0b',
  Website: '#FF7A1A',
}