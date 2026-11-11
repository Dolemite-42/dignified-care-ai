import { useState } from 'react'
import { BadgeCheck, Search } from 'lucide-react'

type School = {
  name: string
  focus: string
  text: string
  location: string
  tint: string
  tags: string[]
}

const SCHOOLS: School[] = [
  {
    name: 'Willow Grove Learning Centre',
    focus: 'Sensory-aware learning',
    text: 'Visual schedules, sensory-aware classrooms and family collaboration.',
    location: 'Sample city A',
    tint: 'bg-emerald-100',
    tags: ['Sensory rooms', 'Visual schedules'],
  },
  {
    name: 'Little Lantern Academy',
    focus: 'Communication support',
    text: 'Communication choices, creative arts and small-group activities.',
    location: 'Sample city B',
    tint: 'bg-violet-100',
    tags: ['AAC support', 'Small groups'],
  },
  {
    name: 'Meadow Path School',
    focus: 'Everyday skills',
    text: 'Everyday skills, flexible routines and individual learning goals.',
    location: 'Sample city A',
    tint: 'bg-amber-100',
    tags: ['Toileting support', 'Life skills'],
  },
  {
    name: 'Bright Bridge Learning Studio',
    focus: 'Play-based learning',
    text: 'Play-based learning, movement breaks and supportive communication.',
    location: 'Sample city C',
    tint: 'bg-pink-100',
    tags: ['Movement breaks', 'Play-based'],
  },
]

export function AutismSchools() {
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const results = SCHOOLS.filter((s) =>
    [s.name, s.focus, s.text, s.location, ...s.tags].join(' ').toLowerCase().includes(term),
  )

  return (
    <div className="max-w-4xl">
      <p className="text-xs font-bold uppercase tracking-widest text-violet-700">Caregiver space</p>
      <h1 className="mt-1 text-4xl font-bold text-slate-900">Autism Schools</h1>
      <p className="mt-2 text-slate-600">
        Schools that Weelove has vetted and verified for inclusive, dignified, autism-friendly learning.
      </p>
      <div className="mt-4 rounded-2xl bg-violet-100/70 p-4 text-sm text-slate-600">
        <strong className="text-slate-700">Sample listings.</strong> These are fictional placeholders until
        real schools complete Weelove's verification.
      </div>

      <label className="relative mt-6 block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          aria-label="Search schools"
          placeholder="Search schools, location or focus area…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
        />
      </label>

      {results.length === 0 ? (
        <p className="mt-6 rounded-xl bg-white p-4 text-sm text-slate-500">No schools match your search.</p>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {results.map((s) => (
            <article key={s.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <span className={`inline-grid h-10 w-10 place-items-center rounded-xl text-lg ${s.tint}`}>
                  🎓
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                  <BadgeCheck size={14} /> Weelove verified
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
              <p className="text-xs text-slate-500">
                {s.location} · {s.focus}
              </p>
              <p className="mt-2 text-sm text-slate-600">{s.text}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-800">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
