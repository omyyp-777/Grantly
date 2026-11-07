import type { Scholarship } from './types'
import type { Application } from '../applications/types'

// Illustrative sample records. Verify every opportunity with its official provider.
export const initialScholarships: Scholarship[] = [
  {id:1,name:'National Merit Scholarship',provider:'National Scholarship Portal',amount:50000,deadline:'2026-11-22',category:'Merit-based',level:'Undergraduate',match:98,tag:'Top match',color:'violet',description:'Support for high-performing students pursuing undergraduate education in India.',eligibility:['Indian citizen','Minimum 80% in previous examination','Enrolled in an undergraduate programme']},
  {id:2,name:'Bright Futures Women in STEM',provider:'Future Forward Foundation',amount:75000,deadline:'2026-12-05',category:'Women in STEM',level:'Undergraduate',match:94,tag:'Closing soon',color:'mint',description:'Encouraging women to build the next generation of science and technology.',eligibility:['Women applicants','STEM programme','Academic score above 75%']},
  {id:3,name:'Digital India Scholars Grant',provider:'Digital India Initiative',amount:40000,deadline:'2026-12-18',category:'Technology',level:'Undergraduate',match:89,tag:'Popular',color:'blue',description:'A sample opportunity supporting digital skills and technology education.',eligibility:['Indian resident','Technology-related course','Demonstrated financial need']},
  {id:4,name:'Future Leaders Fellowship',provider:'Aspire Education Trust',amount:100000,deadline:'2027-01-10',category:'Leadership',level:'Postgraduate',match:86,tag:'High value',color:'peach',description:'A sample fellowship for students with a record of community leadership.',eligibility:['Postgraduate student','Leadership or volunteering experience','Personal statement']},
  {id:5,name:'First Generation Learner Award',provider:'Open Doors Collective',amount:30000,deadline:'2027-01-25',category:'Need-based',level:'Undergraduate',match:83,tag:'Need-based',color:'rose',description:'Designed to help first-generation learners continue their education.',eligibility:['First-generation learner','Enrolled in recognised institution','Income criteria apply']},
  {id:6,name:'Research Pathways Scholarship',provider:'NextGen Research Council',amount:90000,deadline:'2027-02-12',category:'Research',level:'Postgraduate',match:79,tag:'Research',color:'gold',description:'A sample award for students exploring research-led postgraduate study.',eligibility:['Postgraduate applicant','Research proposal','Academic references']}
]

export const initialApplications: Application[] = [
  {id:1,scholarship:'National Merit Scholarship',provider:'National Scholarship Portal',amount:50000,status:'Preparing',deadline:'2026-11-22'},
  {id:2,scholarship:'Digital India Scholars Grant',provider:'Digital India Initiative',amount:40000,status:'Applied',deadline:'2026-12-18'},
  {id:3,scholarship:'First Generation Learner Award',provider:'Open Doors Collective',amount:30000,status:'Saved',deadline:'2027-01-25'}
]
