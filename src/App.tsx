import { useState } from 'react'
import {
  Activity,
  ArrowRight,
  Bell,
  CalendarHeart,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  Smile,
  Users,
  type LucideIcon,
} from 'lucide-react'
import logo from './assets/weelove-logo.png'
import { ChildProfile } from './ChildProfile'
import { MenstrualWellbeing, SAMPLE_TRACKED, type Tracked } from './MenstrualWellbeing'
import { SupportResources } from './SupportResources'
import { Predictions, ToiletingOutlook } from './Predictions'
import { AutismSchools } from './AutismSchools'
import { MyFeelings } from './MyFeelings'

type NavItem = { label: string; icon: LucideIcon }

const NAV: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Child Profile', icon: Users },
  { label: 'Predictions', icon: Activity },
  { label: 'Menstrual Wellbeing', icon: CalendarHeart },
  { label: 'Support Resources', icon: HeartHandshake },
  { label: 'Autism Schools', icon: GraduationCap },
  { label: 'Caregiver Wellbeing', icon: Smile },
]

const AREAS = [
  {
    title: 'Predictions',
    text: 'See gentle heads-ups before a soiling event, so care stays calm and private.',
    icon: Activity,
    tint: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Menstrual Wellbeing',
    text: 'Track cycles and plan comfortable, dignified period care.',
    icon: CalendarHeart,
    tint: 'bg-pink-100 text-pink-700',
  },
  {
    title: 'Support Resources',
    text: 'Mental health support and check-ins for parents of autistic children.',
    icon: HeartHandshake,
    tint: 'bg-violet-100 text-violet-700',
  },
]

function Logo({ className = '' }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Weelove"
      className={`bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: '200% auto',
        backgroundPosition: 'center',
      }}
    />
  )
}

export default function App() {
  const [active, setActive] = useState('Dashboard')
  const [tracked, setTracked] = useState<Tracked[]>(SAMPLE_TRACKED)
  const [signedIn, setSignedIn] = useState(true)

  if (!signedIn) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#fbf8fd] p-6 text-center">
        <div>
          <Logo className="mx-auto h-24 w-72" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">You've been signed out</h1>
          <p className="mt-1 text-slate-600">Thank you for caring with dignity.</p>
          <button
            onClick={() => {
              setActive('Dashboard')
              setSignedIn(true)
            }}
            className="mt-6 rounded-xl bg-violet-800 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-900"
          >
            Sign back in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fbf8fd] text-slate-800">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <Logo className="h-14 w-44" />
        <div className="flex items-center gap-3">
          <button aria-label="Notifications" className="rounded-full bg-violet-50 p-2 text-violet-700">
            <Bell size={18} />
          </button>
          <button
            onClick={() => setSignedIn(false)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-[#fdf9ff] p-4 md:block">
          <p className="px-3 pb-3 text-xs font-bold uppercase tracking-widest text-violet-700">
            Caregiver space
          </p>
          <nav className="space-y-1">
            {NAV.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                  active === label
                    ? 'bg-violet-100 text-violet-900'
                    : 'text-slate-600 hover:bg-violet-50'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-2xl bg-violet-100/70 p-4 text-xs leading-relaxed text-slate-600">
            <p className="font-semibold text-slate-700">About this demo</p>
            This is for demo purposes only and no real data is recorded.
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-10">
          {active === 'Child Profile' ? (
            <ChildProfile onSave={(t) => setTracked((prev) => [...prev, t])} />
          ) : active === 'Caregiver Wellbeing' ? (
            <MyFeelings onOpenSupport={() => setActive('Support Resources')} />
          ) : active === 'Autism Schools' ? (
            <AutismSchools />
          ) : active === 'Predictions' ? (
            <Predictions tracked={tracked} />
          ) : active === 'Menstrual Wellbeing' ? (
            <MenstrualWellbeing tracked={tracked} />
          ) : active === 'Support Resources' ? (
            <SupportResources onOpenMenstrual={() => setActive('Menstrual Wellbeing')} />
          ) : (
          <>
          <section className="rounded-3xl bg-gradient-to-br from-sky-100 via-pink-100 to-violet-100 p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
              Caregiver space · Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-5xl">
              Care that protects dignity.
            </h1>
            <p className="mt-3 max-w-xl text-slate-700">
              Your AI companion for calmer days — spotting needs early, supporting you, and keeping
              every person's dignity first.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-800 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-900">
              View today's predictions <ArrowRight size={16} />
            </button>
          </section>

          <ToiletingOutlook />

          <h2 className="mt-10 text-2xl font-bold">Where would you like to begin?</h2>
          <p className="mt-1 text-sm text-slate-500">Choose one area to explore.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {AREAS.map(({ title, text, icon: Icon, tint }) => (
              <button
                key={title}
                onClick={() => setActive(title)}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
              >
                <span className={`inline-grid h-11 w-11 place-items-center rounded-xl ${tint}`}>
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{text}</p>
              </button>
            ))}
          </div>
          </>
          )}
        </main>
      </div>

      <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-500">
        <strong className="text-slate-700">Every person deserves dignity. Every caregiver deserves support.</strong>{' '}
        · Sample data only
      </footer>
    </div>
  )
}
