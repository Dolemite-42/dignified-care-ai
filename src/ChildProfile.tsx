import { useState, type FormEvent, type ReactNode } from 'react'
import type { Tracked } from './MenstrualWellbeing'

type Form = {
  name: string
  gender: string
  phone: string
  age: string
  health: string
  behaviour: string
  menses: string
  lastPeriod: string
  periodBehaviour: string
}

const EMPTY: Form = {
  name: '',
  gender: '',
  phone: '',
  age: '',
  health: '',
  behaviour: '',
  menses: '',
  lastPeriod: '',
  periodBehaviour: '',
}

const TODAY = new Date().toISOString().slice(0, 10)

const FIELD =
  'mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200'

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  )
}

export function ChildProfile({ onSave }: { onSave: (t: Tracked) => void }) {
  const [form, setForm] = useState<Form>(EMPTY)
  const [preview, setPreview] = useState<Form | null>(null)

  const set = (key: keyof Form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const isFemale = form.gender === 'Female'

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setPreview(form)
    if (form.gender === 'Female' && form.menses === 'Yes' && form.lastPeriod) {
      onSave({ name: form.name, age: form.age, lastPeriod: form.lastPeriod })
    }
  }

  function onReset() {
    setForm(EMPTY)
    setPreview(null)
  }

  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-widest text-violet-700">Caregiver space</p>
      <h1 className="mt-1 text-4xl font-bold text-slate-900">Child Profile</h1>
      <p className="mt-2 text-slate-600">
        Tell us a little about the child so Weelove can support them with dignity.
      </p>
      <div className="mt-4 rounded-2xl bg-violet-100/70 p-4 text-sm text-slate-600">
        <strong className="text-slate-700">Demo only.</strong> Please use fictional details. Nothing
        entered here is saved or sent anywhere.
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Child's name" htmlFor="name">
            <input id="name" required className={FIELD} value={form.name} onChange={set('name')} />
          </Field>
          <Field label="Gender" htmlFor="gender">
            <select id="gender" required className={FIELD} value={form.gender} onChange={set('gender')}>
              <option value="" disabled>
                Select…
              </option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </Field>
          <Field label="Parent phone number" htmlFor="phone">
            <input
              id="phone"
              type="tel"
              required
              className={FIELD}
              value={form.phone}
              onChange={set('phone')}
            />
          </Field>
          <Field label="Age" htmlFor="age">
            <input
              id="age"
              type="number"
              min={0}
              max={120}
              required
              className={FIELD}
              value={form.age}
              onChange={set('age')}
            />
          </Field>
        </div>

        <Field label="Allergies / gastrointestinal issues" htmlFor="health">
          <textarea
            id="health"
            rows={3}
            className={FIELD}
            placeholder="e.g. lactose intolerance, constipation, none known"
            value={form.health}
            onChange={set('health')}
          />
        </Field>

        <Field label="Behavioral changes" htmlFor="behaviour">
          <textarea
            id="behaviour"
            rows={3}
            className={FIELD}
            placeholder="e.g. restless before needing the toilet, withdrawn when routine changes"
            value={form.behaviour}
            onChange={set('behaviour')}
          />
        </Field>

        {isFemale && (
          <fieldset className="space-y-4 rounded-2xl border border-pink-200 bg-pink-50/60 p-5">
            <legend className="px-2 text-lg font-bold text-slate-800">Menstrual wellbeing</legend>
            <Field label="Has menstruation started?" htmlFor="menses">
              <select id="menses" required className={FIELD} value={form.menses} onChange={set('menses')}>
                <option value="" disabled>
                  Select…
                </option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </Field>
            {form.menses === 'Yes' && (
              <Field label="Date of last period" htmlFor="lastPeriod">
                <input
                  id="lastPeriod"
                  type="date"
                  required
                  max={TODAY}
                  className={FIELD}
                  value={form.lastPeriod}
                  onChange={set('lastPeriod')}
                />
              </Field>
            )}
            <Field label="Behavioral changes around menstruation" htmlFor="periodBehaviour">
              <textarea
                id="periodBehaviour"
                rows={3}
                className={FIELD}
                placeholder="e.g. more irritable or tired in the days before"
                value={form.periodBehaviour}
                onChange={set('periodBehaviour')}
              />
            </Field>
          </fieldset>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-violet-800 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-900"
          >
            Preview profile
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
      </form>

      {preview && (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Profile preview</h2>
          <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm md:grid-cols-2">
            <Row k="Name" v={preview.name} />
            <Row k="Gender" v={preview.gender} />
            <Row k="Parent phone" v={preview.phone} />
            <Row k="Age" v={preview.age} />
            <Row k="Allergies / GI issues" v={preview.health} wide />
            <Row k="Behavioral changes" v={preview.behaviour} wide />
            {preview.gender === 'Female' && (
              <>
                <Row k="Menstruation started" v={preview.menses} />
                {preview.menses === 'Yes' && <Row k="Last period" v={preview.lastPeriod} />}
                <Row k="Menstrual behavioral changes" v={preview.periodBehaviour} wide />
              </>
            )}
          </dl>
        </section>
      )}
    </div>
  )
}

function Row({ k, v, wide }: { k: string; v: string; wide?: boolean }) {
  return (
    <div className={wide ? 'md:col-span-2' : ''}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{k}</dt>
      <dd className="mt-0.5 whitespace-pre-wrap text-slate-800">{v || '—'}</dd>
    </div>
  )
}
