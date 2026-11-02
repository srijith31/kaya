import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Container, Button } from '../ui';

const links = [['About', '/about'], ['Approach', '/approach'], ['Roadmap', '/roadmap'], ['Partners', '/partners'], ['FAQ', '/faq']];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return   <header className="sticky top-0 z-20 border-b border-teal/10 bg-warm/95 backdrop-blur"><Container className="flex h-20 items-center justify-between"><Link to="/" className="font-display text-3xl font-semibold tracking-tight text-teal">kaya<span className="text-forest">.</span></Link><nav className="hidden items-center gap-7 md:flex">{links.map(([label, to]) => <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-semibold ${isActive ? 'text-forest' : 'text-ink/70 hover:text-teal'}`}>{label}</NavLink>)}<Button to="/book-demo" className="ml-2">Book a Demo <ArrowUpRight size={16} className="ml-2" /></Button></nav><button onClick={() => setOpen(!open)} className="rounded-full p-2 text-teal focus:outline-none focus:ring-4 focus:ring-mint md:hidden" aria-label="Toggle navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button></Container>{open && <div className="border-t border-teal/10 bg-warm px-5 py-5 md:hidden"><div className="flex flex-col gap-5">{links.map(([label, to]) => <Link onClick={() => setOpen(false)} key={to} to={to} className="font-semibold">{label}</Link>)}<Link onClick={() => setOpen(false)} to="/vision-mission" className="font-semibold">Vision & Mission</Link><Button to="/book-demo" onClick={() => setOpen(false)}>Book a Demo</Button></div></div>}</header>;
}

export function Footer() {
  return <footer className="bg-teal py-14 text-white"><Container><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"><div><div className="font-display text-3xl">kaya<span className="text-mint">.</span></div><p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">Healthier people. Stronger workplaces.</p></div><div><p className="mb-4 text-xs font-bold uppercase tracking-widest text-mint">Explore</p><div className="flex flex-col gap-3 text-sm text-white/70"><Link to="/about">About Kaya</Link><Link to="/vision-mission">Vision & Mission</Link><Link to="/approach">Our Approach</Link><Link to="/roadmap">Our Roadmap</Link><Link to="/partners">Founding Partners</Link><Link to="/faq">FAQ</Link></div></div><div><p className="mb-4 text-xs font-bold uppercase tracking-widest text-mint">Start a conversation</p><p className="text-sm text-white/70">teamkayasupport@gmail.com</p><Link to="/reserve-pilot" className="mt-3 block text-sm font-semibold !text-mint hover:!text-white">Join the Founding Partner Programme →</Link><p className="mt-2 text-sm text-white/70">Hyderabad · Working globally</p></div><div><p className="mb-4 text-xs font-bold uppercase tracking-widest text-mint">Legal</p><div className="flex flex-col gap-3 text-sm text-white/70"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms & Conditions</Link><Link to="/contact">Contact</Link></div></div></div><div className="mt-14 border-t border-white/15 pt-5 text-xs text-white/40">© 2026 Kaya Wellbeing. Designed for the everyday.</div></Container></footer>;
}

export function Layout({ children }) { return <><Navbar /><main>{children}</main><Footer /></>; }
