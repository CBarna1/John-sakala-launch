import Image from "next/image";
import RSVPForm from "./components/RSVPForm";
import Countdown from "./components/Countdown";
import {
  ADMISSION_FEE,
  BOOK,
  EVENT_DATE_LABEL,
  EVENT_TIME,
  PAYMENT_NUMBERS,
  PAYMENT_REGISTERED_NAME,
  VENUE,
  VENUE_ADDRESS,
} from "@/lib/event";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-900">
      
      {/* Hero Section */}
      <section className="relative min-h-[92vh] overflow-hidden px-6 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.16),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(94,234,212,0.06),_transparent_28%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_420px]">
          <div className="text-center lg:text-left">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-amber-400">
              You are invited to the book launch
            </p>
            <h1 className="text-6xl font-serif font-bold leading-[0.9] text-white sm:text-8xl">
              {BOOK.title}
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-serif text-xl italic text-slate-300 lg:mx-0">
              {BOOK.subtitle}
            </p>
            <p className="mt-5 text-lg font-medium text-white">by {BOOK.author}</p>

            <div className="mx-auto mt-8 max-w-xl border-y border-white/10 py-5 text-sm text-slate-300 lg:mx-0">
              <p className="font-semibold text-amber-300">{EVENT_DATE_LABEL} · {EVENT_TIME}</p>
              <p className="mt-2">{VENUE}</p>
              <p>{VENUE_ADDRESS}</p>
              <p className="mt-4 font-bold text-amber-300">Admission: K{ADMISSION_FEE} per person</p>
            </div>

            <a
              href="#rsvp"
              className="mt-8 inline-block rounded-full bg-amber-500 px-8 py-4 font-bold tracking-wide text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
            >
              RSVP & Reserve a Copy
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -inset-5 rotate-3 rounded-[2rem] border border-amber-300/20" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-2xl ring-1 ring-white/20">
              <Image
                src="/finish-your-race-cover.jpg"
                alt={`${BOOK.title} book cover`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured people */}
      <section className="border-y border-slate-700 bg-slate-950/70 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">
            Meet the voices behind the launch
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <article className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
              <div className="relative h-96 bg-slate-800">
                <Image src="/john-sakala.jpg" alt={BOOK.author} fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Author</p>
                <h2 className="mt-2 font-serif text-3xl text-white">{BOOK.author}</h2>
              </div>
            </article>
            <article className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
              <div className="relative h-96 bg-slate-800">
                <Image src="/alice-jere-tembo.jpg" alt={BOOK.guestOfHonor} fill className="object-cover object-top" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Guest of Honour</p>
                <h2 className="mt-2 font-serif text-3xl text-white">{BOOK.guestOfHonor}</h2>
                <p className="mt-2 text-slate-400">{BOOK.guestTitle}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-12 bg-slate-800 border-y border-slate-700">
        <Countdown />
      </section>

      {/* RSVP Form */}
      <section id="rsvp" className="py-24 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-serif text-center mb-8">Reserve Your Spot</h2>
          <div className="mb-6 rounded-xl border border-amber-500/40 bg-slate-800 p-6">
            <h3 className="font-serif text-xl text-amber-400">Admission Payment</h3>
            <p className="mt-2 text-sm text-slate-300">
              Admission is K{ADMISSION_FEE} per person. Pay using either number below:
            </p>
            <ul className="mt-3 space-y-2">
              {PAYMENT_NUMBERS.map((number) => (
                <li key={number}>
                  <a className="font-semibold text-white underline decoration-amber-400 underline-offset-4" href={`tel:${number}`}>
                    {number}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate-400">
              Both numbers are registered under <span className="font-medium text-slate-200">{PAYMENT_REGISTERED_NAME}</span>.
            </p>
          </div>
          <RSVPForm />
        </div>
      </section>

    </main>
  );
}