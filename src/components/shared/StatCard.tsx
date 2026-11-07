import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  label: string
  value: string
  sub: string
  icon: LucideIcon
  tone: string
}

export function StatCard({ label, value, sub, icon: Icon, tone }: StatCardProps) {
  return (
    <div className="stat-card reveal-on-scroll">
      <div className={`stat-icon ${tone}`}><Icon size={19} /></div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  )
}
