import { useEffect, useState } from 'react'
import { Check, ShieldCheck, TriangleAlert, FileText, Wrench } from 'lucide-react'

const ROWS = [
  { id: 'ec2', cloud: 'AWS', name: 'EC2', sub: 'web tier', base: 42 },
  { id: 'rds', cloud: 'AWS', name: 'RDS', sub: 'primary database', base: 58 },
  { id: 'iam', cloud: 'AWS', name: 'IAM', sub: 'roles and boundaries', badge: 'Least privilege' },
  { id: 'avd', cloud: 'Azure', name: 'AVD', sub: 'Virtual Desktop', base: 47 },
  { id: 'sql', cloud: 'Azure', name: 'Azure SQL', sub: 'database', base: 36 },
  { id: 'vm', cloud: 'Azure', name: 'Azure VMs', sub: 'app tier', base: 51 },
]
const SCENARIOS = [
  { row: 'rds', alert: 'RDS connection count above threshold', triage: 'Idle sessions cleared, pool limits checked', done: 'RDS back within its normal range', book: 'Runbook updated: database connections' },
  { row: 'avd', alert: 'AVD session host not responding', triage: 'Host drained, users moved to healthy hosts', done: 'Session host restored to the pool', book: 'Runbook updated: session host recovery' },
  { row: 'ec2', alert: 'EC2 CPU above threshold on the web tier', triage: 'Load traced and the cause isolated', done: 'EC2 CPU back to baseline', book: 'Runbook updated: CPU saturation' },
  { row: 'sql', alert: 'Azure SQL resource usage spike', triage: 'Heavy query identified and escalated', done: 'Azure SQL back within its normal range', book: 'Runbook updated: SQL performance' },
]
const DUR = [2600, 2200, 2400, 2000, 2200]
const CLOCK = [
  { w: 0, label: 'Standing by', met: false },
  { w: 18, label: 'Response clock running', met: false },
  { w: 42, label: 'Response clock running', met: false },
  { w: 42, label: 'Response target met', met: true },
  { w: 42, label: 'Response target met', met: true },
]
const TONE_ICON = { warn: TriangleAlert, info: Wrench, ok: Check, doc: FileText }
let uid = 1

export default function OpsConsole() {
  const [st, setSt] = useState({
    i: 0, s: 0,
    feed: [
      { id: -1, tone: 'doc', label: 'Runbook', text: 'Runbook updated: storage latency' },
      { id: 0, tone: 'ok', label: 'Status', text: 'All services healthy' },
    ],
  })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => {
      setSt((p) => {
        const ns = (p.s + 1) % 5
        const ni = ns === 0 ? (p.i + 1) % SCENARIOS.length : p.i
        const sc = SCENARIOS[p.i]
        const add = (tone, label, text) => [{ id: uid++, tone, label, text }, ...p.feed].slice(0, 4)
        let feed = p.feed
        if (ns === 1) feed = add('warn', 'Alert', sc.alert)
        if (ns === 2) feed = add('info', 'Triage', sc.triage)
        if (ns === 3) feed = add('ok', 'Resolved', sc.done)
        if (ns === 4) feed = add('doc', 'Runbook', sc.book)
        return { i: ni, s: ns, feed }
      })
    }, DUR[st.s])
    return () => clearTimeout(t)
  }, [st.i, st.s])

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1800)
    return () => clearInterval(t)
  }, [])

  const sc = SCENARIOS[st.i]
  const clock = CLOCK[st.s]
  const alerting = st.s === 1 || st.s === 2

  const renderRow = (r, idx) => {
    const warn = alerting && sc.row === r.id
    const val = warn ? 91 : Math.round((r.base ?? 0) + 6 * Math.sin(tick * 0.9 + idx * 1.7))
    return (
      <li key={r.id} className={`ops-row ${warn ? 'is-warn' : ''}`} data-row={r.id}>
        <span className="ops-row__name"><strong>{r.name}</strong><small>{r.sub}</small></span>
        {r.badge ? (
          <span className="ops-row__badge"><ShieldCheck size={14} aria-hidden="true" />{r.badge}</span>
        ) : (
          <span className="ops-meter" aria-hidden="true"><i style={{ width: `${val}%` }} /></span>
        )}
        <span className="ops-row__state"><b className="dot" />{warn ? 'Alert' : 'Healthy'}</span>
      </li>
    )
  }

  return (
    <div className="ops" role="img" aria-label="Illustration of a live cloud operations view: AWS and Azure services, an alert being detected, triaged and resolved, and the runbook updated afterwards.">
      <header className="ops__head">
        <span className="ops__title">Operations view</span>
        <span className="ops__live"><b className="pulse" />Live demo</span>
      </header>
      <div className="ops__groups">
        <section><h3 className="ops__cloud">AWS</h3><ul>{ROWS.filter((r) => r.cloud === 'AWS').map((r, i) => renderRow(r, i))}</ul></section>
        <section><h3 className="ops__cloud">Azure</h3><ul>{ROWS.filter((r) => r.cloud === 'Azure').map((r, i) => renderRow(r, i + 3))}</ul></section>
      </div>
      <div className="ops__sla">
        <div className="ops__sla-top"><span>SLA</span><span className={clock.met ? 'is-met' : ''}>{clock.label}</span></div>
        <div className="ops__bar"><i className={clock.met ? 'is-met' : ''} style={{ width: `${clock.w}%` }} /><u style={{ left: '70%' }} title="Target" /></div>
      </div>
      <ol className="ops__feed" aria-live="off">
        {st.feed.map((f) => {
          const Icon = TONE_ICON[f.tone]
          return (
            <li key={f.id} className={`feed feed--${f.tone}`}>
              <span className="feed__icon"><Icon size={14} aria-hidden="true" /></span>
              <span className="feed__label">{f.label}</span>
              <span className="feed__text">{f.text}</span>
            </li>
          )
        })}
      </ol>
      <p className="ops__note">Illustration with sample data. Not a client system.</p>
    </div>
  )
}
