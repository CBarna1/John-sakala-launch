'use client';
import { useState } from 'react';
import { BOOK_PREORDER_OPTIONS } from '@/lib/event';

export default function RSVPForm() {
  const [form, setForm] = useState({
    name: '', email: '', attending: 'yes',
    guestCount: 1, bookCopies: 0, message: ''
  });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const selectedPreorder = BOOK_PREORDER_OPTIONS.find(({ copies }) => copies === form.bookCopies);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'success' : 'error');
  };

  if (status === 'success') {
    return (
      <div className="text-center p-8 bg-slate-800 rounded-xl border border-slate-700">
        <h3 className="text-2xl font-serif mb-2 text-amber-400">You're on the list! 📚</h3>
        <p className="text-slate-300">A confirmation email has been sent.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-slate-800 p-8 rounded-xl border border-slate-700">
      <input required placeholder="Full Name" value={form.name}
        onChange={e => setForm({...form, name: e.target.value})}
        className="w-full p-3 bg-slate-900 border border-slate-700 rounded text-white focus:border-amber-500 outline-none transition" />
      
      <input required type="email" placeholder="Email" value={form.email}
        onChange={e => setForm({...form, email: e.target.value})}
        className="w-full p-3 bg-slate-900 border border-slate-700 rounded text-white focus:border-amber-500 outline-none transition" />

      <div className="flex gap-4 py-2">
        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
          <input type="radio" checked={form.attending==='yes'} onChange={() => setForm({...form, attending: 'yes'})} className="accent-amber-500" />
          I will be there
        </label>
        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
          <input type="radio" checked={form.attending==='no'} onChange={() => setForm({...form, attending: 'no'})} className="accent-amber-500" />
          Can't make it
        </label>
      </div>

      {form.attending === 'yes' && (
        <>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">
              Number attending (including yourself; each attendee must have an invitation)
            </label>
            <input type="number" min="1" max="5" value={form.guestCount}
              onChange={e => setForm({...form, guestCount: +e.target.value})}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded text-white focus:border-amber-500 outline-none transition" />
          </div>
          
          <div>
            <label className="text-sm text-amber-400 mb-1 block font-medium">Pre-order copies</label>
            <select value={form.bookCopies}
              onChange={e => setForm({...form, bookCopies: Number(e.target.value)})}
              className="w-full p-3 bg-slate-900 border border-amber-500/50 rounded text-white focus:border-amber-500 outline-none transition">
              {BOOK_PREORDER_OPTIONS.map(({ copies, label }) => (
                <option key={copies} value={copies}>{label}</option>
              ))}
            </select>
            {selectedPreorder && selectedPreorder.copies > 0 && (
              <p className="mt-2 text-sm text-amber-300">
                Pre-order total: K{selectedPreorder.price}
              </p>
            )}
          </div>
        </>
      )}

      {/* NEW MESSAGE FIELD */}
      <div>
        <label className="text-sm text-slate-400 mb-1 block">Message to the author (optional)</label>
        <textarea 
          placeholder="Ask a question or leave a note..."
          value={form.message}
          onChange={e => setForm({...form, message: e.target.value})}
          className="w-full p-3 bg-slate-900 border border-slate-700 rounded text-white focus:border-amber-500 outline-none transition resize-none" 
          rows={3}
        />
      </div>

      <button disabled={status==='loading'}
        className="w-full bg-amber-500 text-slate-900 font-bold p-4 rounded hover:bg-amber-400 disabled:opacity-50 transition">
        {status === 'loading' ? 'Sending...' : 'Confirm RSVP'}
      </button>
      
      {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
    </form>
  );
}