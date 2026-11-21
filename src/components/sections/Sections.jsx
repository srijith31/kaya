import React, { useState } from 'react';
import { ArrowRight, Check, HeartPulse, Sparkles, ShieldCheck, Activity, Utensils, Video, HeartHandshake, PartyPopper, Bot, LayoutDashboard, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Container, Button, SectionHeading, Badge } from '../ui';

const galleryScreens = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    badge: 'Daily Ritual',
    title: 'Personalized Daily Check-in',
    subtitle: 'Sleep, energy, mood check-ins & smart daily rhythm',
    image: '/images/gallery/employee-dashboard.jpg',
  },
  {
    id: 'micro-actions',
    label: 'Micro-Actions',
    badge: 'Workday Habits',
    title: 'Actionable 2-Minute Habits',
    subtitle: 'Movement, hydration & stress resets timed into your workday',
    image: '/images/gallery/micro-actions.jpg',
  },
  {
    id: 'ai-coach',
    label: 'AI Coach',
    badge: 'Ask Kaya',
    title: 'Empathetic Wellness Chat',
    subtitle: '24/7 private guidance for stress, energy & focus',
    image: '/images/gallery/ai-coach.jpg',
    isMobile: true,
  },
  {
    id: 'hr-analytics',
    label: 'HR Analytics',
    badge: 'Organization View',
    title: 'Burnout Risk & Participation',
    subtitle: '100% anonymous workforce wellbeing signals & action plans',
    image: '/images/gallery/hr-analytics.jpg',
  },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const current = galleryScreens[activeTab];

  return (
    <section className="relative overflow-hidden bg-warm">
      <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <Container className="relative grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[1fr_1.08fr] lg:py-24">
        {/* Left Column: Headline, Narrative & Buttons */}
        <div className="animate-rise">
          <Badge><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-forest" />Designed for the everyday</Badge>
          <h1 className="mt-7 max-w-2xl font-display text-5xl leading-[.98] tracking-tight text-teal sm:text-6xl lg:text-[4.75rem]">
            Healthier People.<br /><em className="text-forest">Stronger Workplaces.</em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-sage">
            Kaya helps organisations bring employee wellness into everyday working life through accessible digital support and personalised guidance.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button to="/book-demo">Book a Demo <ArrowRight size={16} className="ml-2" /></Button>
            <Button to="/reserve-pilot" variant="secondary">Join the Founding Partner Programme</Button>
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="inline-flex items-center justify-center rounded-full border border-forest/20 bg-mint/60 px-5 py-3 text-sm font-semibold text-forest transition hover:bg-mint hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-mint"
            >
              <Maximize2 size={15} className="mr-2 text-forest" /> Product Gallery
            </button>
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[.16em] text-sage">Built for People teams · Rooted in human support</p>
        </div>

        {/* Right Column: Live Product Gallery Showcase */}
        <div className="relative mx-auto w-full max-w-[580px] animate-rise">
          {/* Ambient background glow to blend properly with the warm palette */}
          <div
            className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-mint/70 via-warm to-forest/10 blur-xl opacity-80"
            aria-hidden="true"
          />

          {/* Gallery Category Tabs */}
          <div className="mb-3 flex items-center justify-between gap-2 overflow-x-auto pb-1">
            <div className="flex items-center gap-1.5">
              {galleryScreens.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === idx
                      ? 'bg-teal text-white shadow-sm ring-2 ring-teal/20'
                      : 'border border-teal/15 bg-white/80 text-forest hover:bg-mint hover:border-forest/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setLightbox(true)}
              title="Expand full screen"
              className="inline-flex items-center gap-1 rounded-full border border-teal/15 bg-white/80 px-2.5 py-1.5 text-[11px] font-semibold text-sage hover:bg-mint hover:text-teal transition"
            >
              <Maximize2 size={13} />
            </button>
          </div>

          {/* Browser Window Mockup */}
          <div className="overflow-hidden rounded-[1.75rem] border border-teal/15 bg-white shadow-2xl shadow-teal/15 transition-all">
            {/* Top Browser Bar */}
            <div className="flex items-center justify-between border-b border-teal/10 bg-[#FAFBF9] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="rounded-full bg-white px-3 py-0.5 text-[11px] font-medium text-sage border border-teal/10">
                kaya.app/{current.id}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest">
                {current.badge}
              </span>
            </div>

            {/* Viewport Frame */}
            <div
              onClick={() => setLightbox(true)}
              className="group relative aspect-[16/9.5] w-full cursor-pointer overflow-hidden bg-[#F8FAF8]"
            >
              {current.isMobile ? (
                // Mobile Chat UI centered inside container
                <div className="flex h-full w-full items-center justify-center p-3">
                  <div className="h-full max-h-[350px] aspect-[426/750] overflow-hidden rounded-2xl border-2 border-teal/20 shadow-xl bg-white">
                    <img
                      src={current.image}
                      alt={current.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              ) : (
                // Desktop Web View
                <img
                  src={current.image}
                  alt={current.title}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              )}

              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center bg-teal/20 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-teal shadow-lg">
                  <Maximize2 size={14} /> Click to view full image
                </span>
              </div>
            </div>

            {/* Bottom Bar: Title & Slide Navigation */}
            <div className="flex items-center justify-between border-t border-teal/10 bg-white px-4 py-3">
              <div className="min-w-0 pr-2">
                <p className="text-xs font-bold text-teal truncate">{current.title}</p>
                <p className="text-[11px] text-sage truncate">{current.subtitle}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab((prev) => (prev - 1 + galleryScreens.length) % galleryScreens.length)}
                  className="rounded-full p-1.5 text-sage hover:bg-mint hover:text-teal transition"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab((prev) => (prev + 1) % galleryScreens.length)}
                  className="rounded-full p-1.5 text-sage hover:bg-mint hover:text-teal transition"
                  aria-label="Next image"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Lightbox Modal for Full Resolution Gallery */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-teal/80 p-4 backdrop-blur-md"
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative max-h-[92vh] max-w-5xl w-full overflow-hidden rounded-3xl bg-white p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between border-b border-teal/10 pb-3">
              <div>
                <h3 className="font-display text-xl text-teal">{current.title}</h3>
                <p className="text-xs text-sage">{current.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 mr-3">
                  {galleryScreens.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        activeTab === idx
                          ? 'bg-teal text-white'
                          : 'bg-mint text-forest hover:bg-mint/80'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setLightbox(false)}
                  className="rounded-full bg-mint p-2 text-forest hover:bg-teal hover:text-white transition"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="max-h-[75vh] overflow-auto rounded-2xl bg-[#F6F8F6] p-2 flex items-center justify-center">
              <img
                src={current.image}
                alt={current.title}
                className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function Trust() {
  return <section className="border-y border-teal/10 bg-mint/50 py-7"><Container className="grid gap-4 sm:grid-cols-3 sm:gap-8"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-forest">Everyday wellbeing</p><p className="mt-1 text-sm text-sage">Designed for the working day</p></div><div><p className="text-xs font-bold uppercase tracking-[.14em] text-forest">Employee-controlled</p><p className="mt-1 text-sm text-sage">Clear boundaries and privacy</p></div><div><p className="text-xs font-bold uppercase tracking-[.14em] text-forest">Thoughtful pilots</p><p className="mt-1 text-sm text-sage">Built with early partners</p></div></Container></section>;
}

export function YogaBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-teal">
      <div className="relative aspect-[1935/825] min-h-[360px] w-full sm:min-h-[460px] lg:min-h-[520px]">
        <img
          src="/images/yoga-banner.jpg"
          alt="Mindful movement in morning light"
          className="h-full w-full object-cover object-center brightness-100 contrast-[1.02]"
        />
        {/* Subtle non-intrusive gradient that keeps full photo clarity and warm golden sunlight */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <blockquote className="max-w-4xl font-display text-2xl leading-snug text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] sm:text-4xl md:text-5xl lg:text-5xl">
            “Wellbeing is not a perk. It is the way people do their best work.”
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export function Pathway() {
  const items = [['01', 'Notice', 'Understand the lived experience behind the metrics.'], ['02', 'Nurture', 'Create rituals and resources people can actually use.'], ['03', 'Navigate', 'Build the confidence to make change stick.']];
  return <section className="bg-mint/60 py-20"><Container><SectionHeading eyebrow="Our approach" title="A pathway made for real life.">No one-size-fits-all playbooks. Kaya meets people where they are, then makes the next step feel possible.</SectionHeading><div className="mt-14 grid gap-5 md:grid-cols-3">{items.map(([n, t, d], i) => <div key={n} className="relative border-t-2 border-forest/30 pt-6"><span className="font-display text-5xl text-forest/30">{n}</span><h3 className="mt-6 font-display text-3xl text-teal">{t}</h3><p className="mt-3 leading-relaxed text-sage">{d}</p>{i < 2 && <div className="absolute right-0 top-[-7px] hidden text-forest md:block">→</div>}</div>)}</div></Container></section>;
}

export function Capabilities() {
  const items = [
    [HeartPulse, 'Digital wellness', 'Practical, accessible support that fits around the working day.', 'Current focus'],
    [Sparkles, 'Personalised guidance', 'Thoughtful prompts and an AI wellness coach that keeps the next step clear.', 'Current focus'],
    [ShieldCheck, 'Privacy by design', 'Employee control, clear boundaries and a workplace experience people can trust.', 'Current focus'],
  ];
  return <section className="py-20"><Container><SectionHeading eyebrow="Phase 1 capabilities" title="Wellness support that meets the moment.">A calm, practical layer of support for employees — and a clearer view for the organisations that care for them.</SectionHeading><div className="mt-14 grid gap-5 md:grid-cols-3">{items.map(([Icon, title, copy, status]) => <article key={title} className="rounded-3xl border border-teal/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-teal/5"><div className="flex items-center justify-between"><span className="inline-flex rounded-2xl bg-mint p-3 text-forest"><Icon size={22} /></span><span className="text-[10px] font-bold uppercase tracking-[.14em] text-forest">{status}</span></div><h3 className="mt-10 font-display text-2xl text-teal">{title}</h3><p className="mt-3 leading-relaxed text-sage">{copy}</p></article>)}</div></Container></section>;
}

export function WhatYouGet() {
  const leftItems = [
    [Utensils, 'Daily wellness habit and one healthy food idea, delivered by email every morning'],
    [Video, 'Two live online classes every week with real trainers'],
    [HeartHandshake, 'Two private counselling sessions a week, optional for every employee'],
  ];

  const rightItems = [
    [PartyPopper, 'Fun online team events that keep people connected'],
    [Bot, 'An AI wellness chat on our website, available anytime'],
    [LayoutDashboard, 'An HR dashboard showing team wellbeing trends, fully anonymous with no individual data'],
  ];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background Image & Refined Natural Lighting Blend */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src="/images/what-you-get-bg.jpg"
          alt="Mindful movement in sunlit studio"
          className="h-full w-full object-cover object-center brightness-[0.98] contrast-[1.04]"
        />
        {/* Light ambient warmth preserving clarity of the image */}
        <div className="absolute inset-0 bg-warm/25" />
        {/* Soft top feather */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-warm via-warm/40 to-transparent" />
        {/* Soft bottom feather transitioning into the Approach section */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-mint/60 via-mint/20 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <SectionHeading eyebrow="What you get" title="Support that fits into the rhythm of work.">
            Practical, human-centred tools designed to support your team every day.
          </SectionHeading>
        </div>

        {/* Flanked layout: 3 cards in left corner, wide open center framing face and body, 3 cards in right corner */}
        <div className="mt-12 sm:mt-16 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
          {/* Left column pushed to left corner: 3 cards top to down */}
          <div className="flex flex-col gap-4 sm:gap-5 w-full max-w-[340px] lg:max-w-[310px] xl:max-w-[340px] lg:mr-auto">
            {leftItems.map(([Icon, text]) => (
              <article
                key={text}
                className="group rounded-3xl border border-white/85 bg-white/90 p-5 sm:p-6 shadow-sm shadow-teal/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-forest/25 hover:bg-white hover:shadow-lg"
              >
                <span className="inline-flex rounded-2xl bg-mint p-2.5 text-forest transition group-hover:scale-105">
                  <Icon size={20} />
                </span>
                <p className="mt-3.5 text-sm sm:text-base font-medium leading-relaxed text-ink">{text}</p>
              </article>
            ))}
          </div>

          {/* Right column pushed to right corner: 3 cards top to down */}
          <div className="flex flex-col gap-4 sm:gap-5 w-full max-w-[340px] lg:max-w-[310px] xl:max-w-[340px] lg:ml-auto">
            {rightItems.map(([Icon, text]) => (
              <article
                key={text}
                className="group rounded-3xl border border-white/85 bg-white/90 p-5 sm:p-6 shadow-sm shadow-teal/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-forest/25 hover:bg-white hover:shadow-lg"
              >
                <span className="inline-flex rounded-2xl bg-mint p-2.5 text-forest transition group-hover:scale-105">
                  <Icon size={20} />
                </span>
                <p className="mt-3.5 text-sm sm:text-base font-medium leading-relaxed text-ink">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function QuoteBlock() {
  return (
    <section className="relative w-full overflow-hidden bg-teal">
      <div className="relative aspect-[1935/825] min-h-[380px] w-full sm:min-h-[460px] lg:min-h-[520px]">
        <img
          src="/images/quote-bg.jpg"
          alt="The Kaya point of view"
          className="h-full w-full object-cover object-center brightness-[0.9] contrast-[1.04]"
        />
        {/* Harmonized overlay to enrich lighting and integrate with Kaya brand */}
        <div
          className="absolute inset-0 bg-teal/35 mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-teal/65 via-transparent to-teal/35"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-mint drop-shadow">
            The Kaya point of view
          </p>
          <blockquote className="max-w-4xl font-display text-2xl leading-snug text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            “When people have the space and support to feel well, better work follows.”
          </blockquote>
          <p className="mt-6 text-sm font-medium text-white/85 drop-shadow">
            — Kaya, built with People teams in mind
          </p>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return <section className="py-20"><Container><div className="relative overflow-hidden rounded-[2rem] bg-teal px-7 py-14 sm:px-14"><div className="absolute -right-10 -top-20 h-72 w-72 rounded-full border-[38px] border-white/10" /><div className="relative max-w-2xl"><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-mint">A better place to begin</p><h2 className="font-display text-4xl text-white sm:text-5xl">Build a healthier workplace with Kaya.</h2><p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">Let's explore how Kaya can support your organisation's employee wellbeing goals.</p><div className="mt-8 flex flex-wrap gap-3"><Button to="/book-demo" variant="secondary" className="border-white/30 bg-white !text-teal">Book a Demo <ArrowRight size={16} className="ml-2" /></Button><Button to="/reserve-pilot" variant="secondary" className="border-white/30 !text-white hover:bg-white/10">Join the Founding Partner Programme</Button></div></div></div></Container></section>;
}
