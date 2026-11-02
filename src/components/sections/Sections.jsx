import React from 'react';
import { ArrowRight, Check, HeartPulse, Sparkles, ShieldCheck, Activity } from 'lucide-react';
import { Container, Button, SectionHeading, Badge } from '../ui';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm">
      <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <Container className="relative grid min-h-[680px] items-center gap-14 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
        <div className="animate-rise">
          <Badge><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-forest" />Designed for the everyday</Badge>
          <h1 className="mt-7 max-w-3xl font-display text-6xl leading-[.95] tracking-tight text-teal sm:text-7xl lg:text-[5.5rem]">
            Healthier People.<br /><em className="text-forest">Stronger Workplaces.</em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-sage">
            Kaya helps organisations bring employee wellness into everyday working life through accessible digital support and personalised guidance.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button to="/book-demo">Book a Demo <ArrowRight size={16} className="ml-2" /></Button>
            <Button to="/reserve-pilot" variant="secondary">Join the Founding Partner Programme</Button>
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[.16em] text-sage">Built for People teams · Rooted in human support</p>
        </div>
        <div className="relative mx-auto w-full max-w-[540px] animate-rise pb-8 sm:pb-10">
          <div className="absolute -left-4 top-12 z-10 hidden rounded-2xl border border-teal/10 bg-white p-4 shadow-xl shadow-teal/10 sm:block sm:-left-9">
            <div className="flex items-center gap-3"><span className="rounded-full bg-mint p-2 text-forest"><Activity size={17} /></span><div><p className="text-xs font-bold text-teal">Your next small step</p><p className="mt-1 text-[11px] text-sage">Take a 5-minute reset</p></div></div>
          </div>
          <figure className="overflow-hidden rounded-[2rem] border border-teal/15 bg-white p-2 shadow-2xl shadow-teal/20 sm:p-3">
            <div className="aspect-[1219/768] overflow-hidden rounded-[1.4rem]">
              <img src="/images/kaya-workplace-dashboard-preview.png" width="1219" height="768" fetchPriority="high" className="h-full w-full object-cover object-top" alt="Kaya workplace wellbeing dashboard preview" />
            </div>
          </figure>
          <figure className="absolute bottom-0 right-1 w-32 overflow-hidden rounded-2xl border-4 border-warm bg-white shadow-2xl shadow-teal/20 sm:right-3 sm:w-40">
            <div className="aspect-[768/1045] overflow-hidden rounded-xl">
              <img src="/images/kaya-activity-preview.png" width="768" height="1045" className="h-full w-full object-cover object-top" alt="Kaya activity and wellbeing support preview" />
            </div>
          </figure>
          <p className="mt-4 pl-3 text-xs font-semibold uppercase tracking-[.18em] text-sage">Product concept preview · early stage</p>
        </div>
      </Container>
    </section>
  );
}

export function Trust() {
  return <section className="border-y border-teal/10 bg-mint/50 py-7"><Container className="grid gap-4 sm:grid-cols-3 sm:gap-8"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-forest">Everyday wellbeing</p><p className="mt-1 text-sm text-sage">Designed for the working day</p></div><div><p className="text-xs font-bold uppercase tracking-[.14em] text-forest">Employee-controlled</p><p className="mt-1 text-sm text-sage">Clear boundaries and privacy</p></div><div><p className="text-xs font-bold uppercase tracking-[.14em] text-forest">Thoughtful pilots</p><p className="mt-1 text-sm text-sage">Built with early partners</p></div></Container></section>;
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

export function QuoteBlock() {
  return <section className="py-20"><Container><div className="mx-auto max-w-4xl text-center"><p className="mb-6 text-xs font-bold uppercase tracking-[.18em] text-forest">The Kaya point of view</p><blockquote className="font-display text-4xl leading-tight text-teal sm:text-5xl">“When people have the space and support to feel well, better work follows.”</blockquote><p className="mt-7 text-sm font-semibold text-sage">— Kaya, built with People teams in mind</p></div></Container></section>;
}

export function CTA() {
  return <section className="py-20"><Container><div className="relative overflow-hidden rounded-[2rem] bg-teal px-7 py-14 sm:px-14"><div className="absolute -right-10 -top-20 h-72 w-72 rounded-full border-[38px] border-white/10" /><div className="relative max-w-2xl"><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-mint">A better place to begin</p><h2 className="font-display text-4xl text-white sm:text-5xl">Build a healthier workplace with Kaya.</h2><p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">Let's explore how Kaya can support your organisation's employee wellbeing goals.</p><div className="mt-8 flex flex-wrap gap-3"><Button to="/book-demo" variant="secondary" className="border-white/30 bg-white !text-teal">Book a Demo <ArrowRight size={16} className="ml-2" /></Button><Button to="/reserve-pilot" variant="secondary" className="border-white/30 !text-white hover:bg-white/10">Join the Founding Partner Programme</Button></div></div></div></Container></section>;
}
