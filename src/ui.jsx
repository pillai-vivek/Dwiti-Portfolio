import { Component, useEffect, useRef, useState } from 'react'

export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${shown ? 'is-in' : ''} ${className}`}>{children}</Tag>
}

export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min((t - t0) / 1300, 1)
        setN(Math.round(to * (1 - (1 - p) ** 3)))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])
  return <span ref={ref}>{n}{suffix}</span>
}

export function Spotlight({ children, className = '', tone = 'light' }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return <div onMouseMove={onMove} className={`spotlight spotlight--${tone} ${className}`}>{children}</div>
}

export function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const f = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    f()
    window.addEventListener('scroll', f, { passive: true })
    window.addEventListener('resize', f)
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f) }
  }, [])
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}

export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }) }, { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

export class Guard extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error) { console.error('A section was hidden after an error:', error) }
  render() { return this.state.failed ? null : this.props.children }
}
