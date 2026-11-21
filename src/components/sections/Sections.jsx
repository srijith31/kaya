import React, { useState } from 'react';
import { ArrowRight, Check, HeartPulse, Sparkles, ShieldCheck, Activity, Utensils, Video, HeartHandshake, PartyPopper, Bot, LayoutDashboard, ChevronLeft, ChevronRight, Maximize2, X, LockKeyhole, AlertCircle, EyeOff, Clock3, Sparkle } from 'lucide-react';
import { Container, Button, SectionHeading, Badge } from '../ui';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm py-20 sm:py-28 lg:py-32">
      <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <Container className="relative flex min-h-[520px] flex-col justify-center">
        <div className="max-w-4xl animate-rise">
          <Badge>
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-forest" />
            Everyday Workplace Wellness
          </Badge>
          <h1 className="mt-7 max-w-4xl font-display text-6xl leading-[.95] tracking-tight text-teal sm:text-7xl lg:text-[5.5rem]">
            Healthier People.<br /><em className="text-forest">Stronger Workplaces.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-sage">
            Kaya brings proactive 30-second daily check-ins, micro-habits, and confidential AI guidance directly into the flow of working life — helping People leaders support teams before burnout begins.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button to="/book-demo" className="px-7 py-3.5 text-base shadow-sm">
              Book a Demo <ArrowRight size={17} className="ml-2" />
            </Button>
            <a
              href="#product-showcase"
              className="inline-flex items-center justify-center rounded-full border border-teal/20 bg-white/70 px-6 py-3.5 text-sm font-semibold text-teal transition hover:bg-mint hover:-translate-y-0.5"
            >
              Explore the Platform ↓
            </a>
            <Button to="/reserve-pilot" variant="secondary" className="border-teal/20">
              Join Founding Partner Programme
            </Button>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-[.14em] text-sage">
            <span className="flex items-center gap-1.5"><Check size={14} className="text-forest" /> Zero software to install</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-forest" /> 100% Anonymous employee data</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-forest" /> Built for distributed teams</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProblemSection() {
  const problems = [
    {
      num: '01',
      badge: 'The Benefits Brochure Trap',
      title: 'Support arrives only after crisis hits.',
      description: 'Traditional wellness perks sit buried in HR portals and EAP hotlines. Employees rarely access them until they are already experiencing severe burnout or preparing to resign.',
      outcome: 'Result: High company spend, low everyday engagement.',
      icon: AlertCircle,
    },
    {
      num: '02',
      badge: 'The Surveillance Barrier',
      title: 'Employees fear their vulnerability will be seen.',
      description: 'When wellness programs ask intrusive questions, team members hesitate. If people worry their stress or mood logs might affect their standing, they disengage completely.',
      outcome: 'Result: Distrust and superficial participation.',
      icon: EyeOff,
    },
    {
      num: '03',
      badge: 'The One-Size-Fits-All Dilemma',
      title: 'Generic webinars demand too much time.',
      description: 'Hour-long sessions and once-a-year initiatives feel corporate and disconnected from daily workloads. Real human change happens in two-minute rituals, not annual seminars.',
      outcome: 'Result: Short-lived buzz that quickly fades away.',
      icon: Clock3,
    },
  ];

  return (
    <section className="bg-mint/40 py-24 sm:py-28 border-y border-teal/10">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="The Workplace Reality"
            title="Workplace wellbeing shouldn’t begin when someone burns out."
          >
            Most corporate wellness programs fail because they ask employees to step outside their workday. Kaya builds care directly into the rhythm of daily work.
          </SectionHeading>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.num}
                className="flex flex-col justify-between rounded-3xl border border-teal/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-forest/30 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl text-forest/30">{p.num}</span>
                    <span className="inline-flex rounded-xl bg-mint p-2 text-forest">
                      <Icon size={18} />
                    </span>
                  </div>
                  <span className="mt-6 inline-block rounded-full bg-warm px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest border border-teal/10">
                    {p.badge}
                  </span>
                  <h3 className="mt-4 font-display text-2xl text-teal leading-snug">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sage">{p.description}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-teal/10">
                  <p className="text-xs font-semibold text-forest/90">{p.outcome}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const tabs = [
    {
      id: 'dashboard',
      label: 'Employee Dashboard',
      eyebrow: 'Personalized Daily Rituals',
      title: 'A 30-second daily check-in that adapts to real workdays.',
      description: 'Employees start their morning with a calm, friction-free check-in covering sleep, energy, mood, and available time. Kaya calibrates a realistic daily wellness rhythm with zero guilt and zero rigid goals.',
      highlights: [
        '30-second morning calibration without lengthy surveys',
        'Adaptive schedule builder based on daily energy levels',
        'Strictly 100% private to the employee — never visible to HR',
      ],
      businessValue: 'Drives consistent daily adoption above 70% without cognitive overload or meeting interruption.',
      image: '/images/gallery/employee-dashboard.jpg',
      badge: 'Daily Ritual',
    },
    {
      id: 'ai-coach',
      label: 'AI Coach',
      eyebrow: 'Empathetic 24/7 Wellness Guidance',
      title: 'Ask Kaya: immediate, safe support for everyday work stress.',
      description: 'An AI wellness companion built specifically for the moments between a crisis and business-as-usual. Whether reflecting on a big project completion or navigating pre-meeting anxiety, Kaya offers calm, tailored perspectives.',
      highlights: [
        'Context-aware guidance for meeting stress and focus recovery',
        'Empathetic conversational tone in English, Hindi, and Telugu',
        'Ethical safety guardrails with direct Tele-MANAS crisis routing',
      ],
      businessValue: 'Provides instant, confidential decompression for employees, reducing workday stress before it escalates.',
      image: '/images/gallery/ai-coach.jpg',
      isMobile: true,
      badge: 'Ask Kaya V2',
    },
    {
      id: 'micro-actions',
      label: 'Personalised Micro-Actions',
      eyebrow: 'Bite-Sized Habit Timeline',
      title: 'Actionable 1-to-5 minute rituals timed into the working day.',
      description: 'Rather than demanding an hour at the gym or long meditation sessions, Kaya schedules bite-sized micro-actions — desk movement, hydration prompts, and quick body scans — that fit between calendar blocks.',
      highlights: [
        'Micro-habits taking 1–5 minutes: movement, hydration, stress resets',
        'One-tap "My Day Changed" recalibrator when meetings overrun',
        'Practical budget-friendly meal ideas to support nutrition',
      ],
      businessValue: 'Builds sustainable physical and mental wellbeing habits that stick throughout the working year.',
      image: '/images/gallery/micro-actions.jpg',
      badge: 'Micro-Actions',
    },
    {
      id: 'hr-analytics',
      label: 'HR Analytics',
      eyebrow: 'Organization Overview & Trends',
      title: 'Anonymous team wellbeing signals and early burnout alerts.',
      description: 'People leaders receive high-level organizational trends without ever compromising individual trust. Track burnout risk, participation rates, and schedule adaptation patterns with concrete 30-day HR action plans.',
      highlights: [
        'Organizational Burnout Risk Index (0–100) based on early warning indicators',
        'Anonymous participation metrics across teams and cohorts',
        'Actionable HR recommendations with zero individual data access',
      ],
      businessValue: 'Equips HR and leadership with proactive, data-backed retention insights while protecting 100% employee trust.',
      image: '/images/gallery/hr-analytics.jpg',
      badge: 'HR Overview',
    },
  ];

  const current = tabs[activeTab];

  return (
    <section id="product-showcase" className="py-24 sm:py-32 bg-warm">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="The Kaya Platform"
            title="Inside Kaya: tools designed for the rhythm of work."
          >
            Explore the four core pillars that bring daily human care to employees and clear, anonymous clarity to People teams.
          </SectionHeading>
        </div>

        {/* 4 Interactive Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-teal/15 bg-white p-2 shadow-sm">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  activeTab === idx
                    ? 'bg-teal text-white shadow-md'
                    : 'text-forest hover:bg-mint hover:text-teal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          {/* Narrative & Business Outcome */}
          <div>
            <span className="inline-block rounded-full bg-mint px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-forest">
              {current.eyebrow}
            </span>
            <h3 className="mt-5 font-display text-3xl sm:text-4xl text-teal leading-tight">
              {current.title}
            </h3>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-sage">
              {current.description}
            </p>

            <ul className="mt-8 space-y-3.5">
              {current.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm font-medium text-ink">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-forest">
                    <Check size={13} />
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Concrete Business Outcome Card */}
            <div className="mt-8 rounded-2xl border border-forest/20 bg-mint/50 p-6 shadow-xs">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-forest">
                Measurable Business Outcome
              </p>
              <p className="mt-2 text-base font-semibold leading-relaxed text-teal">
                {current.businessValue}
              </p>
            </div>
          </div>

          {/* Large Readable Product Preview */}
          <div className="relative">
            {/* Ambient subtle glow */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-mint via-forest/5 to-teal/10 blur-xl opacity-70" />

            <div className="overflow-hidden rounded-3xl border border-teal/15 bg-white p-2.5 sm:p-3 shadow-2xl shadow-teal/10">
              {/* Browser bar */}
              <div className="flex items-center justify-between border-b border-teal/10 bg-[#FAFBF9] px-4 py-3 rounded-t-2xl">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="rounded-full bg-white px-3.5 py-0.5 text-xs font-medium text-sage border border-teal/10">
                  kaya.app/{current.id}
                </span>
                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-forest hover:bg-mint transition"
                  title="Expand preview"
                >
                  <Maximize2 size={13} /> <span className="hidden sm:inline">Zoom</span>
                </button>
              </div>

              {/* Viewport Frame */}
              <div
                onClick={() => setLightbox(true)}
                className="group relative cursor-pointer overflow-hidden rounded-b-2xl bg-[#F8FAF8] flex items-center justify-center p-1"
              >
                {current.isMobile ? (
                  <div className="flex h-full min-h-[440px] w-full items-center justify-center p-4">
                    <div className="h-full max-h-[420px] aspect-[426/750] overflow-hidden rounded-2xl border-2 border-teal/20 shadow-xl bg-white">
                      <img
                        src={current.image}
                        alt={current.title}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full min-h-[380px] sm:min-h-[440px] overflow-hidden rounded-xl">
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                )}

                {/* Click to view full image hover badge */}
                <div className="absolute inset-0 flex items-center justify-center bg-teal/20 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-5 py-2.5 text-xs font-bold text-teal shadow-xl">
                    <Maximize2 size={15} /> Click to view full screenshot
                  </span>
                </div>
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
                <p className="text-xs text-sage">{current.businessValue}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 mr-3">
                  {tabs.map((tab, idx) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        activeTab === idx ? 'bg-teal text-white' : 'bg-mint text-forest hover:bg-mint/80'
                      }`}
                    >
                      {tab.label}
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

export function PrivacySection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Anonymous Aggregates',
      desc: 'HR and People teams only ever see aggregated signals across cohorts of 10 or more. Individual moods, journal entries, and check-ins are strictly invisible to employers.',
    },
    {
      icon: LockKeyhole,
      title: 'Employee-Owned Control',
      desc: 'Participation is voluntary and self-directed. No public scoreboards, no forced corporate competitions, and no punitive metrics. Employees own their personal wellness boundary.',
    },
    {
      icon: HeartPulse,
      title: 'Care Without Clinical Pretension',
      desc: 'Kaya is a proactive everyday wellbeing companion, not a clinical diagnostic tool. Clear ethical guardrails ensure verified crisis support (such as Tele-MANAS) is routed if acute care is required.',
    },
  ];

  return (
    <section className="bg-mint/50 py-24 sm:py-28 border-y border-teal/10">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Privacy By Design"
            title="Psychological safety is where real wellbeing begins."
          >
            Employees participate because their private reflections stay strictly their own. Kaya gives organizations meaningful culture signals without surveillance.
          </SectionHeading>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="rounded-3xl border border-teal/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-forest/30 hover:shadow-md"
              >
                <span className="inline-flex rounded-2xl bg-mint p-3 text-forest">
                  <Icon size={24} />
                </span>
                <h3 className="mt-7 font-display text-2xl text-teal">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sage">{p.desc}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-forest/20 bg-white/70 p-6 text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-forest">Our Privacy Guarantee</p>
          <p className="mt-2 text-sm text-ink leading-relaxed">
            Individual responses are never sold, never disclosed to managers, and never used for workplace evaluations.
          </p>
        </div>
      </Container>
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
