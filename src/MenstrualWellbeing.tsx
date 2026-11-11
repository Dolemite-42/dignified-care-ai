export type Tracked = { name: string; age: string; lastPeriod: string }

const CYCLE_LENGTH = 28
const PERIOD_LENGTH = 5
const DAY_MS = 86_400_000
const NOW = Date.now()

function isoDaysAgo(n: number) {
  return new Date(NOW - n * DAY_MS).toISOString().slice(0, 10)
}

export const SAMPLE_TRACKED: Tracked[] = [
  { name: 'Maya (sample)', age: '11', lastPeriod: isoDaysAgo(2) },
  { name: 'Zuri (sample)', age: '14', lastPeriod: isoDaysAgo(26) },
  { name: 'Amara (sample)', age: '13', lastPeriod: isoDaysAgo(14) },
  { name: 'Lina (sample)', age: '16', lastPeriod: isoDaysAgo(22) },
]

export function cycleInfo(lastPeriod: string) {
  const start = new Date(lastPeriod + 'T00:00:00').getTime()
  const elapsed = Math.max(0, Math.floor((NOW - start) / DAY_MS))
  const day = (elapsed % CYCLE_LENGTH) + 1
  const daysUntil = day === 1 ? 0 : CYCLE_LENGTH - day + 1
  let phase = 'Luteal phase'
  if (day <= PERIOD_LENGTH) phase = 'Period (menstrual phase)'
  else if (day <= 13) phase = 'Follicular phase'
  else if (day <= 16) phase = 'Ovulation window'
  return { day, daysUntil, phase, onPeriod: day <= PERIOD_LENGTH, soon: day > PERIOD_LENGTH && daysUntil <= 3 }
}

export function Card({ t }: { t: Tracked }) {
  const c = cycleInfo(t.lastPeriod)
  const badge = c.onPeriod
    ? { text: 'On period', cls: 'bg-pink-100 text-pink-800' }
    : c.soon
      ? { text: 'Starting soon', cls: 'bg-amber-100 text-amber-800' }
      : { text: 'On track', cls: 'bg-emerald-100 text-emerald-800' }
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{t.name}</h3>
          <p className="text-xs text-slate-500">Age {t.age || '—'}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge.cls}`}>{badge.text}</span>
      </div>
      <p className="mt-4 text-sm text-slate-700">
        <strong>{c.phase}</strong> · day {c.day} of {CYCLE_LENGTH}
      </p>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={c.day}
        aria-valuemin={1}
        aria-valuemax={CYCLE_LENGTH}
      >
        <div className="h-full bg-pink-400" style={{ width: `${(c.day / CYCLE_LENGTH) * 100}%` }} />
      </div>
      <p className="mt-3 text-sm text-slate-600">
        {c.daysUntil === 0
          ? 'Estimated new cycle starts today'
          : `Next period in about ${c.daysUntil} day${c.daysUntil === 1 ? '' : 's'}`}
      </p>
      <p className="mt-1 text-xs text-slate-500">Last period: {t.lastPeriod}</p>
    </article>
  )
}

function Group({ title, hint, items }: { title: string; hint: string; items: Tracked[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold">
        {title} <span className="text-sm font-normal text-slate-500">({items.length})</span>
      </h2>
      <p className="text-sm text-slate-500">{hint}</p>
      {items.length === 0 ? (
        <p className="mt-3 rounded-xl bg-white p-4 text-sm text-slate-500">No one right now.</p>
      ) : (
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {items.map((t) => (
            <Card key={t.name + t.lastPeriod} t={t} />
          ))}
        </div>
      )}
    </section>
  )
}

export function MenstrualWellbeing({ tracked }: { tracked: Tracked[] }) {
  const all = tracked.map((t) => ({ t, c: cycleInfo(t.lastPeriod) }))
  const soon = all.filter((x) => x.c.soon).sort((a, b) => a.c.daysUntil - b.c.daysUntil)
  const on = all.filter((x) => x.c.onPeriod)
  const rest = all.filter((x) => !x.c.soon && !x.c.onPeriod)

  return (
    <div className="max-w-4xl">
      <p className="text-xs font-bold uppercase tracking-widest text-violet-700">Caregiver space</p>
      <h1 className="mt-1 text-4xl font-bold text-slate-900">Menstrual Wellbeing</h1>
      <p className="mt-2 text-slate-600">
        See who has started menstruating, which part of the cycle they are in, and whose period is
        about to begin.
      </p>
      <div className="mt-4 rounded-2xl bg-violet-100/70 p-4 text-sm text-slate-600">
        <strong className="text-slate-700">Estimates only.</strong> Based on a 28-day cycle from the
        last period date. Not medical advice. Sample data only.
      </div>
      <Group
        title="Starting soon"
        hint="Period expected within the next 3 days."
        items={soon.map((x) => x.t)}
      />
      <Group title="Currently on period" hint="In the first days of the cycle." items={on.map((x) => x.t)} />
      <Group title="Other tracked cycles" hint="Everyone else who has started menstruating." items={rest.map((x) => x.t)} />
    </div>
  )
}
