import { differenceInCalendarDays } from 'date-fns'

export const money = (amount: number): string => `₹${amount.toLocaleString('en-IN')}`
export const daysLeft = (date: string): number => differenceInCalendarDays(new Date(date), new Date())
