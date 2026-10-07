import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { tagColors, type Funnel } from '@/data/funnels'
import '../styles/funnel-reel.css'

/**
 * The funnels and sites as one conveyor belt that snakes through three columns.
 *
 *   column 1 carries a page UP, it leaves the top and re-enters column 2 at
 *   the top going DOWN, leaves the bottom and re-enters column 3 at the bottom
 *   going UP, then loops back to column 1.
 *
 * So every page travels through every column, one after another. Each page is
 * on the belt exactly ONCE, so the same page can never show twice at the same
 * time. With few pages the viewing window is made a little shorter (centered)
 * so the belt still has no empty stretches and no repeats.
 * Cards are flat, upright and labelled. The belt stops while the pointer is on
 * it (or a finger is down, or a card has focus) so any page can be read and
 * clicked. Clicking opens the page in the preview dialog (onOpen comes from
 * useFunnelModal).
 */

/** Belt speed in pixels per second. */
const SPEED = 38
/** Space between cards, in px. */
const GAP = 18
/** Below this width the belt uses two columns instead of three. */
const TWO_COLUMN_BELOW = 640

type Props = {
  funnels: Funnel[]
  onOpen: (funnel: Funnel, trigger?: HTMLElement | null) => void
}

function thumbSrc(f: Funnel) {
  if (f.reelThumb) return f.reelThumb
  return `/${f.dir ?? 'funnels'}/thumbs/${f.file.replace('.html', '.jpeg')}`
}

function CardFace({ f }: { f: Funnel }) {
  // If the preview image is missing, show a tidy tile instead of a broken icon.
  const [failed, setFailed] = useState(false)
  return (
    <span className="freel__face" style={{ '--tag-color': tagColors[f.tag] } as CSSProperties}>
      {failed ? (
        <span className="freel__blank" aria-hidden="true">
          Preview not available
        </span>
      ) : (
        <img src={thumbSrc(f)} alt="" draggable={false} onError={() => setFailed(true)} />
      )}
      <span className="freel__meta">
        {f.tag !== 'Website' && <span className="freel__tag">{f.tag}</span>}
        <span className="freel__title">{f.label}</span>
      </span>
    </span>
  )
}

export default function FunnelReel({ funnels, onOpen }: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [reduced, setReduced] = useState(false)

  // Respect "reduce motion": show a plain grid of every page instead.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Keep the stage size current.
  useEffect(() => {
    const el = stageRef.current
    if (!el || reduced) return
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }))
    ro.observe(el)
    setSize({ w: el.clientWidth, h: el.clientHeight })
    return () => ro.disconnect()
  }, [reduced])

  // Belt geometry. A column must be at least as long as the window plus one
  // card, so a card has fully left the view before it hands over to the next
  // column. With plenty of pages that is easy. With few pages the window is
  // made shorter (and centered) instead of repeating pages or leaving gaps.
  const layout = useMemo(() => {
    if (reduced || funnels.length === 0 || size.w < 50 || size.h < 50) return null
    const lanes = size.w < TWO_COLUMN_BELOW ? 2 : 3
    const colW = (size.w - GAP * (lanes - 1)) / lanes
    const cardH = (colW * 4) / 3
    const step = cardH + GAP
    const n = funnels.length
    const need = Math.ceil((lanes * (size.h + step)) / step)

    let slots = n
    let winH = size.h
    if (n < need) {
      const shorter = (n * step) / lanes - cardH
      if (shorter >= size.h * 0.6) {
        winH = shorter // no gaps, no repeats, slightly shorter window
      } else {
        slots = need // very few pages: leave short gaps rather than repeat
      }
    }
    const belt = slots * step
    return { lanes, colW, cardH, step, belt, laneLen: belt / lanes, h: winH, top: (size.h - winH) / 2 }
  }, [funnels.length, size, reduced])

  // Place every card for the current belt offset.
  const place = useMemo(() => {
    if (!layout) return null
    const { lanes, colW, cardH, step, belt, laneLen, h } = layout
    const count = funnels.length
    return () => {
      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i]
        if (!el) continue
        const u = (((i * step + offsetRef.current) % belt) + belt) % belt
        const lane = Math.min(lanes - 1, Math.floor(u / laneLen))
        const d = u - lane * laneLen
        const up = lane % 2 === 0
        const y = up ? h - d : d - cardH
        const x = lane * (colW + GAP)
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }
  }, [layout, funnels.length])

  useEffect(() => {
    if (!layout || !place) return
    place()
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      if (!pausedRef.current) {
        offsetRef.current = (offsetRef.current + SPEED * dt) % layout.belt
        place()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [layout, place])

  // Keyboard focus: stop the belt and bring that card to the middle of column 2
  // so it is never focused off-screen.
  const onCardFocus = (index: number, el: HTMLElement) => {
    pausedRef.current = true
    if (!layout || !place || !el.matches(':focus-visible')) return
    const { laneLen, cardH, step, belt, h } = layout
    const target = laneLen + (h + cardH) / 2
    offsetRef.current = (((target - index * step) % belt) + belt) % belt
    place()
  }

  if (reduced) {
    return (
      <div className="freel freel--static">
        <p className="freel__hint">Click a page to open it</p>
        <div className="freel__grid">
          {funnels.map((f) => (
            <button
              key={f.file}
              type="button"
              className="freel__card"
              aria-label={`Open ${f.label} (${f.tag})`}
              onClick={(e) => onOpen(f, e.currentTarget)}
            >
              <CardFace f={f} />
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="freel">
      <p className="freel__hint">Click a page to open it</p>
      <div
        ref={stageRef}
        className="freel__stage"
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') pausedRef.current = true
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') pausedRef.current = false
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') pausedRef.current = true
        }}
        onPointerUp={(e) => {
          if (e.pointerType !== 'mouse') pausedRef.current = false
        }}
        onPointerCancel={() => {
          pausedRef.current = false
        }}
        onBlurCapture={() => {
          pausedRef.current = false
        }}
      >
        {layout && (
          <div className="freel__belt" style={{ top: layout.top, height: layout.h }}>
            {funnels.map((f, i) => (
              <button
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                type="button"
                className="freel__card"
                style={{ width: layout.colW, height: layout.cardH }}
                aria-label={`Open ${f.label} (${f.tag})`}
                onFocus={(e) => onCardFocus(i, e.currentTarget)}
                onClick={(e) => onOpen(f, e.currentTarget)}
              >
                <CardFace f={f} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}