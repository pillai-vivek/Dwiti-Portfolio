import { Activity, Container, DatabaseBackup, FileText, Gauge, Network, Siren } from 'lucide-react'
import { Logo } from './Brand.jsx'
import { Reveal, Spotlight } from './ui.jsx'

const GROUPS = [
  {
    id: 'cloud', title: 'Cloud and infrastructure', blurb: 'Provisioning and running enterprise workloads on AWS and Azure.', wide: true,
    tiles: [
      { logo: 'aws-ec2', label: 'EC2', sub: 'Compute' }, { logo: 'aws-s3', label: 'S3', sub: 'Storage' },
      { logo: 'aws-vpc', label: 'VPC', sub: 'Networking' }, { logo: 'aws-iam', label: 'IAM', sub: 'Access control' },
      { logo: 'aws-rds', label: 'RDS', sub: 'Databases' }, { logo: 'aws-fargate', label: 'ECS Fargate', sub: 'Containers' },
      { icon: Container, label: 'ECR', sub: 'Image registry' }, { logo: 'microsoft-azure', label: 'Azure', sub: 'Cloud platform' },
      { logo: 'microsoft-azure', label: 'Virtual Desktop', sub: 'Azure AVD' }, { logo: 'terraform-icon', label: 'Terraform', sub: 'Infrastructure as code' },
      { logo: 'linux-tux', label: 'Linux', sub: 'Systems' },
    ],
  },
  {
    id: 'ops', title: 'Operations', blurb: 'Keeping systems healthy and inside their SLAs.',
    tiles: [
      { logo: 'aws-cloudwatch', label: 'CloudWatch', sub: 'Metrics and alarms' }, { icon: Activity, label: 'Monitoring', sub: 'Workload health' },
      { icon: Siren, label: 'Incident response', sub: 'Detect and resolve' }, { icon: Gauge, label: 'SLA', sub: 'Compliance' },
      { icon: Network, label: 'Networking', sub: 'Connectivity' }, { icon: DatabaseBackup, label: 'Disaster recovery', sub: 'RTO and RPO' },
    ],
  },
  {
    id: 'auto', title: 'Automation', blurb: 'Repeatable workflows instead of manual steps.',
    tiles: [
      { logo: 'aws-lambda', label: 'Lambda', sub: 'Serverless' }, { logo: 'aws-step-functions', label: 'Step Functions', sub: 'Workflows' },
      { logo: 'aws-systems-manager', label: 'Systems Manager', sub: 'Operations' }, { icon: FileText, label: 'Runbooks', sub: 'Documented ops' },
    ],
  },
]

const ALSO = [
  ['aws-route53', 'Route 53'], ['aws-elb', 'Load Balancer'], ['aws-cloudfront', 'CloudFront'], ['aws-elasticache', 'ElastiCache'],
  ['aws-secrets-manager', 'Secrets Manager'], ['postgresql', 'PostgreSQL'], ['redis', 'Redis'], ['nodejs-icon', 'Node.js'], ['react', 'React'],
]

function Tile({ t, i }) {
  return (
    <li className="tile" style={{ '--i': i }}>
      <span className={`tile__plate ${t.logo ? '' : 'tile__plate--icon'}`}>
        {t.logo ? <Logo name={t.logo} size={38} /> : <t.icon size={26} strokeWidth={1.7} aria-hidden="true" />}
      </span>
      <b>{t.label}</b>
      <small>{t.sub}</small>
    </li>
  )
}

export default function Toolkit() {
  return (
    <section className="section section--mist" id="toolkit" aria-labelledby="kit-h">
      <div className="wrap">
        <Reveal className="section__head">
          <h2 id="kit-h">Tech toolkit</h2>
          <p>The platforms and practices I work with every day, grouped by what they do.</p>
        </Reveal>
        <div className="kit">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.id} delay={gi * 80} className={`kit__cell ${g.wide ? 'kit__cell--wide' : ''}`}>
              <Spotlight tone="light" className="kit__card">
                <header className="kit__head"><h3>{g.title}</h3><p>{g.blurb}</p></header>
                <ul className={`kit__tiles kit__tiles--${g.id}`}>{g.tiles.map((t, i) => <Tile key={t.label + i} t={t} i={i} />)}</ul>
              </Spotlight>
            </Reveal>
          ))}
        </div>
        <Reveal className="also" delay={160}>
          <p>Also used across my projects</p>
          <div className="marquee marquee--logos" aria-label="Additional technologies">
            <div className="marquee__track marquee__track--logos">
              {[...ALSO, ...ALSO, ...ALSO].map(([l, n], i) => (
                <span key={i} className="logo-pill" aria-hidden={i >= ALSO.length ? 'true' : undefined}><Logo name={l} size={22} />{n}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
