import Image from "next/image";
import RSVPForm from "./components/RSVPForm";
import Countdown from "./components/Countdown";
import { BOOK, CITY, EVENT_DATE_LABEL, EVENT_TIME, VENUE } from "@/lib/event";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-900">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 py-20 text-center relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-3xl -z-10" />

        {/* Book Cover Image placeholder */}
        <div className="relative w-48 h-72 sm:w-64 sm:h-96 shadow-2xl mb-12 rounded-md overflow-hidden ring-1 ring-white/20">
           {/* Replace src with your actual book cover image in the /public folder */}
          <Image 
            src="/book-cover.jpg" 
            alt={BOOK.title} 
            fill 
            className="object-cover" 
            priority
          />
        </div>

        <p className="text-amber-400 uppercase tracking-widest text-sm mb-4 font-semibold">
          You are invited to the launch of
        </p>
        <h1 className="text-5xl sm:text-7xl font-serif font-bold mb-6 text-white max-w-3xl leading-tight">
          {BOOK.title}
        </h1>
        <p className="text-xl text-slate-300 mb-8">by {BOOK.author}</p>
        
        <div className="text-sm font-medium text-slate-400 space-y-2 mb-12">
          <p>{EVENT_DATE_LABEL} · {EVENT_TIME}</p>
          <p>{VENUE}, {CITY}</p>
        </div>

        <a
          href="#rsvp"
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-full font-bold tracking-wide transition shadow-lg shadow-amber-500/20"
        >
          RSVP & Reserve a Copy
        </a>
      </section>

      {/* Countdown */}
      <section className="py-12 bg-slate-800 border-y border-slate-700">
        <Countdown />
      </section>

      {/* RSVP Form */}
      <section id="rsvp" className="py-24 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-serif text-center mb-8">Reserve Your Spot</h2>
          <RSVPForm />
        </div>
      </section>

    </main>
  );
}