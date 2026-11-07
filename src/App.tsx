import { useEffect, useMemo, useRef, useState } from 'react'
import Lenis from 'lenis'
import { motion, AnimatePresence } from 'framer-motion'
import Fuse from 'fuse.js'
import {
  LayoutDashboard, Compass, Bookmark, ClipboardList, FolderOpen, UserRound, ChartNoAxesCombined,
  Search, Bell, ChevronDown, ArrowUpRight, ArrowRight, Sparkles, Clock3, Wallet, Target,
  CheckCircle2, Circle, Plus, SlidersHorizontal, MapPin, GraduationCap, CalendarDays,
  FileText, MoreHorizontal, Download, UploadCloud, X, Menu, ShieldCheck, Zap, TrendingUp,
  Heart, ExternalLink, Check, Filter, SearchX, BookOpen, CircleHelp, Award, type LucideIcon
} from 'lucide-react'
import { format, differenceInCalendarDays } from 'date-fns'
import { toast } from 'sonner'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tilt from 'react-parallax-tilt'
import confetti from 'canvas-confetti'

type Scholarship = { id:number; name:string; provider:string; amount:number; deadline:string; category:string; level:string; match:number; tag:string; color:string; description:string; eligibility:string[] }
type Application = { id:number; scholarship:string; provider:string; amount:number; status:string; deadline:string }
const initialScholarships: Scholarship[] = [
  {id:1,name:'National Merit Scholarship',provider:'National Scholarship Portal',amount:50000,deadline:'2026-11-22',category:'Merit-based',level:'Undergraduate',match:98,tag:'Top match',color:'violet',description:'Support for high-performing students pursuing undergraduate education in India.',eligibility:['Indian citizen','Minimum 80% in previous examination','Enrolled in an undergraduate programme']},
  {id:2,name:'Bright Futures Women in STEM',provider:'Future Forward Foundation',amount:75000,deadline:'2026-12-05',category:'Women in STEM',level:'Undergraduate',match:94,tag:'Closing soon',color:'mint',description:'Encouraging women to build the next generation of science and technology.',eligibility:['Women applicants','STEM programme','Academic score above 75%']},
  {id:3,name:'Digital India Scholars Grant',provider:'Digital India Initiative',amount:40000,deadline:'2026-12-18',category:'Technology',level:'Undergraduate',match:89,tag:'Popular',color:'blue',description:'A sample opportunity supporting digital skills and technology education.',eligibility:['Indian resident','Technology-related course','Demonstrated financial need']},
  {id:4,name:'Future Leaders Fellowship',provider:'Aspire Education Trust',amount:100000,deadline:'2027-01-10',category:'Leadership',level:'Postgraduate',match:86,tag:'High value',color:'peach',description:'A sample fellowship for students with a record of community leadership.',eligibility:['Postgraduate student','Leadership or volunteering experience','Personal statement']},
  {id:5,name:'First Generation Learner Award',provider:'Open Doors Collective',amount:30000,deadline:'2027-01-25',category:'Need-based',level:'Undergraduate',match:83,tag:'Need-based',color:'rose',description:'Designed to help first-generation learners continue their education.',eligibility:['First-generation learner','Enrolled in recognised institution','Income criteria apply']},
  {id:6,name:'Research Pathways Scholarship',provider:'NextGen Research Council',amount:90000,deadline:'2027-02-12',category:'Research',level:'Postgraduate',match:79,tag:'Research',color:'gold',description:'A sample award for students exploring research-led postgraduate study.',eligibility:['Postgraduate applicant','Research proposal','Academic references']}
]
const initialApps: Application[] = [
  {id:1,scholarship:'National Merit Scholarship',provider:'National Scholarship Portal',amount:50000,status:'Preparing',deadline:'2026-11-22'},
  {id:2,scholarship:'Digital India Scholars Grant',provider:'Digital India Initiative',amount:40000,status:'Applied',deadline:'2026-12-18'},
  {id:3,scholarship:'First Generation Learner Award',provider:'Open Doors Collective',amount:30000,status:'Saved',deadline:'2027-01-25'}
]
const money = (n:number) => '₹' + n.toLocaleString('en-IN')
const daysLeft = (d:string) => differenceInCalendarDays(new Date(d), new Date())
const read = <T,>(key:string, fallback:T):T => { try { const v=localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback } }

export default function App() {
  const [page,setPage] = useState('Overview')
  const [mobileOpen,setMobileOpen] = useState(false)
  const [scholarships,setScholarships] = useState<Scholarship[]>(()=>read('grantly-scholarships',initialScholarships))
  const [apps,setApps] = useState<Application[]>(()=>read('grantly-applications',initialApps))
  const [saved,setSaved] = useState<number[]>(()=>read('grantly-saved',[1,2]))
  const [query,setQuery] = useState('')
  const [category,setCategory] = useState('All')
  const [selected,setSelected] = useState<Scholarship|null>(null)
  const [profile,setProfile] = useState(()=>read('grantly-profile',{name:'Aarav Sharma',course:'B.Tech Computer Science',college:'Pune Institute of Technology',year:'2nd year',score:'86',income:'Below ₹3 lakh',state:'Maharashtra'}))
  const [filterOpen,setFilterOpen] = useState(false)
  const [uploaded,setUploaded] = useState<string[]>(()=>read('grantly-docs',['Aadhaar card','Academic transcripts']))
  const [newDoc,setNewDoc] = useState('')
  const [statusFilter,setStatusFilter] = useState('All')
  const [showAll,setShowAll] = useState(false)
  const [commandOpen,setCommandOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  // Lenis provides consistent, interruptible wheel and trackpad scrolling.
  // Respect reduced-motion preferences and stop background scrolling behind dialogs.
  useEffect(()=>{
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const lenis = new Lenis({ autoRaf: true, smoothWheel: true, lerp: 0.1, wheelMultiplier: 0.9 })
    lenisRef.current = lenis
    return () => { lenis.destroy(); lenisRef.current = null }
  },[])

  // GSAP ScrollTrigger adds restrained, one-time reveals as sections enter view.
  useEffect(()=>{
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !contentRef.current) return
    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>('.reveal-on-scroll').forEach((element)=>{
        gsap.fromTo(element, { autoAlpha: 0, y: 22 }, {
          autoAlpha: 1, y: 0, duration: 0.62, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true }
        })
      })
    }, contentRef)
    return ()=>context.revert()
  },[page, query, category, apps.length, saved.length])

  useEffect(()=>{
    if (selected || commandOpen) lenisRef.current?.stop()
    else lenisRef.current?.start()
  },[selected,commandOpen])

  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setCommandOpen(v=>!v)} if(e.key==='Escape'){setCommandOpen(false);setSelected(null)} }
    window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey)
  },[])

  const persist = (key:string,value:unknown) => {
    try { localStorage.setItem(key,JSON.stringify(value)) }
    catch { toast.error('Could not save this change', { description: 'Browser storage may be unavailable or full.' }) }
  }
  const navigate = (p:string) => {
    setPage(p); setMobileOpen(false); setSelected(null)
    lenisRef.current?.scrollTo(0, { duration: 0.65, force: true })
  }
  const toggleSave = (id:number) => { const removing=saved.includes(id); const next = removing ? saved.filter(x=>x!==id) : [...saved,id]; setSaved(next); persist('grantly-saved',next); toast(removing?'Removed from your shortlist':'Saved to your shortlist',{description:removing?'You can add it again anytime.':'Your opportunity is safely on your list.'}) }
  const addApplication = (s:Scholarship) => {
    if (!apps.some(a=>a.id===s.id)) { const next=[...apps,{id:s.id,scholarship:s.name,provider:s.provider,amount:s.amount,status:'Saved',deadline:s.deadline}]; setApps(next); persist('grantly-applications',next) }
    if (!saved.includes(s.id)) toggleSave(s.id)
    toast.success('Added to your application tracker',{description:s.name})
  }
  const updateStatus = (id:number,status:string) => { const next=apps.map(a=>a.id===id?{...a,status}:a); setApps(next); persist('grantly-applications',next); if(status==='Approved'){confetti({particleCount:85,spread:62,origin:{y:0.72},colors:['#705ce3','#8bd9b5','#f2c879','#ffffff']});toast.success('A scholarship milestone! 🎉',{description:'Your application is marked as approved.'})}else toast.success('Application stage updated',{description:`Moved to ${status}.`}) }
  const fuse = useMemo(()=>new Fuse(scholarships,{keys:['name','provider','category','description'],threshold:.35}),[scholarships])
  const filtered = useMemo(()=> (query ? fuse.search(query).map(x=>x.item) : scholarships).filter(s=>category==='All'||s.category===category),[query,category,scholarships,fuse])
  const total = apps.filter(a=>a.status==='Applied'||a.status==='Approved').reduce((s,a)=>s+a.amount,0)
  const upcoming = [...scholarships].sort((a,b)=>daysLeft(a.deadline)-daysLeft(b.deadline)).slice(0,3)
  const navGroups = [
    {label:'WORKSPACE',items:[['Overview',LayoutDashboard],['Discover',Compass],['Saved scholarships',Bookmark],['My applications',ClipboardList]]},
    {label:'YOUR SPACE',items:[['Document vault',FolderOpen],['Scholarship passport',UserRound],['Insights',ChartNoAxesCombined]]}
  ] as const

  const Sidebar = () => <aside className={`sidebar ${mobileOpen?'open':''}`}>
    <div className="brand"><div className="brand-mark"><GraduationCap size={21}/></div><span>grant<span className="brand-accent">ly</span><sup>✳</sup></span></div>
    <button type="button" className="workspace-switch" onClick={()=>navigate('Scholarship passport')} aria-label="Open your student profile"><div className="avatar">AS</div><div><b>Student workspace</b><small>Personal account</small></div><ChevronDown size={15}/></button>
    {navGroups.map(g=><div className="nav-group" key={g.label}><p>{g.label}</p>{g.items.map(([label,Icon])=><button key={label} className={`nav-item ${page===label?'active':''}`} onClick={()=>navigate(label)}><Icon size={18}/><span>{label}</span>{label==='Discover'&&<span className="nav-count">6</span>}</button>)}</div>)}
    <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Sparkles size={17}/></div><b>Need a little help?</b><p>Get tips to make your scholarship journey smoother.</p><button onClick={()=>navigate('Scholarship passport')}>Explore your passport <ArrowRight size={13}/></button></div><button type="button" className="profile-mini" onClick={()=>navigate('Scholarship passport')} aria-label={`Open profile for ${profile.name}`}><div className="avatar">{profile.name.split(' ').map(part=>part[0]).slice(0,2).join('').toUpperCase()}</div><div><b>{profile.name}</b><small>Student account · View profile</small></div><MoreHorizontal size={18}/></button></div>
  </aside>

  const Header = () => <header className="topbar"><button className="mobile-menu icon-button" onClick={()=>setMobileOpen(!mobileOpen)}><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <b>{page}</b></div><div className="top-actions"><div className="search-global" onClick={()=>setCommandOpen(true)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setCommandOpen(true)}}}><Search size={16}/><input aria-label="Search scholarships" placeholder="Search anything..." value={query} onClick={e=>e.stopPropagation()} onChange={e=>{setQuery(e.target.value);setPage('Discover')}}/><kbd>⌘ K</kbd></div><button className="icon-button notification" aria-label="Notifications" onClick={()=>navigate('My applications')}><Bell size={18}/><i/></button><button type="button" className="top-avatar" onClick={()=>navigate('Scholarship passport')} aria-label="Open your profile">{profile.name.split(' ').map(part=>part[0]).slice(0,2).join('').toUpperCase()}</button></div></header>

  const Stat = ({label,value,sub,icon:Icon,tone}:{label:string,value:string,sub:string,icon:LucideIcon,tone:string}) => <div className="stat-card reveal-on-scroll"><div className={`stat-icon ${tone}`}><Icon size={19}/></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-sub">{sub}</div></div>

  const ScholarshipCard = ({s}:{s:Scholarship}) => <Tilt className="tilt-shell reveal-on-scroll" tiltMaxAngleX={4} tiltMaxAngleY={5} perspective={950} scale={1.015} transitionSpeed={1400} glareEnable={false} trackOnWindow={false}><motion.article layout initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="scholar-card">
    <div className="scholar-top"><div className={`provider-logo ${s.color}`}>{s.provider.split(' ').map(w=>w[0]).slice(0,2).join('')}</div><button className={`save-button ${saved.includes(s.id)?'is-saved':''}`} onClick={()=>toggleSave(s.id)} aria-label="Save scholarship"><Heart size={17} fill={saved.includes(s.id)?'currentColor':'none'}/></button></div>
    <div className="scholar-provider">{s.provider}</div><h3>{s.name}</h3><p className="scholar-desc">{s.description}</p>
    <div className="scholar-meta"><span><Wallet size={14}/>{money(s.amount)}</span><span><Clock3 size={14}/>{Math.max(0,daysLeft(s.deadline))} days left</span></div>
    <div className="match-row"><div><span className="match-score">{s.match}%</span> match</div><span className={`tag ${s.color}`}>{s.tag}</span></div><div className="progress-track"><span style={{width:`${s.match}%`}}/></div>
    <button className="card-link" onClick={()=>setSelected(s)}>View opportunity <ArrowUpRight size={16}/></button>
  </motion.article></Tilt>

  const Overview = () => <><div className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot"/> YOUR SCHOLARSHIP COMMAND CENTER</div><h1>Good afternoon, {profile.name.split(' ')[0]} <span className="wave">✦</span></h1><p className="muted">Your next opportunity could be closer than you think. Let's make it count.</p></div><button className="primary-btn" onClick={()=>navigate('Discover')}><Sparkles size={16}/> Find my scholarships <ArrowRight size={16}/></button></div>
    <div className="hero-panel reveal-on-scroll"><div className="hero-copy"><div className="hero-pill"><Sparkles size={13}/> YOUR OPPORTUNITY RADAR</div><h2>Make your ambition<br/> <em>go further.</em></h2><p>We've found opportunities that align with your academic journey. Your next step starts here.</p><button className="hero-btn" onClick={()=>navigate('Discover')}>Explore your matches <ArrowRight size={15}/></button></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-spark s1">✳</div><div className="hero-spark s2">✦</div><div className="hero-coin"><GraduationCap size={50}/></div><div className="floating-note note-top"><span className="note-check"><Check size={12}/></span><div><b>98% match found</b><small>National Merit Scholarship</small></div></div><div className="floating-note note-bottom"><div className="mini-bars"><i/><i/><i/><i/><i/></div><div><b>₹2.8L</b><small>Potential funding</small></div></div></div><div className="hero-decoration">G.</div></div>
    <div className="stats-grid"><Stat label="Matched opportunities" value="12" sub="+4 new this week" icon={Target} tone="purple"/><Stat label="Saved scholarships" value={String(saved.length).padStart(2,'0')} sub="Keep your shortlist close" icon={Bookmark} tone="blue"/><Stat label="Applications in progress" value={String(apps.length).padStart(2,'0')} sub="You're making progress" icon={ClipboardList} tone="orange"/><Stat label="Funding in motion" value={money(total)} sub="Applied & approved value" icon={Wallet} tone="green"/></div>
    <div className="section-heading"><div><div className="eyebrow">CURATED FOR YOU</div><h2>Opportunities worth a look</h2><p className="muted">A few promising matches based on your Scholarship Passport.</p></div><button className="text-btn" onClick={()=>navigate('Discover')}>View all opportunities <ArrowRight size={15}/></button></div>
    <div className="scholar-grid">{scholarships.slice(0,3).map(s=><ScholarshipCard key={s.id} s={s}/>)}</div>
    <div className="bottom-grid"><div className="panel deadline-panel reveal-on-scroll"><div className="panel-head"><div><h3>Coming up next</h3><p>Stay ahead of important dates.</p></div><CalendarDays size={19}/></div>{upcoming.map(s=><div className="deadline-item" key={s.id}><div className="date-tile"><b>{format(new Date(s.deadline),'dd')}</b><small>{format(new Date(s.deadline),'MMM')}</small></div><div className="deadline-info"><b>{s.name}</b><small>{s.provider}</small></div><span className="days-chip">{daysLeft(s.deadline)} days</span></div>)}</div><div className="panel progress-panel reveal-on-scroll"><div className="panel-head"><div><h3>Your application journey</h3><p>Small steps add up to big outcomes.</p></div><ArrowUpRight size={18}/></div><div className="journey-line"><div className="journey-step done"><span><Check size={14}/></span><div><b>Discover opportunities</b><small>Find scholarships that fit</small></div></div><div className="journey-step done"><span><Check size={14}/></span><div><b>Build your shortlist</b><small>{saved.length} opportunities saved</small></div></div><div className="journey-step current"><span>3</span><div><b>Prepare applications</b><small>Gather documents and apply</small></div></div><div className="journey-step"><span>4</span><div><b>Track your progress</b><small>Stay on top of every update</small></div></div></div></div></div>
  </>

  const Discover = () => <><div className="page-intro"><div className="eyebrow">OPPORTUNITY RADAR</div><h1>Find your next <em>yes.</em></h1><p className="muted">Explore scholarships that move you closer to where you want to be.</p></div><div className="discover-toolbar"><div className="discover-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by scholarship, provider or keyword..."/><kbd>⌘ K</kbd></div><button className={`outline-btn ${filterOpen?'selected':''}`} onClick={()=>setFilterOpen(!filterOpen)}><SlidersHorizontal size={16}/> Filters</button></div>{filterOpen&&<div className="filter-panel"><b>Opportunity type</b><div className="filter-chips">{['All','Merit-based','Women in STEM','Technology','Leadership','Need-based','Research'].map(c=><button key={c} className={category===c?'chosen':''} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>}<div className="results-line"><span><b>{filtered.length} opportunities</b> curated for your profile</span><span className="sort-label"><Sparkles size={14}/> Sorted by best match</span></div>{filtered.length?<div className="scholar-grid">{filtered.map(s=><ScholarshipCard key={s.id} s={s}/>)}</div>:<div className="empty-state"><SearchX size={32}/><h3>No matches just yet</h3><p>Try another search term or clear your filters.</p><button className="outline-btn" onClick={()=>{setQuery('');setCategory('All')}}>Clear filters</button></div>}</>

  const Applications = () => <><div className="page-intro"><div className="eyebrow">YOUR APPLICATION JOURNEY</div><h1>Every step, <em>in view.</em></h1><p className="muted">A calmer way to keep all your scholarship applications moving.</p></div><div className="stats-grid compact-stats"><Stat label="Total tracked" value={String(apps.length).padStart(2,'0')} sub="Across all stages" icon={ClipboardList} tone="purple"/><Stat label="Preparing" value={String(apps.filter(a=>a.status==='Preparing').length).padStart(2,'0')} sub="Getting application-ready" icon={FileText} tone="orange"/><Stat label="Submitted" value={String(apps.filter(a=>a.status==='Applied').length).padStart(2,'0')} sub="Awaiting a decision" icon={CheckCircle2} tone="blue"/><Stat label="Potential value" value={money(apps.reduce((n,a)=>n+a.amount,0))} sub="Total tracked funding" icon={Wallet} tone="green"/></div><div className="panel table-panel"><div className="panel-head"><div><h3>Application tracker</h3><p>Update each opportunity as you make progress.</p></div><select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option>All</option><option>Saved</option><option>Preparing</option><option>Applied</option><option>Approved</option><option>Rejected</option></select></div><div className="table-wrap"><table><thead><tr><th>OPPORTUNITY</th><th>AWARD</th><th>DEADLINE</th><th>STATUS</th><th>UPDATE STAGE</th></tr></thead><tbody>{apps.filter(a=>statusFilter==='All'||a.status===statusFilter).map(a=><tr key={a.id}><td><b>{a.scholarship}</b><small>{a.provider}</small></td><td>{money(a.amount)}</td><td>{format(new Date(a.deadline),'dd MMM yyyy')}</td><td><span className={`status ${a.status.toLowerCase()}`}>{a.status}</span></td><td><select value={a.status} onChange={e=>updateStatus(a.id,e.target.value)}><option>Saved</option><option>Preparing</option><option>Applied</option><option>Approved</option><option>Rejected</option></select></td></tr>)}</tbody></table></div>{apps.length===0&&<div className="empty-state"><ClipboardList/><h3>Your tracker is ready</h3><p>Save a scholarship to start your application journey.</p><button className="primary-btn" onClick={()=>navigate('Discover')}>Discover scholarships</button></div>}</div></>

  const Saved = () => <><div className="page-intro"><div className="eyebrow">YOUR SHORTLIST</div><h1>Keep the good ones <em>close.</em></h1><p className="muted">Your saved opportunities, all in one place.</p></div>{scholarships.filter(s=>saved.includes(s.id)).length?<div className="scholar-grid">{scholarships.filter(s=>saved.includes(s.id)).map(s=><ScholarshipCard key={s.id} s={s}/>)}</div>:<div className="empty-state"><Bookmark size={32}/><h3>No saved scholarships yet</h3><p>Save opportunities from Discover to build your shortlist.</p><button className="primary-btn" onClick={()=>navigate('Discover')}>Explore scholarships</button></div>}</>

  const Passport = () => <><div className="page-intro"><div className="eyebrow">YOUR STUDENT PROFILE</div><h1>Your story. Your <em>passport.</em></h1><p className="muted">A single profile that helps you understand which opportunities may fit.</p></div><div className="passport-layout"><div className="panel passport-card reveal-on-scroll"><div className="passport-top"><div className="passport-avatar">{profile.name.split(' ').map(part=>part[0]).slice(0,2).join('').toUpperCase()}</div><div><span className="verified"><ShieldCheck size={13}/> PROFILE CREATED</span><h2>{profile.name}</h2><p>{profile.course}</p></div></div><div className="passport-progress"><div><b>Profile completeness</b><strong>85%</strong></div><div className="progress-track"><span style={{width:'85%'}}/></div><small>Complete your profile to improve match relevance.</small></div><div className="passport-fields">{[['College / University',profile.college],['Current year',profile.year],['Academic score',profile.score+'%'],['Annual family income',profile.income],['State',profile.state]].map(([k,v])=><div key={k}><small>{k}</small><b>{v}</b></div>)}</div><button className="outline-btn full-btn" onClick={()=>{const n=prompt('Your full name',profile.name)?.trim().slice(0,80);if(n){const p={...profile,name:n};setProfile(p);persist('grantly-profile',p)}}}>Edit profile <ArrowUpRight size={15}/></button></div><div className="panel match-insight reveal-on-scroll"><div className="insight-icon"><Sparkles size={20}/></div><div className="eyebrow">MATCHING INSIGHT</div><h3>Your profile is opening doors.</h3><p>Your academic score and current course align with several sample opportunities in our catalogue.</p><div className="insight-metric"><b>12</b><span>potential matches identified</span></div><button className="text-btn" onClick={()=>navigate('Discover')}>See matched opportunities <ArrowRight size={15}/></button></div></div></>

  const Documents = () => <><div className="page-intro"><div className="eyebrow">APPLICATION READINESS</div><h1>One less thing to <em>chase.</em></h1><p className="muted">Keep your document checklist organised before deadlines arrive.</p></div><div className="docs-layout"><div className="panel docs-main reveal-on-scroll"><div className="panel-head"><div><h3>Document checklist</h3><p>Track the essentials you may need for applications.</p></div><span className="doc-count">{uploaded.length} added</span></div>{['Aadhaar card','Academic transcripts','Income certificate','Bonafide certificate','Bank passbook','Passport-size photograph','Personal statement'].map((d,i)=><div className="doc-row" key={d}><div className={`doc-file ${uploaded.includes(d)?'ready':''}`}><FileText size={18}/></div><div className="doc-name"><b>{d}</b><small>{uploaded.includes(d)?'Marked as ready':'Not added yet'}</small></div>{uploaded.includes(d)?<span className="ready-label"><CheckCircle2 size={15}/> Ready</span>:<button className="small-add" onClick={()=>{const n=[...uploaded,d];setUploaded(n);persist('grantly-docs',n);toast.success('Checklist updated',{description:d+' marked as ready.'})}}><Plus size={14}/> Mark ready</button>}</div>)}</div><div className="panel doc-tip reveal-on-scroll"><div className="tip-illustration"><FolderOpen size={34}/><Sparkles size={16}/></div><h3>Be deadline-ready.</h3><p>Requirements vary by scholarship. Always check the official opportunity page before submitting personal documents.</p><div className="privacy-note"><ShieldCheck size={16}/> Your checklist is stored in this browser only.</div></div></div></>

  const Insights = () => <><div className="page-intro"><div className="eyebrow">YOUR FUNDING PICTURE</div><h1>See the bigger <em>picture.</em></h1><p className="muted">A snapshot of the opportunities you're exploring.</p></div><div className="stats-grid"><Stat label="Tracked opportunities" value={String(apps.length)} sub="In your application tracker" icon={Target} tone="purple"/><Stat label="Potential funding" value={money(apps.reduce((n,a)=>n+a.amount,0))} sub="Across tracked opportunities" icon={Wallet} tone="green"/><Stat label="Saved for later" value={String(saved.length)} sub="Your personal shortlist" icon={Bookmark} tone="blue"/><Stat label="Deadlines ahead" value={String(scholarships.filter(s=>daysLeft(s.deadline)>=0).length)} sub="Upcoming in this sample set" icon={CalendarDays} tone="orange"/></div><div className="insights-grid"><div className="panel chart-panel reveal-on-scroll"><div className="panel-head"><div><h3>Application pipeline</h3><p>Where your opportunities stand today.</p></div><TrendingUp size={18}/></div><div className="pipeline">{['Saved','Preparing','Applied','Approved'].map((st,i)=>{const count=apps.filter(a=>a.status===st).length;return <div className="pipeline-row" key={st}><span>{st}</span><div className="pipeline-track"><i style={{width:`${Math.max(count/apps.length*100,3)}%`}}/></div><b>{count}</b></div>})}</div></div><div className="panel chart-panel reveal-on-scroll"><div className="panel-head"><div><h3>Funding by opportunity</h3><p>Value of your tracked shortlist.</p></div><Wallet size={18}/></div><div className="funding-total">{money(apps.reduce((n,a)=>n+a.amount,0))}<small>total tracked value</small></div><div className="funding-bars">{apps.map((a,i)=><div key={a.id}><span>{a.scholarship.slice(0,17)}{a.scholarship.length>17?'…':''}</span><div><i style={{width:`${a.amount/Math.max(...apps.map(x=>x.amount),1)*100}%`}}/></div><b>{money(a.amount)}</b></div>)}</div></div></div><div className="sample-note"><CircleHelp size={15}/> Insights use your locally saved demo data and are for planning purposes only.</div></>

  const renderPage = () => {
    switch(page){case 'Discover':return <Discover/>;case 'Saved scholarships':return <Saved/>;case 'My applications':return <Applications/>;case 'Document vault':return <Documents/>;case 'Scholarship passport':return <Passport/>;case 'Insights':return <Insights/>;default:return <Overview/>}
  }

  return <div className="app-shell"><Sidebar/><main className="main-area"><Header/><div className="content" ref={contentRef}><AnimatePresence mode="wait"><motion.div key={page} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} transition={{duration:.18}}>{renderPage()}</motion.div></AnimatePresence><footer><span>© 2026 GRANTLY</span><span>Made for the next chapter <span className="footer-star">✳</span></span><span>Demo experience · Frontend only</span></footer></div></main>
    <AnimatePresence>{selected&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.div className="opportunity-modal" data-lenis-prevent role="dialog" aria-modal="true" aria-labelledby="scholarship-dialog-title" initial={{y:20,scale:.98}} animate={{y:0,scale:1}} exit={{y:15}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}><X size={19}/></button><div className={`provider-logo large ${selected.color}`}>{selected.provider.split(' ').map(w=>w[0]).slice(0,2).join('')}</div><div className="eyebrow">SCHOLARSHIP OPPORTUNITY</div><h2 id="scholarship-dialog-title">{selected.name}</h2><p className="muted">{selected.provider}</p><div className="modal-stats"><div><small>Potential award</small><b>{money(selected.amount)}</b></div><div><small>Application deadline</small><b>{format(new Date(selected.deadline),'dd MMM yyyy')}</b></div><div><small>Profile match</small><b>{selected.match}%</b></div></div><h4>Eligibility checklist</h4>{selected.eligibility.map(x=><div className="eligibility" key={x}><CheckCircle2 size={16}/>{x}</div>)}<div className="demo-warning">Demo catalogue: details are illustrative. Verify eligibility, dates and application instructions with the official provider before applying.</div><button className="primary-btn modal-cta" onClick={()=>{addApplication(selected);setSelected(null);navigate('My applications')}}>Add to my application tracker <ArrowRight size={16}/></button></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{commandOpen&&<motion.div className="command-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setCommandOpen(false)}><motion.div className="command-panel" data-lenis-prevent role="dialog" aria-modal="true" aria-label="Quick navigation" initial={{opacity:0,y:-12,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8}} onClick={e=>e.stopPropagation()}><div className="command-search"><Search size={18}/><input autoFocus placeholder="Where would you like to go?" value={query} onChange={e=>setQuery(e.target.value)} /><kbd>ESC</kbd></div><div className="command-label">QUICK NAVIGATION</div>{[
  {label:'Overview',Icon:LayoutDashboard},{label:'Discover',Icon:Compass},{label:'Saved scholarships',Icon:Bookmark},
  {label:'My applications',Icon:ClipboardList},{label:'Document vault',Icon:FolderOpen},
  {label:'Scholarship passport',Icon:UserRound},{label:'Insights',Icon:ChartNoAxesCombined}
].map(({label,Icon})=><button className="command-item" key={label} onClick={()=>{navigate(label);setCommandOpen(false)}}><Icon size={17}/><span>{label}</span><ArrowUpRight size={14}/></button>)}<div className="command-foot">GRANTLY COMMAND MENU <span>↑ ↓ navigate · enter select · esc close</span></div></motion.div></motion.div>}</AnimatePresence>
  </div>
}
