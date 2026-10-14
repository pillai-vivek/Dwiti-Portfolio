import { useEffect, useRef, useState } from 'react'
import { Download, Expand, GraduationCap, Layers, Target, X, Award } from 'lucide-react'
import { Reveal } from './ui.jsx'
import preview from './assets/resume-preview.jpg'
import { RESUME_B64 } from './resumeData.js'

function pdfBlob() {
  const bin = atob(RESUME_B64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return new Blob([bytes], { type: 'application/pdf' })
}

async function downloadResume() {
  const filename = 'Dwiti_Thakkar_Resume.pdf'
  // Inside claude.ai the viewer grants downloads; on a normal site we fall back to a plain link.
  try {
    const dl = await window.claude?.use?.('downloads')
    if (dl) { await dl.save({ filename, data: pdfBlob() }); return }
  } catch (e) {
    if (e && e.code === 'declined') return
  }
  const url = URL.createObjectURL(pdfBlob())
  const a = document.createElement('a')
  a.href = url; a.download = filename
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}

export default function Resume() {
  const [open, setOpen] = useState(false)
  const card = useRef(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', esc) }
  }, [open])

  const tilt = (e) => {
    const el = card.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1200px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`
  }
  const reset = () => { if (card.current) card.current.style.transform = '' }

  return (
    <section className="section" id="resume" aria-labelledby="resume-h">
      <div className="wrap resume">
        <Reveal className="resume__doc">
          <button className="paper" ref={card} onMouseMove={tilt} onMouseLeave={reset} onClick={() => setOpen(true)} aria-label="View the resume at full size">
            <img src={preview} alt="Dwiti Thakkar's one-page resume" width="1190" height="1540" loading="lazy" />
            <span className="paper__hint"><Expand size={16} aria-hidden="true" />View full size</span>
          </button>
        </Reveal>
        <Reveal className="resume__body" delay={100}>
          <h2 id="resume-h">Resume</h2>
          <p className="resume__lead">A one-page summary of my experience, skills and projects. Cloud operations across AWS and Azure, with hands-on builds in Terraform and disaster recovery.</p>
          <ul className="resume__facts">
            <li><Target size={20} aria-hidden="true" /><span><b>Looking for</b>AWS Cloud Engineer roles</span></li>
            <li><GraduationCap size={20} aria-hidden="true" /><span><b>Education</b>B.E. Computer Engineering, 8.98 CGPA</span></li>
            <li><Award size={20} aria-hidden="true" /><span><b>Certifications</b>AWS Solutions Architect Associate, AWS Cloud Practitioner, AWS AI Practitioner, Azure Fundamentals</span></li>
            <li><Layers size={20} aria-hidden="true" /><span><b>Projects</b>BoingBuy cloud-native e-commerce, AWS disaster recovery automation</span></li>
          </ul>
          <div className="resume__cta">
            <button className="btn btn--solid" onClick={downloadResume}><Download size={18} aria-hidden="true" />Download PDF</button>
            <button className="btn btn--ghost" onClick={() => setOpen(true)}><Expand size={18} aria-hidden="true" />View full size</button>
          </div>
        </Reveal>
      </div>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Resume" onClick={() => setOpen(false)}>
          <button className="lightbox__close" onClick={() => setOpen(false)} aria-label="Close resume"><X size={24} /></button>
          <div className="lightbox__scroll" onClick={(e) => e.stopPropagation()}>
            <img src={preview} alt="Dwiti Thakkar's resume, full size" />
          </div>
          <button className="btn btn--light lightbox__dl" onClick={(e) => { e.stopPropagation(); downloadResume() }}><Download size={18} aria-hidden="true" />Download PDF</button>
        </div>
      )}
    </section>
  )
}
