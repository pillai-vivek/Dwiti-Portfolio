import { useEffect, useRef } from 'react'
import { SvgLogo } from './Brand.jsx'

/* Plays the diagram only while it is on screen. */
function Frame({ caption, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const svg = el.querySelector('svg')
    const io = new IntersectionObserver(([e]) => {
      el.classList.toggle('is-live', e.isIntersecting)
      try { e.isIntersecting ? svg?.unpauseAnimations?.() : svg?.pauseAnimations?.() } catch { /* older browsers */ }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <figure className="pv" ref={ref}>
      <div className="pv__stage">{children}</div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function Pulse({ path, dur = 2.4, begin = 0, r = 4.5, gate }) {
  return (
    <circle r={r} className={`pv-pulse ${gate || ''}`}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
    </circle>
  )
}

function Node({ x, y, logo, label, w = 92, h = 62, className = '' }) {
  return (
    <g className={`pv-node ${className}`}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="14" className="pv-card" />
      <SvgLogo name={logo} x={x - 15} y={y - h / 2 + 8} size={30} />
      <text x={x} y={y + h / 2 - 9} textAnchor="middle" className="pv-t2 dark">{label}</text>
    </g>
  )
}

/* BoingBuy: three-tier AWS architecture */
export function BoingBuyViz() {
  const wires = [
    ['M52 200 L88 200', 0], ['M152 200 L222 150', 0.4], ['M268 150 L338 112', 0.8], ['M268 150 L338 200', 1.0],
    ['M404 112 L470 112', 1.4], ['M404 200 L470 200', 1.6],
  ]
  return (
    <Frame caption="Illustration: request path through the three-tier architecture">
      <svg viewBox="0 0 600 380" role="img" aria-label="Three-tier AWS architecture: CloudFront, ALB, ECS Fargate, RDS and ElastiCache inside a VPC">
        <rect x="176" y="16" width="410" height="348" rx="20" className="pv-zone" />
        <text x="192" y="40" className="pv-zone-t">VPC</text>
        <rect x="190" y="52" width="104" height="298" rx="14" className="pv-sub" />
        <rect x="306" y="52" width="130" height="298" rx="14" className="pv-sub" />
        <rect x="448" y="52" width="124" height="298" rx="14" className="pv-sub" />
        <text x="242" y="70" textAnchor="middle" className="pv-t2">Public subnet</text>
        <text x="371" y="70" textAnchor="middle" className="pv-t2">Private app subnet</text>
        <text x="510" y="70" textAnchor="middle" className="pv-t2">Private data subnet</text>

        {wires.map(([d], i) => <path key={i} d={d} className="pv-wire flow" />)}
        <path d="M338 232 L268 262" className="pv-wire flow dim" />
        <path d="M371 244 L371 296" className="pv-wire flow dim" />
        <path d="M510 244 L510 298" className="pv-wire flow dim" />

        <circle cx="34" cy="200" r="18" className="pv-user" />
        <circle cx="34" cy="196" r="5" fill="#fff" /><path d="M25 210 q9 -10 18 0" className="pv-user-s" />
        <Node x={120} y={200} logo="aws-cloudfront" label="CloudFront" />
        <Node x={120} y={300} logo="aws-s3" label="S3" w={80} />
        <path d="M120 232 L120 268" className="pv-wire flow dim" />
        <Node x={245} y={150} logo="aws-elb" label="ALB" w={80} />
        <Node x={245} y={262} logo="aws-vpc" label="NAT Gateway" w={96} />
        <Node x={371} y={112} logo="aws-fargate" label="Fargate task" w={102} />
        <Node x={371} y={200} logo="aws-fargate" label="Fargate task" w={102} />
        <Node x={371} y={300} logo="aws-secrets-manager" label="Secrets" w={100} h={58} />
        <Node x={510} y={112} logo="postgresql" label="RDS PostgreSQL" w={108} />
        <Node x={510} y={200} logo="aws-elasticache" label="Redis cache" w={108} />
        <Node x={510} y={300} logo="aws-cloudwatch" label="Alarms" w={100} h={58} />

        <Pulse path="M52 200 L88 200" dur={1.6} begin={0} />
        <Pulse path="M152 200 L222 150" dur={1.8} begin={0.4} />
        <Pulse path="M268 150 L338 112" dur={1.8} begin={0.9} />
        <Pulse path="M268 150 L338 200" dur={2} begin={1.5} />
        <Pulse path="M404 112 L470 112" dur={1.7} begin={1.2} />
        <Pulse path="M404 200 L470 200" dur={1.7} begin={1.9} />
        <circle cx="510" cy="278" r="5" className="pv-ok" />
      </svg>
    </Frame>
  )
}

/* Disaster recovery: failover loop */
export function DrViz() {
  return (
    <Frame caption="Illustration: automated failover, then RTO and RPO validation">
      <svg viewBox="0 0 600 380" role="img" aria-label="Multi-region failover: Route 53, two regions with ECS Fargate and RDS, and an automated recovery workflow">
        <Node x={300} y={44} logo="aws-route53" label="Route 53" w={104} />
        <path d="M280 74 L150 104" className="pv-wire dr-wire-a" />
        <path d="M320 74 L450 104" className="pv-wire dr-wire-b" />

        <g className="dr-region-a">
          <rect x="20" y="104" width="240" height="176" rx="18" className="pv-zone solid" />
          <text x="38" y="130" className="pv-zone-t">Region A</text>
          <text x="242" y="130" textAnchor="end" className="pv-t2 dr-lbl-a1">Primary</text>
          <text x="242" y="130" textAnchor="end" className="pv-t2 dr-lbl-a2">Failed</text>
        </g>
        <g className="dr-region-b">
          <rect x="340" y="104" width="240" height="176" rx="18" className="pv-zone solid" />
          <text x="358" y="130" className="pv-zone-t">Region B</text>
          <text x="562" y="130" textAnchor="end" className="pv-t2 dr-lbl-b1">Standby</text>
          <text x="562" y="130" textAnchor="end" className="pv-t2 dr-lbl-b2">Active</text>
        </g>

        <Node x={84} y={205} logo="aws-fargate" label="ECS Fargate" w={96} />
        <Node x={200} y={205} logo="aws-rds" label="RDS primary" w={96} />
        <Node x={400} y={205} logo="aws-fargate" label="ECS Fargate" w={96} />
        <Node x={516} y={205} logo="aws-rds" label="RDS replica" w={96} />
        <path d="M248 205 L352 205" className="pv-wire flow" />
        <text x="300" y="196" textAnchor="middle" className="pv-t2">replication</text>
        <text x="516" y="256" textAnchor="middle" className="pv-t2 dr-lbl-b2 promo">promoted</text>

        <Pulse path="M300 74 L150 104" dur={1.4} gate="gate-a" />
        <Pulse path="M300 74 L150 104" dur={1.4} begin={0.7} gate="gate-a" />
        <Pulse path="M248 205 L352 205" dur={1.6} gate="gate-a" />
        <Pulse path="M300 74 L450 104" dur={1.4} gate="gate-b" />
        <Pulse path="M300 74 L450 104" dur={1.4} begin={0.7} gate="gate-b" />

        <g transform="translate(20 300)">
          <rect width="560" height="64" rx="16" className="pv-card strong" />
          <SvgLogo name="aws-lambda" x={16} y={8} size={22} /><SvgLogo name="aws-step-functions" x={16} y={34} size={22} />
          <g className="dr-step s1"><rect x="60" y="16" width="132" height="32" rx="16" className="pv-chip" /><text x="126" y="37" textAnchor="middle" className="pv-t2 dark">Validate health</text></g>
          <g className="dr-step s2"><rect x="204" y="16" width="132" height="32" rx="16" className="pv-chip" /><text x="270" y="37" textAnchor="middle" className="pv-t2 dark">Promote database</text></g>
          <g className="dr-step s3"><rect x="348" y="16" width="112" height="32" rx="16" className="pv-chip" /><text x="404" y="37" textAnchor="middle" className="pv-t2 dark">Reroute traffic</text></g>
          <g className="dr-step s4"><rect x="472" y="16" width="76" height="32" rx="16" className="pv-chip ok" /><text x="510" y="37" textAnchor="middle" className="pv-t2 dark">RTO · RPO</text></g>
        </g>
      </svg>
    </Frame>
  )
}
