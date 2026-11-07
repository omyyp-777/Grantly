import { motion } from 'framer-motion'
import { ArrowUpRight, Clock3, Heart, Wallet } from 'lucide-react'
import type { Scholarship } from '../types'
import { daysLeft, money } from '../../../utils/format'

type ScholarshipCardProps = {
  scholarship: Scholarship
  saved: boolean
  onToggleSave: (id: number) => void
  onSelect: (scholarship: Scholarship) => void
}

export function ScholarshipCard({ scholarship, saved, onToggleSave, onSelect }: ScholarshipCardProps) {
  const s = scholarship
  return (
    <motion.article layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="scholar-card reveal-on-scroll">
      <div className="scholar-top">
        <div className={`provider-logo ${s.color}`}>{s.provider.split(' ').map(word => word[0]).slice(0, 2).join('')}</div>
        <button className={`save-button ${saved ? 'is-saved' : ''}`} onClick={() => onToggleSave(s.id)} aria-label={`${saved ? 'Remove' : 'Save'} ${s.name} ${saved ? 'from' : 'to'} shortlist`}>
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="scholar-provider">{s.provider}</div>
      <h3>{s.name}</h3>
      <p className="scholar-desc">{s.description}</p>
      <div className="scholar-meta">
        <span><Wallet size={14} />{money(s.amount)}</span>
        <span><Clock3 size={14} />{Math.max(0, daysLeft(s.deadline))} days left</span>
      </div>
      <div className="match-row"><div><span className="match-score">{s.match}%</span> match</div><span className={`tag ${s.color}`}>{s.tag}</span></div>
      <div className="progress-track" role="progressbar" aria-label={`${s.name} indicative match`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={s.match}><span style={{ width: `${s.match}%` }} /></div>
      <button className="card-link" onClick={() => onSelect(s)}>View opportunity <ArrowUpRight size={16} /></button>
    </motion.article>
  )
}
