import React from 'react';
import { Link } from 'react-router-dom';

export const Container = ({ children, className = '' }) => <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;

export const Button = ({ children, to, variant = 'primary', className = '', onClick, type = 'button' }) => {
  const styles = variant === 'primary' ? 'bg-teal !text-white hover:bg-forest' : 'border border-teal/20 !text-teal hover:bg-mint';
  const classes = `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-mint ${styles} ${className}`;
  return to ? <Link to={to} onClick={onClick} className={classes}>{children}</Link> : <button type={type} onClick={onClick} className={classes}>{children}</button>;
};

export const SectionHeading = ({ eyebrow, title, children, light = false }) => <div className={light ? 'text-white' : ''}><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-forest">{eyebrow}</p><h2 className="max-w-3xl font-display text-4xl leading-[1.08] sm:text-5xl">{title}</h2>{children && <p className={`mt-5 max-w-xl text-lg leading-relaxed ${light ? 'text-white/70' : 'text-sage'}`}>{children}</p>}</div>;

export const Badge = ({ children }) => <span className="inline-flex items-center rounded-full border border-forest/15 bg-mint px-3 py-1 text-xs font-semibold text-forest">{children}</span>;

export const Field = ({ label, textarea = false, hint, error, required = false, ...props }) => { const errorId = props.name ? `${props.name}-error` : undefined; return <label className="block text-sm font-semibold text-ink">{label}{required ? <><span aria-hidden="true" className="ml-1 text-forest">*</span><span className="sr-only"> (required)</span></> : hint === 'optional' ? <span className="ml-2 text-xs font-normal text-sage">(optional)</span> : null}<span className="mt-2 block">{textarea ? <textarea {...props} required={required} aria-invalid={Boolean(error)} aria-describedby={errorId} className={`min-h-32 w-full rounded-2xl border bg-white px-4 py-3 font-normal outline-none transition focus:border-forest focus:ring-4 focus:ring-mint ${error ? 'border-red-400' : 'border-teal/15'}`} /> : <input {...props} required={required} aria-invalid={Boolean(error)} aria-describedby={errorId} className={`w-full rounded-2xl border bg-white px-4 py-3 font-normal outline-none transition focus:border-forest focus:ring-4 focus:ring-mint ${error ? 'border-red-400' : 'border-teal/15'}`} />}</span>{error && <span id={errorId} className="mt-1 block text-xs font-normal text-red-600">{error}</span>}</label>; };
