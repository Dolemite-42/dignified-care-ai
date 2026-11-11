import { useState } from 'react'
import {
  ArrowLeft,
  CalendarHeart,
  HandHeart,
  HeartHandshake,
  Lightbulb,
  Clock,
  ListChecks,
  ShieldCheck,
  Footprints,
  Users,
  Coffee,
  Stethoscope,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'

type Item = { title: string; text: string; icon: LucideIcon; tint: string; tag?: string }

const PARENT_RESOURCES: Item[] = [
  {
    title: 'A two-minute pause',
    text: 'Rest your feet on the floor. Breathe slowly and notice one thing you can see, hear, and feel.',
    icon: Footprints,
    tint: 'bg-violet-100 text-violet-700',
    tag: 'Grounding activity',
  },
  {
    title: 'Ask for a small hand',
    text: 'Choose one specific task a trusted person could help with, such as preparing a meal or sharing school pickup.',
    icon: Users,
    tint: 'bg-pink-100 text-pink-700',
    tag: 'Support network',
  },
  {
    title: 'Make room for rest',
    text: 'A short break still counts. Try a quiet cup of tea, a stretch, or a moment outdoors when possible.',
    icon: Coffee,
    tint: 'bg-emerald-100 text-emerald-700',
    tag: 'Daily wellbeing',
  },
  {
    title: 'Talk to a professional',
    text: 'If you need more support, a qualified local professional can help you explore options that fit your family.',
    icon: Stethoscope,
    tint: 'bg-amber-100 text-amber-700',
    tag: 'Extra support',
  },
]

const RECOMMENDATIONS: Item[] = [
  {
    title: 'Show the next step',
    text: 'Use pictures and short, concrete phrases to explain a routine before it begins.',
    icon: ListChecks,
    tint: 'bg-pink-100 text-pink-700',
  },
  {
    title: 'Allow time to respond',
    text: 'Give your child space to process a question. A picture choice or gesture is a valid answer.',
    icon: Clock,
    tint: 'bg-violet-100 text-violet-700',
  },
  {
    title: 'Practise when things are calm',
    text: 'Explore pads, bathroom routines, and the practice guide ahead of time, without pressure to finish every step.',
    icon: HeartHandshake,
    tint: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'Respect privacy and choice',
    text: 'Explain what is happening, ask before helping, and offer a private place to change or rest.',
    icon: ShieldCheck,
    tint: 'bg-amber-100 text-amber-700',
  },
]

type View = 'home' | 'parents' | 'recs'

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-700">
      <ArrowLeft size={16} /> Support Resources
    </button>
  )
}

function Header({ title, text }: { title: string; text: string }) {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-widest text-violet-700">Caregiver space</p>
      <h1 className="mt-1 text-4xl font-bold text-slate-900">{title}</h1>
      <p className="mt-2 text-slate-600">{text}</p>
    </>
  )
}

function ItemCard({ item }: { item: Item }) {
  const Icon = item.icon
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <span className={`inline-grid h-10 w-10 place-items-center rounded-xl ${item.tint}`}>
        <Icon size={18} />
      </span>
      <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{item.text}</p>
      {item.tag && (
        <span className="mt-3 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-800">
          {item.tag}
        </span>
      )}
    </article>
  )
}

export function SupportResources({ onOpenMenstrual }: { onOpenMenstrual: () => void }) {
  const [view, setView] = useState<View>('home')

  if (view === 'parents') {
    return (
      <div className="max-w-4xl">
        <Back onClick={() => setView('home')} />
        <Header
          title="Mental Health Resources for Parents"
          text="Gentle ideas offer starting points, not clinical advice."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {PARENT_RESOURCES.map((i) => (
            <ItemCard key={i.title} item={i} />
          ))}
        </div>
      </div>
    )
  }

  if (view === 'recs') {
    return (
      <div className="max-w-3xl">
        <Back onClick={() => setView('home')} />
        <Header
          title="Caregiver Recommendations"
          text="Every child is different. Adapt these ideas to your child's preferences and ask what feels comfortable."
        />
        <div className="mt-6 space-y-4">
          {RECOMMENDATIONS.map((i) => (
            <ItemCard key={i.title} item={i} />
          ))}
        </div>
      </div>
    )
  }

  const cards: { title: string; text: string; icon: LucideIcon; tint: string; go: () => void }[] = [
    {
      title: 'Mental Health Resources for Parents',
      text: 'Gentle wellbeing ideas, not clinical advice.',
      icon: HandHeart,
      tint: 'bg-violet-100 text-violet-700',
      go: () => setView('parents'),
    },
    {
      title: 'Caregiver Recommendations',
      text: 'Adaptable ideas for communication and routines.',
      icon: Lightbulb,
      tint: 'bg-amber-100 text-amber-700',
      go: () => setView('recs'),
    },
    {
      title: 'Menstrual Wellbeing',
      text: 'Who is on their cycle, which phase, and whose period is about to start.',
      icon: CalendarHeart,
      tint: 'bg-pink-100 text-pink-700',
      go: onOpenMenstrual,
    },
  ]

  return (
    <div className="max-w-4xl">
      <Header title="Support Resources" text="Gentle starting points for caregiver wellbeing and everyday support." />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {cards.map(({ title, text, icon: Icon, tint, go }) => (
          <button
            key={title}
            onClick={go}
            className="flex items-start justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
          >
            <div>
              <span className={`inline-grid h-10 w-10 place-items-center rounded-xl ${tint}`}>
                <Icon size={18} />
              </span>
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-500">{text}</p>
            </div>
            <ChevronRight className="mt-1 text-slate-400" size={18} />
          </button>
        ))}
      </div>
    </div>
  )
}
