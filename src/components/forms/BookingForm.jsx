import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock3, LockKeyhole, Sparkles } from 'lucide-react';
import { Button, Field } from '../ui';
import { validateBooking } from '../../lib/validation';
import { getApiError, submitDemoRequest, submitPilotRequest } from '../../services/api';

const industryOptions = ['Services', 'Sales', 'Telecom', 'Business Consultancy', 'Education', 'Healthcare', 'Other'];
const demoInitial = { fullName: '', companyName: '', businessEmail: '', phone: '', industry: '', employeeCount: '', demoDate: '', timeSlot: '', message: '' };
const pilotInitial = { contactName: '', companyName: '', businessEmail: '', contactNumber: '', industry: '', location: 'Hyderabad', employeeCount: '', participants: '', pilotStartDate: '', requirements: '', agreement: false };
const today = new Date().toISOString().slice(0, 10);

function SelectField({ label, name, value, onChange, options, error, required = false }) {
  const errorId = `${name}-error`;
  return <label className="block text-sm font-semibold text-ink">{label}{required && <><span aria-hidden="true" className="ml-1 text-forest">*</span><span className="sr-only"> (required)</span></>}<span className="mt-2 block"><select name={name} value={value} onChange={onChange} required={required} aria-invalid={Boolean(error)} aria-describedby={errorId} className={`w-full rounded-2xl border bg-white px-4 py-3 font-normal outline-none transition focus:border-forest focus:ring-4 focus:ring-mint ${error ? 'border-red-400' : 'border-teal/15'}`}><option value="">Select an option</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select></span>{error && <span id={errorId} className="mt-1 block text-xs font-normal text-red-600">{error}</span>}</label>;
}

export function BookingForm({ type }) {
  const pilot = type === 'pilot';
  const [form, setForm] = useState(pilot ? pilotInitial : demoInitial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [reference, setReference] = useState('');
  const update = event => {
    const { name, value, type: inputType, checked } = event.target;
    setForm(current => ({ ...current, [name]: inputType === 'checkbox' ? checked : value }));
    setErrors(current => ({ ...current, [name]: '' }));
  };
  const submit = async event => {
    event.preventDefault();
    if (status === 'loading') return;
    const nextErrors = validateBooking(form, type);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStatus('loading');
    try {
      const response = pilot ? await submitPilotRequest(form) : await submitDemoRequest(form);
      setReference(response.bookingReference);
      setStatus('success');
      setForm(pilot ? pilotInitial : demoInitial);
    } catch (error) {
      setErrors({ form: getApiError(error) });
      setStatus('error');
    }
  };
  if (status === 'success') return <div className="flex min-h-[520px] flex-col items-center justify-center text-center"><span className="rounded-full bg-mint p-4 text-forest"><Check size={28} /></span><h2 className="mt-5 font-display text-3xl text-teal">Your request is confirmed for review.</h2><p className="mt-3 max-w-md text-sage">We saved your {pilot ? 'pilot reservation request' : 'demo request'}. The Kaya team will confirm next steps separately.</p><div className="mt-6 rounded-2xl bg-mint/60 px-5 py-3 text-sm font-bold tracking-wide text-forest">Reference: {reference}</div><p className="mt-4 text-xs text-sage">No calendar slot or pilot date is confirmed until the Kaya team follows up.</p></div>;
  const submitLabel = status === 'loading' ? 'Submitting request…' : pilot ? 'Join the Founding Partner Programme' : 'Submit Demo Request';
  return <form onSubmit={submit} noValidate className="space-y-5" aria-busy={status === 'loading'}>{pilot ? <><div className="grid gap-5 sm:grid-cols-2"><Field label="Contact person’s name" name="contactName" value={form.contactName} onChange={update} error={errors.contactName} required /><Field label="Company name" name="companyName" value={form.companyName} onChange={update} error={errors.companyName} required /></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Business email" name="businessEmail" type="email" value={form.businessEmail} onChange={update} error={errors.businessEmail} required /><Field label="Contact number" name="contactNumber" type="tel" value={form.contactNumber} onChange={update} error={errors.contactNumber} required /></div><div className="grid gap-5 sm:grid-cols-2"><SelectField label="Industry" name="industry" value={form.industry} onChange={update} error={errors.industry} required options={industryOptions} /><Field label="Company location" name="location" value={form.location} onChange={update} error={errors.location} required /></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Employee count" name="employeeCount" type="number" value={form.employeeCount} onChange={update} error={errors.employeeCount} placeholder="e.g. 120" required /><Field label="Expected pilot participants" name="participants" value={form.participants} onChange={update} error={errors.participants} placeholder="20–50 voluntary employees" required /></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Preferred pilot start date" name="pilotStartDate" type="date" min={today} value={form.pilotStartDate} onChange={update} error={errors.pilotStartDate} required /><Field label="Current interest or requirements" name="requirements" value={form.requirements} onChange={update} error={errors.requirements} placeholder="What would you like to explore?" required /></div><p className="rounded-2xl bg-mint/70 p-4 text-sm leading-relaxed text-forest"><strong>Proposed pilot:</strong> four weeks, 20–50 voluntary employees, initially for Hyderabad-based organisations. Registration is free and non-binding; final dates and participation are confirmed separately.</p><label className="flex gap-3 text-sm leading-relaxed text-ink"><input type="checkbox" name="agreement" checked={form.agreement} onChange={update} required aria-invalid={Boolean(errors.agreement)} className="mt-1 h-4 w-4 accent-forest" /><span>I agree that Kaya may contact me about the corporate pilot.<span aria-hidden="true" className="ml-1 text-forest">*</span><span className="sr-only"> (required)</span></span></label>{errors.agreement && <p className="text-xs text-red-600">{errors.agreement}</p>}</> : <><div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" name="fullName" value={form.fullName} onChange={update} error={errors.fullName} required /><Field label="Company name" name="companyName" value={form.companyName} onChange={update} error={errors.companyName} required /></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Business email" name="businessEmail" type="email" value={form.businessEmail} onChange={update} error={errors.businessEmail} required /><Field label="Phone number" name="phone" type="tel" value={form.phone} onChange={update} error={errors.phone} hint="optional" /></div><div className="grid gap-5 sm:grid-cols-2"><SelectField label="Industry" name="industry" value={form.industry} onChange={update} error={errors.industry} required options={industryOptions} /><Field label="Approximate employee count" name="employeeCount" type="number" value={form.employeeCount} onChange={update} error={errors.employeeCount} placeholder="e.g. 120" required /></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Preferred date" name="demoDate" type="date" min={today} value={form.demoDate} onChange={update} error={errors.demoDate} required /><SelectField label="Preferred time window" name="timeSlot" value={form.timeSlot} onChange={update} error={errors.timeSlot} required options={['Morning (9am–12pm IST)', 'Afternoon (12pm–3pm IST)', 'Late afternoon (3pm–6pm IST)']} /></div><Field label="Additional message (optional)" name="message" value={form.message} onChange={update} textarea /></>}<p className="text-xs leading-relaxed text-sage">Your preferred date and time are not confirmed until Kaya responds. See our <Link to="/privacy" className="font-semibold text-forest underline">Privacy Policy</Link>.</p><div className="flex items-center gap-3"><Button type="submit" className={status === 'loading' ? 'cursor-wait opacity-70' : ''}>{submitLabel} {status !== 'loading' && <ArrowRight size={16} className="ml-2" />}</Button>{status === 'error' && <p role="alert" className="text-sm text-red-600">We couldn’t submit this request. Please try again.</p>}</div></form>;
}

export function BookingAside({ pilot }) {
  return <div><p className="text-xs font-bold uppercase tracking-[.18em] text-forest">{pilot ? 'Founding partner programme' : 'Book a demo'}</p><h1 className="mt-5 font-display text-6xl leading-none text-teal">{pilot ? 'A small start can change a lot.' : 'Let’s make work work better.'}</h1><p className="mt-6 text-lg leading-relaxed text-sage">{pilot ? 'Share your context and interest in a four-week proposed pilot with Kaya. This expression of interest is non-binding.' : 'Choose a time to see how Kaya can support wellbeing in your workplace.'}</p><div className="mt-10 space-y-4 text-sm text-ink"><p className="flex gap-3"><Clock3 className="text-forest" size={18} />A focused, no-pressure conversation</p><p className="flex gap-3"><LockKeyhole className="text-forest" size={18} />Your details are sent securely to the Kaya API</p><p className="flex gap-3"><Sparkles className="text-forest" size={18} />Clear next steps, confirmed separately</p></div></div>;
}
