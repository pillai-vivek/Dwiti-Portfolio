export function AwsVisual() {
  const layers = [{ y: 28, label: 'EC2', sub: 'Compute' }, { y: 92, label: 'RDS', sub: 'Database' }, { y: 156, label: 'IAM', sub: 'Access' }]
  return (
    <svg viewBox="0 0 360 230" className="viz" aria-hidden="true">
      {layers.map((l) => (
        <g key={l.label}>
          <rect x="70" y={l.y} width="220" height="46" rx="12" className="viz-box" />
          <text x="92" y={l.y + 27} className="viz-t1">{l.label}</text>
          <text x="270" y={l.y + 27} textAnchor="end" className="viz-t2">{l.sub}</text>
        </g>
      ))}
      <path d="M180 74 V92 M180 138 V156" className="viz-line flow" />
      <circle cx="180" cy="74" r="4.5" className="viz-dot travel-a" />
      <circle cx="180" cy="138" r="4.5" className="viz-dot travel-a delay" />
      <circle cx="300" cy="51" r="5" className="viz-ok" />
      <circle cx="300" cy="115" r="5" className="viz-ok" />
      <circle cx="300" cy="179" r="5" className="viz-ok" />
    </svg>
  )
}
export function AvdVisual() {
  const hosts = [0, 1, 2, 3, 4, 5]
  return (
    <svg viewBox="0 0 360 230" className="viz" aria-hidden="true">
      <rect x="170" y="38" width="160" height="154" rx="16" className="viz-box" />
      <text x="186" y="62" className="viz-t2">Host pool</text>
      {hosts.map((h) => (
        <rect key={h} x={188 + (h % 2) * 70} y={78 + Math.floor(h / 2) * 38} width="58" height="28" rx="8" className={`viz-host ${h === 3 ? 'host-cycle' : ''}`} />
      ))}
      {[60, 115, 170].map((y, i) => (
        <g key={y}>
          <circle cx="50" cy={y} r="14" className="viz-user" />
          <circle cx="50" cy={y - 3} r="4.5" className="viz-user-i" />
          <path d={`M41 ${y + 8} q9 -9 18 0`} className="viz-user-i-s" />
          <path d={`M68 ${y} H168`} className="viz-line flow" style={{ animationDelay: `${i * 0.3}s` }} />
        </g>
      ))}
    </svg>
  )
}
export function IamVisual() {
  return (
    <svg viewBox="0 0 360 230" className="viz" aria-hidden="true">
      <circle cx="210" cy="115" r="86" className="viz-ring" />
      <text x="210" y="24" textAnchor="middle" className="viz-t2">Permission boundary</text>
      <circle cx="210" cy="115" r="38" className="viz-box" />
      <text x="210" y="120" textAnchor="middle" className="viz-t1 sm">Role</text>
      <path d="M30 95 H172" className="viz-line flow" />
      <path d="M30 150 H124" className="viz-line flow dim" />
      <circle cx="30" cy="95" r="4.5" className="viz-dot go-allowed" />
      <circle cx="30" cy="150" r="4.5" className="viz-deny go-denied" />
      <g className="deny-x"><path d="M128 142 l14 14 M142 142 l-14 14" /></g>
      <text x="30" y="82" className="viz-t2">Needed</text>
      <text x="30" y="178" className="viz-t2">Not needed</text>
    </svg>
  )
}
export function MonitorVisual() {
  return (
    <svg viewBox="0 0 360 230" className="viz" aria-hidden="true">
      <line x1="30" y1="150" x2="330" y2="150" className="viz-grid" />
      <line x1="30" y1="100" x2="330" y2="100" className="viz-grid" />
      <line x1="30" y1="50" x2="330" y2="50" className="viz-grid" />
      <path pathLength="1" className="viz-trace trace" d="M30 130 L70 130 L90 120 L110 135 L140 128 L165 128 L180 52 L196 150 L214 124 L250 128 L290 126 L330 128" />
      <circle cx="180" cy="52" r="6" className="viz-warn blink" />
      <g transform="translate(206 176)">
        <rect width="124" height="30" rx="15" className="viz-pill" />
        <circle cx="16" cy="15" r="4.5" className="viz-ok" />
        <text x="30" y="19.5" className="viz-t1 xs">Within SLA</text>
      </g>
    </svg>
  )
}
export function RunbookVisual() {
  const steps = ['Detect the alert', 'Check dependencies', 'Apply the fix', 'Record what changed']
  return (
    <svg viewBox="0 0 360 230" className="viz" aria-hidden="true">
      <rect x="60" y="22" width="240" height="186" rx="16" className="viz-box" />
      <text x="82" y="50" className="viz-t1 sm">Runbook</text>
      {steps.map((s, i) => (
        <g key={s} transform={`translate(82 ${72 + i * 32})`}>
          <circle cx="9" cy="9" r="9" className="viz-check-ring" />
          <path d="M5 9.5 l3 3 l6 -6.5" className="viz-check tick" style={{ animationDelay: `${i * 0.9}s` }} />
          <text x="28" y="14" className="viz-t2 line">{s}</text>
        </g>
      ))}
    </svg>
  )
}
