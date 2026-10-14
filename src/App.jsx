import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Award, Check, Copy, Download, GraduationCap, Mail, MapPin, Menu, X, Linkedin, Languages } from 'lucide-react'
import { Counter, Guard, Reveal, Spotlight, useActiveSection } from './ui.jsx'
import OpsConsole from './OpsConsole.jsx'
import { BoingBuyViz, DrViz } from './ProjectViz.jsx'
import Toolkit from './Toolkit.jsx'
import Resume from './Resume.jsx'
import { Logo } from './Brand.jsx'
import { AvdVisual, AwsVisual, IamVisual, MonitorVisual, RunbookVisual } from './Visuals.jsx'
import badgeSaa from './assets/cert-aws-saa.png'
import badgeCp from './assets/cert-aws-cp.png'
import badgeAi from './assets/cert-aws-ai.png'

const PROFILE = { name: 'Dwiti Thakkar', email: 'thakkardwiti@gmail.com', linkedin: 'https://www.linkedin.com/in/dwiti-thakkar-cloud' }
const NAV = [
  { id: 'about', label: 'About' }, { id: 'work', label: 'What I do' }, { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' }, { id: 'toolkit', label: 'Toolkit' }, { id: 'resume', label: 'Resume' },
]
const SECTION_IDS = ['about', 'work', 'projects', 'experience', 'toolkit', 'certifications', 'resume', 'contact']
const SKILLS = ['AWS EC2', 'Amazon S3', 'Amazon RDS', 'AWS IAM', 'VPC', 'ECS Fargate', 'Terraform', 'Linux', 'Azure Virtual Desktop', 'CloudWatch', 'Lambda', 'Step Functions', 'Systems Manager', 'Incident response', 'SLA compliance', 'Disaster recovery', 'Runbooks']

const CAPABILITIES = [
  { id: 'aws', title: 'AWS environments', Visual: AwsVisual, text: 'I provision and manage AWS environments for enterprise managed-services clients, so compute, databases and access stay available and perform consistently.', tags: ['EC2', 'RDS', 'IAM', 'S3'] },
  { id: 'avd', title: 'Azure Virtual Desktop', Visual: AvdVisual, text: 'I manage host pools, session hosts and user access provisioning, keeping virtual desktops available and fast for the people who depend on them every day.', tags: ['Host pools', 'Session hosts', 'User access'] },
  { id: 'iam', title: 'Identity and access', Visual: IamVisual, text: 'I configure IAM roles and permission boundaries on AWS and manage identity and access policies on Azure, enforcing least privilege across client environments.', tags: ['IAM roles', 'Permission boundaries', 'Azure policies'] },
  { id: 'monitor', title: 'Monitoring and incidents', Visual: MonitorVisual, text: 'I watch workload health across AWS and Azure, and support incident detection and resolution so client SLAs are met.', tags: ['Workload health', 'Incident response', 'SLA'] },
  { id: 'docs', title: 'Runbooks and documentation', Visual: RunbookVisual, text: 'I build and maintain runbooks, operating procedures and environment documentation, so the team works consistently and knowledge transfers cleanly.', tags: ['Runbooks', 'Procedures', 'Knowledge transfer'] },
]

const EXPERIENCE = [
  { org: 'Parkar', place: 'Ahmedabad, Gujarat', roles: [
    { title: 'Cloud Operations Engineer', period: 'Apr 2025 to present', current: true, points: [
      ['AWS', 'Provision and manage AWS environments including EC2, RDS and IAM for enterprise managed-services clients, ensuring consistent availability and performance.'],
      ['Azure Virtual Desktop', 'Manage AVD host pools, session hosts and user access provisioning for enterprise clients, maintaining availability and performance.'],
      ['Identity and access', 'Configure IAM roles and permission boundaries on AWS and manage identity and access policies on Azure, enforcing least-privilege access across client environments.'],
      ['Monitoring and incidents', 'Monitor workload health across AWS and Azure, supporting incident detection and resolution to maintain SLA compliance for enterprise clients.'],
      ['Documentation', 'Build and maintain runbooks, operational procedures and environment documentation to support team consistency and knowledge transfer.'],
    ] },
    { title: 'Cloud Operations Intern', period: 'Jan 2025 to Apr 2025', points: [
      ['Hands-on AWS', 'Worked with EC2, RDS and IAM across live client environments, progressing from guided tasks to independent contributions.'],
      ['Azure Virtual Desktop', 'Assisted with AVD environment tasks, building a foundation in Azure virtual desktop infrastructure and user access management.'],
      ['Access control', 'Assisted in configuring IAM roles and policies for client AWS accounts.'],
      ['Operations', 'Contributed to day-to-day operations, monitoring workload health and supporting the managed services team across AWS and Azure.'],
      ['Documentation and certification', 'Created operational documentation and earned AWS Certified Cloud Practitioner during the internship.'],
    ] },
  ] },
  { org: 'JVS Technologies Pvt. Ltd.', place: 'Ahmedabad, Gujarat', roles: [
    { title: 'AWS Engineer', period: 'Jun 2024 to Jul 2024', points: [
      ['Environment setup', 'Assisted with the setup and configuration of AWS environments for client deployment tasks, working with EC2, S3 and IAM.'],
      ['First client work', 'Gained first professional experience in cloud infrastructure management, deployment workflows and service configuration in a client-facing context.'],
    ] },
  ] },
]
const CERTS = [
  { name: 'AWS Certified Solutions Architect', level: 'Associate', badge: badgeSaa },
  { name: 'AWS Certified Cloud Practitioner', level: 'Foundational', badge: badgeCp },
  { name: 'AWS Certified AI Practitioner', level: 'Foundational', badge: badgeAi },
  { name: 'Microsoft Certified: Azure Fundamentals', level: 'Fundamentals', azure: true },
]
const EDUCATION = [
  { title: 'Bachelor of Engineering, Computer Engineering', school: 'Gujarat Technological University (SAL Engineering and Technical Institute)', note: 'Graduated 2025 | 8.98 CGPA' },
  { title: 'Diploma, Computer Engineering', school: 'Government Polytechnic for Girls', note: '9.30 CGPA' },
]

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const ids = useMemo(() => SECTION_IDS, [])
  const active = useActiveSection(ids)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [open])
  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="nav__inner" aria-label="Primary">
          <a href="#top" className="nav__brand" aria-label="Dwiti Thakkar, back to top"><span className="nav__mark">DT</span><span className="nav__name">Dwiti Thakkar</span></a>
          <ul className="nav__links">
            {NAV.map((n) => (<li key={n.id}><a href={`#${n.id}`} className={active === n.id ? 'is-active' : ''} aria-current={active === n.id ? 'true' : undefined}>{n.label}</a></li>))}
          </ul>
          <a href="#contact" className="btn btn--sm btn--solid nav__cta">Get in touch</a>
          <button className="nav__burger" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}><Menu size={22} /></button>
        </nav>
      </header>
      {open && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="drawer__close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={24} /></button>
          {[...NAV, { id: 'contact', label: 'Contact' }].map((n, i) => (<a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} style={{ animationDelay: `${i * 60}ms` }}>{n.label}</a>))}
        </div>
      )}
    </>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true"><div className="hero__grid" /><span className="blob blob--a" /><span className="blob blob--b" /></div>
      <div className="wrap hero__layout">
        <div className="hero__copy">
          <h1 className="hero__name" aria-label="Dwiti Thakkar">
            <span className="line"><span style={{ '--d': '0ms' }}>Dwiti</span></span>
            <span className="line"><span style={{ '--d': '110ms' }}>Thakkar</span></span>
          </h1>
          <p className="hero__role">Cloud Operations Engineer at Parkar</p>
          <p className="hero__lead">I run AWS and Azure environments for enterprise clients: access control, virtual desktops, monitoring and incident response, so engineering teams can move fast without breaking things.</p>
          <div className="hero__cta">
            <a href="#experience" className="btn btn--solid">View my experience</a>
            <a href="#resume" className="btn btn--ghost"><Download size={16} aria-hidden="true" />Resume</a>
          </div>
          <ul className="hero__chips"><li>AWS Solutions Architect Associate</li><li>Azure Fundamentals</li><li>Terraform</li></ul>
        </div>
        <div className="hero__console"><Guard><OpsConsole /></Guard></div>
      </div>
    </section>
  )
}

function Marquee() {
  const row = [...SKILLS, ...SKILLS]
  return (
    <div className="marquee" aria-label="Tools and skills">
      <div className="marquee__track">{row.map((s, i) => <span key={i} aria-hidden={i >= SKILLS.length ? 'true' : undefined}>{s}</span>)}</div>
    </div>
  )
}

function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-h">
      <div className="wrap about">
        <Reveal className="about__quote"><h2 id="about-h">Cloud operations done right lets engineering teams move fast without breaking things.</h2></Reveal>
        <Reveal className="about__body" delay={80}>
          <p>I manage cloud environments across compute, database and identity for enterprise managed-services clients, from provisioning and access control to virtual desktops, monitoring and incident response.</p>
          <p>I work across AWS and Azure every day, and I'm growing into deeper cloud architecture and security, with a focus on infrastructure that is observable, secure and self-sustaining. Outside client work I build hands-on: Terraform-managed AWS infrastructure, containerized deployments and disaster recovery validation. I'm also genuinely interested in how AI-driven automation is reshaping cloud operations.</p>
          <dl className="facts">
            <div><dt><MapPin size={16} aria-hidden="true" />Based in</dt><dd>Ahmedabad, Gujarat, India</dd></div>
            <div><dt><Languages size={16} aria-hidden="true" />Languages</dt><dd>Gujarati, English and Hindi, all full professional</dd></div>
          </dl>
        </Reveal>
        <Reveal className="stats" delay={120}>
          <div><b><Counter to={4} /></b><span>cloud certifications</span></div>
          <div><b><Counter to={2} /></b><span>clouds in daily operation</span></div>
          <div><b><Counter to={2} suffix="+" /></b><span>years in hands-on cloud work</span></div>
        </Reveal>
      </div>
    </section>
  )
}

function Work() {
  const [idx, setIdx] = useState(0)
  const [started, setStarted] = useState(false)
  const refs = useRef([])
  const root = useRef(null)
  const cur = CAPABILITIES[idx]

  // Start from the first area when the section first comes into view.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIdx(0); setStarted(true); io.disconnect() }
    }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Flows on its own: AWS, Azure Virtual Desktop, Identity and access, and so on, then back around.
  // Clicking a tab jumps there and the flow carries on from that point.
  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => setIdx((i) => (i + 1) % CAPABILITIES.length), 5500)
    return () => clearTimeout(t)
  }, [idx, started])

  const onKey = useCallback((e) => {
    const horizontal = window.matchMedia('(max-width: 1020px)').matches
    const next = horizontal ? 'ArrowRight' : 'ArrowDown'
    const prev = horizontal ? 'ArrowLeft' : 'ArrowUp'
    if (e.key !== next && e.key !== prev) return
    e.preventDefault()
    const n = (idx + (e.key === next ? 1 : -1) + CAPABILITIES.length) % CAPABILITIES.length
    setIdx(n)
    refs.current[n]?.focus()
  }, [idx])

  // On phones the tab strip scrolls sideways: keep the active tab in view as it changes.
  useEffect(() => {
    const el = refs.current[idx]
    const strip = el?.parentElement
    if (!el || !strip || strip.scrollWidth <= strip.clientWidth) return
    strip.scrollTo({ left: el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' })
  }, [idx])

  return (
    <section className="section section--mist" id="work" aria-labelledby="work-h" ref={root}>
      <div className="wrap">
        <Reveal className="section__head"><h2 id="work-h">What I take care of</h2><p>Five areas I own day to day for enterprise clients. Watch them play through, or pick one to see how it works.</p></Reveal>
        <Reveal className="work" delay={60}>
          <div className="work__side">
            <div className="work__tabs" role="tablist" aria-label="Areas of work" onKeyDown={onKey}>
              {CAPABILITIES.map((c, i) => (
                <button key={c.id} ref={(el) => (refs.current[i] = el)} role="tab" id={`tab-${c.id}`} aria-selected={i === idx} aria-controls="work-panel" tabIndex={i === idx ? 0 : -1} className={i === idx ? 'is-on' : ''} onClick={() => setIdx(i)}>{c.title}</button>
              ))}
            </div>
          </div>
          <div className="work__panel" role="tabpanel" id="work-panel" aria-labelledby={`tab-${cur.id}`} aria-live="off">
            <div className="work__viz" key={cur.id}><cur.Visual /></div>
            <div className="work__text" key={`t-${cur.id}`}><h3>{cur.title}</h3><p>{cur.text}</p><ul className="tags">{cur.tags.map((t) => <li key={t}>{t}</li>)}</ul></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const PROJECTS = [
  {
    id: 'boingbuy', Viz: BoingBuyViz, kind: 'AWS, Terraform',
    title: 'BoingBuy: cloud-native e-commerce',
    lead: 'Moved a Node.js and React application off a single VM and onto a three-tier AWS architecture that is provisioned entirely with Terraform.',
    points: [
      'Migrated the application from one VM to a Terraform-provisioned three-tier architecture',
      'Segmented public and private subnets with a NAT Gateway, and deployed the API on ECS Fargate behind an ALB',
      'Used RDS PostgreSQL, ElastiCache Redis, ECR, S3 and CloudFront, secured credentials with Secrets Manager and set up CloudWatch alarms',
    ],
    stack: [['terraform-icon', 'Terraform'], ['aws-fargate', 'ECS Fargate'], ['aws-elb', 'ALB'], ['postgresql', 'PostgreSQL'], ['aws-elasticache', 'ElastiCache'], ['aws-cloudfront', 'CloudFront'], ['aws-secrets-manager', 'Secrets Manager'], ['aws-cloudwatch', 'CloudWatch']],
  },
  {
    id: 'dr', Viz: DrViz, kind: 'AWS, Serverless',
    title: 'AWS disaster recovery automation',
    lead: 'A multi-region design that keeps the application available when a whole region fails, with the failover automated and then proven in simulations.',
    points: [
      'Designed a multi-region architecture with Route 53, ECS Fargate and cross-region RDS replication',
      'Automated failover with Lambda, Step Functions and CloudWatch: health validation, database promotion and traffic rerouting',
      'Ran disaster recovery simulations to validate RTO, RPO and application health after failover',
    ],
    stack: [['aws-route53', 'Route 53'], ['aws-fargate', 'ECS Fargate'], ['aws-rds', 'RDS'], ['aws-lambda', 'Lambda'], ['aws-step-functions', 'Step Functions'], ['aws-cloudwatch', 'CloudWatch']],
  },
]

function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-h">
      <div className="wrap">
        <Reveal className="section__head">
          <h2 id="projects-h">Projects</h2>
          <p>Two hands-on AWS builds, shown the way they work.</p>
        </Reveal>
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <article key={p.id} className={`proj ${i % 2 ? 'proj--rev' : ''}`}>
              <Reveal className="proj__copy">
                <span className="proj__kind">{p.kind}</span>
                <h3>{p.title}</h3>
                <p className="proj__lead">{p.lead}</p>
                <ul className="proj__points">{p.points.map((pt) => <li key={pt}><Check size={16} aria-hidden="true" />{pt}</li>)}</ul>
                <ul className="proj__stack">{p.stack.map(([l, n]) => <li key={n}><Logo name={l} size={20} />{n}</li>)}</ul>
              </Reveal>
              <Reveal className="proj__viz" delay={120}><p.Viz /></Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const f = () => {
      const r = el.getBoundingClientRect()
      const p = (window.innerHeight * 0.6 - r.top) / r.height
      el.style.setProperty('--p', String(Math.max(0, Math.min(1, p))))
    }
    f()
    window.addEventListener('scroll', f, { passive: true })
    window.addEventListener('resize', f)
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f) }
  }, [])
  return (
    <section className="section" id="experience" aria-labelledby="exp-h">
      <div className="wrap">
        <Reveal className="section__head"><h2 id="exp-h">Where I've worked</h2><p>From first AWS deployments to running client environments across two clouds.</p></Reveal>
        <div className="timeline" ref={ref}>
          <div className="timeline__rail" aria-hidden="true"><i /></div>
          {EXPERIENCE.map((org) => (
            <Reveal key={org.org} className="org">
              <div className="org__head"><h3>{org.org}</h3><span>{org.place}</span></div>
              {org.roles.map((r) => (
                <article key={r.title} className={`role ${r.current ? 'role--current' : ''}`}>
                  <header><h4>{r.title}</h4><time>{r.period}</time>{r.current && <em>Current</em>}</header>
                  <ul>{r.points.map(([k, v]) => (<li key={k}><strong>{k}.</strong> {v}</li>))}</ul>
                </article>
              ))}
            </Reveal>
          ))}
        </div>
        <Reveal className="edu">
          <h3><GraduationCap size={20} aria-hidden="true" />Education</h3>
          <ul>{EDUCATION.map((e) => (<li key={e.title}><strong>{e.title}</strong><span>{e.school}</span><span className="edu__note">{e.note}</span></li>))}</ul>
        </Reveal>
      </div>
    </section>
  )
}

function AzureBadge() {
  return (
    <div className="azure-badge" role="img" aria-label="Microsoft Certified: Azure Fundamentals">
      <svg viewBox="0 0 112 112" width="112" height="112" aria-hidden="true">
        <defs><linearGradient id="azg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1f7bf2" /><stop offset="1" stopColor="#0b3d91" /></linearGradient></defs>
        <polygon points="56,4 102,30 102,82 56,108 10,82 10,30" fill="url(#azg)" stroke="#8fb4ff" strokeWidth="2" />
        <text x="56" y="25" textAnchor="middle" fontSize="8" fontWeight="600" fill="#cfe0ff" fontFamily="Source Sans 3, sans-serif">Microsoft Certified</text>
        <text x="56" y="90" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" fontFamily="Source Sans 3, sans-serif">AZURE FUNDAMENTALS</text>
      </svg>
      <span className="azure-badge__logo"><Logo name="microsoft-azure" size={36} /></span>
    </div>
  )
}

function Certifications() {
  return (
    <section className="section section--navy" id="certifications" aria-labelledby="cert-h">
      <div className="navy-bg" aria-hidden="true"><div className="hero__grid hero__grid--dark" /></div>
      <div className="wrap">
        <Reveal className="section__head section__head--dark"><h2 id="cert-h">Certifications that match the work</h2><p>Credentials in the platforms I operate every day.</p></Reveal>
        <div className="certs">
          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 90}>
              <Spotlight tone="dark" className="cert">
                {c.azure ? <AzureBadge /> : <img src={c.badge} alt={`${c.name} badge`} width="112" height="112" loading="lazy" />}
                <h3>{c.name}</h3><p>{c.level}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
        <Reveal className="cert-note" delay={120}><Award size={18} aria-hidden="true" /><span>Certificate of Participation, TATA Crucible Campus Quiz 2024</span></Reveal>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2200)
    } catch { window.location.href = `mailto:${PROFILE.email}` }
  }
  return (
    <section className="section section--navy contact" id="contact" aria-labelledby="contact-h">
      <div className="navy-bg" aria-hidden="true"><div className="hero__grid hero__grid--dark" /><span className="blob blob--c" /></div>
      <div className="wrap contact__inner">
        <Reveal>
          <h2 id="contact-h">Let's talk cloud operations.</h2>
          <p className="contact__lead">Have an environment to keep healthy, or a team that needs another pair of hands? Send me a note and I'll get back to you.</p>
        </Reveal>
        <Reveal className="contact__actions" delay={90}>
          <a className="btn btn--light" href={`mailto:${PROFILE.email}`}><Mail size={18} aria-hidden="true" />{PROFILE.email}</a>
          <button className="btn btn--outline-dark" onClick={copy} aria-live="polite">{copied ? <><Check size={18} aria-hidden="true" />Copied</> : <><Copy size={18} aria-hidden="true" />Copy email</>}</button>
          <a className="btn btn--outline-dark" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} aria-hidden="true" />LinkedIn<ArrowUpRight size={16} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (<footer className="footer"><div className="wrap footer__inner"><span>© {new Date().getFullYear()} Dwiti Thakkar</span><a href="#top">Back to top</a></div></footer>)
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Guard><About /></Guard>
        <Guard><Work /></Guard>
        <Guard><Projects /></Guard>
        <Guard><Experience /></Guard>
        <Guard><Toolkit /></Guard>
        <Guard><Certifications /></Guard>
        <Guard><Resume /></Guard>
        <Guard><Contact /></Guard>
      </main>
      <Footer />
    </>
  )
}
