import { useEffect, useRef, useState } from 'react'
import { getTheme, type Theme } from '@/lib/theme'
import { motionReduced } from '@/lib/a11y'

/**
 * Full-page background: a slow fly-through of a fine 3D node network, sharp
 * at 2560x1440 with soft depth-of-field on the near nodes. Two clips, one per
 * theme, swapped when the theme changes.
 * Keeps the .hero-canvas class so the cream fallback and the low-perf tier
 * (perf.css hides it) keep working exactly as before.
 */
export default function VideoBackground() {
  const ref = useRef<HTMLVideoElement>(null)
  const [theme, setTheme] = useState<Theme>(getTheme)

  useEffect(() => {
    const onTheme = (e: Event) => setTheme((e as CustomEvent<Theme>).detail ?? getTheme())
    window.addEventListener('themechange', onTheme)
    return () => window.removeEventListener('themechange', onTheme)
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.load()
    const reduce =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || motionReduced()
    if (reduce) {
      v.pause() // the poster frame stays as a still background
      return
    }
    v.play().catch(() => {})
    const onVis = () => {
      if (document.hidden) v.pause()
      else v.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [theme])

  const clip = theme === 'dark' ? 'bg-network-dark' : 'bg-network-light'

  return (
    <div className="hero-canvas" aria-hidden="true">
      <video
        key={clip}
        ref={ref}
        className="bg-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={`/${clip}-poster.jpg`}
      >
        <source src={`/${clip}.mp4`} type="video/mp4" />
      </video>
    </div>
  )
}