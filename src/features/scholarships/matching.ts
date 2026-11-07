import type { Scholarship, StudentProfile } from './types'

export const profileCompleteness = (profile: StudentProfile): number =>
  Math.round(([profile.name, profile.course, profile.college, profile.year, profile.score, profile.income, profile.state, profile.level]
    .filter(value => String(value).trim()).length / 8) * 100)

/** A transparent, indicative heuristic—not an official eligibility decision. */
export const calculateMatch = (scholarship: Scholarship, profile: StudentProfile): number => {
  const score = Number(profile.score) || 0
  const course = profile.course.toLowerCase()
  const level = profile.level.toLowerCase()
  const eligibility = scholarship.eligibility.join(' ').toLowerCase()
  let points = 50

  if (eligibility.includes('above 80') || eligibility.includes('minimum 80')) points += score >= 80 ? 18 : -12
  else if (eligibility.includes('above 75')) points += score >= 75 ? 14 : -8
  else points += Math.min(15, Math.max(0, score - 60) * 0.45)

  if (eligibility.includes('postgraduate')) points += level === 'postgraduate' ? 15 : -18
  else if (eligibility.includes('undergraduate')) points += level === 'undergraduate' ? 15 : -12
  if (eligibility.includes('technology') || eligibility.includes('stem')) {
    points += /computer|technology|engineering|science|data|it/.test(course) ? 12 : 0
  }
  if (eligibility.includes('financial need') || eligibility.includes('income')) {
    points += profile.income.toLowerCase().includes('below') ? 8 : 0
  }
  if (eligibility.includes('indian') && profile.state.trim()) points += 5
  return Math.max(20, Math.min(99, Math.round(points)))
}

/**
 * Human-readable inputs behind the indicative match heuristic.
 * These are relevance signals, not verified eligibility outcomes.
 */
export const getMatchSignals = (scholarship: Scholarship, profile: StudentProfile): string[] => {
  const eligibility = scholarship.eligibility.join(' ').toLowerCase()
  const signals: string[] = []
  const score = Number(profile.score) || 0
  const level = profile.level.toLowerCase()
  const course = profile.course.toLowerCase()

  if (eligibility.includes('above 80') || eligibility.includes('minimum 80') || eligibility.includes('above 75')) {
    signals.push(`Academic score entered: ${score}%`)
  } else if (score > 0) {
    signals.push(`Academic score contributes to your estimate: ${score}%`)
  }
  if (eligibility.includes('postgraduate') || eligibility.includes('undergraduate')) {
    signals.push(`Study level considered: ${profile.level}`)
  }
  if (eligibility.includes('technology') || eligibility.includes('stem')) {
    signals.push(/computer|technology|engineering|science|data|it/.test(course)
      ? 'Your course keywords align with the listed STEM focus'
      : 'The listed STEM focus was considered against your course')
  }
  if (eligibility.includes('financial need') || eligibility.includes('income')) {
    signals.push('Your income range was considered for the need-based criteria')
  }
  if (eligibility.includes('indian') && profile.state.trim()) {
    signals.push(`Your state was included in the location relevance check`)
  }
  return signals.length ? signals : ['Your profile details were compared with the available scholarship description']
}
