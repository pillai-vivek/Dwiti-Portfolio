import { BRAND } from './brandIcons.js'

/** Inline brand logo (HTML context). */
export function Logo({ name, size = 40, title }) {
  const i = BRAND[name]
  if (!i) return null
  return (
    <svg width={size} height={size} viewBox={`0 0 ${i.w} ${i.h}`} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : 'true'}
      dangerouslySetInnerHTML={{ __html: i.b }} />
  )
}

/** Inline brand logo nested inside an SVG diagram. */
export function SvgLogo({ name, x, y, size = 30 }) {
  const i = BRAND[name]
  if (!i) return null
  return <svg x={x} y={y} width={size} height={size} viewBox={`0 0 ${i.w} ${i.h}`} dangerouslySetInnerHTML={{ __html: i.b }} />
}
