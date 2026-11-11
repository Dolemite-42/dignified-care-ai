import { Card, cycleInfo, type Tracked } from './MenstrualWellbeing'

type Recipient = {
  name: string
  group: string
  risk: 'Low' | 'Moderate' | 'High'
  window: string
}

const RECIPIENTS: Recipient[] = [
  { name: 'Amani (sample)', group: 'Child · autism', risk: 'Moderate', window: 'Likely in ~45 min' },
  { name: 'Grandpa Joe (sample)', group: 'Elderly care', risk: 'Low', window: 'No event expected soon' },
  { name: 'Lena (sample)', group: 'Paraplegia', risk: 'High', window: 'Likely in ~15 min' },
]

const RISK_STYLES: Record<Recipient['risk'], string> = {
  Low: 'bg-emerald-100 text-emerald-800',
  Moderate: 'bg-amber-100 text-amber-800',
  High: 'bg-rose-100 text-rose-800',
}

export function ToiletingOutlook() {
  return (
    <>
      <h2 className="mt-10 text-2xl font-bold">Today's outlook</h2>
      <p className="mt-1 text-sm text-slate-500">Predicted from routines, hydration and past patterns.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {RECIPIENTS.map((r) => (
          <article key={r.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{r.name}</h3>
                <p className="text-xs text-slate-500">{r.group}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${RISK_STYLES[r.risk]}`}>
                {r.risk}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600">{r.window}</p>
          </article>
        ))}
      </div>
    </>
  )
}

function priority(t: Tracked) {
  const c = cycleInfo(t.lastPeriod)
  if (c.soon) return c.daysUntil
  if (c.onPeriod) return 100 + c.day
  return 200 + c.daysUntil
}

export function Predictions({ tracked }: { tracked: Tracked[] }) {
  const sorted = [...tracked].sort((a, b) => priority(a) - priority(b))
  return (
    <div className="max-w-4xl">
      <p className="text-xs font-bold uppercase tracking-widest text-violet-700">Caregiver space</p>
      <h1 className="mt-1 text-4xl font-bold text-slate-900">Predictions</h1>
      <p className="mt-2 text-slate-600">Toileting updates and menstrual tracking in one place.</p>

      <ToiletingOutlook />

      <h2 className="mt-10 text-2xl font-bold">Menstrual tracker</h2>
      <p className="mt-1 text-sm text-slate-500">
        Girls whose period is starting soon appear first. Estimates only, sample data.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {sorted.map((t) => (
          <Card key={t.name + t.lastPeriod} t={t} />
        ))}
      </div>
    </div>
  )
}
