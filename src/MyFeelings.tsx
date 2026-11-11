import { useState, type FormEvent } from 'react'

const MOODS = [
  { key: 'happy', emoji: '😊', label: 'Happy', msg: "That's lovely to hear. Notice what helped today and enjoy it." },
  { key: 'calm', emoji: '😌', label: 'Calm', msg: 'A calm day is worth celebrating. Keep the routines that are working.' },
  { key: 'tired', emoji: '😴', label: 'Tired', msg: 'Caring is hard work. Even a short rest counts — be gentle with yourself.' },
  { key: 'stressed', emoji: '😣', label: 'Stressed', msg: "That's understandable. Try a two-minute pause, or ask someone for one small hand." },
  { key: 'sad', emoji: '😢', label: 'Sad', msg: "You don't have to carry this alone. Reaching out to someone you trust can help." },
  { key: 'overwhelmed', emoji: '😰', label: 'Overwhelmed', msg: "Thank you for being honest. Please consider talking to a professional or someone close to you soon." },
] as const

const FIELD =
  'mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200'

export function MyFeelings({ onOpenSupport }: { onOpenSupport: () => void }) {
  const [mood, setMood] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [checkedIn, setCheckedIn] = useState(false)

  const [rating, setRating] = useState(0)
  const [topic, setTopic] = useState('Overall experience')
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)

  const selected = MOODS.find((m) => m.key === mood)

  function submitFeedback(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-widest text-violet-700">Caregiver space</p>
      <h1 className="mt-1 text-4xl font-bold text-slate-900">Caregiver Wellbeing</h1>
      <p className="mt-2 text-slate-600">
        A quiet place to check in on your own wellbeing, and to tell us how Weelove is working for you.
      </p>
      <div className="mt-4 rounded-2xl bg-violet-100/70 p-4 text-sm text-slate-600">
        <strong className="text-slate-700">Demo only.</strong> Nothing here is saved or sent anywhere. This
        is not a clinical assessment.
      </div>

      <section className="mt-6 rounded-3xl bg-gradient-to-br from-sky-100 via-pink-100 to-violet-100 p-6">
        <h2 className="text-2xl font-bold">How are you feeling today?</h2>
        <p className="text-sm text-slate-600">Choose the one that fits best.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {MOODS.map((m) => (
            <button
              key={m.key}
              type="button"
              aria-pressed={mood === m.key}
              onClick={() => {
                setMood(m.key)
                setCheckedIn(false)
              }}
              className={`rounded-2xl border bg-white p-5 text-center shadow-sm transition ${
                mood === m.key ? 'border-violet-600 ring-2 ring-violet-200' : 'border-slate-200 hover:shadow-md'
              }`}
            >
              <div className="text-4xl">{m.emoji}</div>
              <div className="mt-2 text-sm font-semibold">{m.label}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="mt-5 space-y-3">
            <label htmlFor="note" className="text-sm font-semibold text-slate-700">
              Anything you'd like to add? (optional)
            </label>
            <textarea
              id="note"
              rows={3}
              className={FIELD}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setCheckedIn(true)}
              className="rounded-xl bg-violet-800 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-900"
            >
              Check in
            </button>
          </div>
        )}

        {selected && checkedIn && (
          <div role="status" className="mt-5 rounded-2xl bg-white p-5 text-sm text-slate-700">
            <p>
              <strong>
                {selected.emoji} Feeling {selected.label.toLowerCase()}.
              </strong>{' '}
              {selected.msg}
            </p>
            <button onClick={onOpenSupport} className="mt-3 font-semibold text-violet-700 underline">
              Open support resources
            </button>
          </div>
        )}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Tell us about Weelove</h2>
        <p className="mt-1 text-sm text-slate-500">Your feedback helps us make care more dignified.</p>

        {sent ? (
          <p role="status" className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
            Thank you for your feedback (demo — not actually sent).
          </p>
        ) : (
          <form onSubmit={submitFeedback} className="mt-4 space-y-4">
            <div>
              <span className="text-sm font-semibold text-slate-700">How helpful is Weelove?</span>
              <div className="mt-1 flex gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    onClick={() => setRating(n)}
                    className={`text-3xl ${n <= rating ? 'text-amber-400' : 'text-slate-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="topic" className="text-sm font-semibold text-slate-700">
                What is your feedback about?
              </label>
              <select id="topic" className={FIELD} value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option>Overall experience</option>
                <option>Toileting predictions</option>
                <option>Menstrual tracker</option>
                <option>Support resources</option>
                <option>Autism schools</option>
                <option>Something else</option>
              </select>
            </div>
            <div>
              <label htmlFor="comment" className="text-sm font-semibold text-slate-700">
                Your comments
              </label>
              <textarea
                id="comment"
                rows={4}
                required
                className={FIELD}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={rating === 0}
              className="rounded-xl bg-violet-800 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-900 disabled:opacity-50"
            >
              Send feedback
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
