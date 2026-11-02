export const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export const isValidPhone = value => /^[+]?[0-9\s().-]{7,20}$/.test(value.trim());
const isFutureOrToday = value => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const selected = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !Number.isNaN(selected.getTime()) && selected >= today;
};

export function validateBooking(form, type) {
  const errors = {};
  const required = type === 'demo'
    ? ['fullName', 'companyName', 'businessEmail', 'industry', 'employeeCount', 'demoDate', 'timeSlot']
    : ['contactName', 'companyName', 'businessEmail', 'contactNumber', 'industry', 'location', 'employeeCount', 'participants', 'pilotStartDate', 'requirements'];
  required.forEach(key => { if (!form[key]?.trim()) errors[key] = 'This field is required.'; });
  if (form.businessEmail && !isValidEmail(form.businessEmail)) errors.businessEmail = 'Enter a valid email address.';
  if (type === 'demo' && form.phone && !isValidPhone(form.phone)) errors.phone = 'Enter a valid phone number.';
  if (type === 'demo' && form.demoDate && !isFutureOrToday(form.demoDate)) errors.demoDate = 'Choose today or a future date.';
  if (type === 'pilot' && form.contactNumber && !isValidPhone(form.contactNumber)) errors.contactNumber = 'Enter a valid contact number.';
  if (type === 'pilot' && form.pilotStartDate && !isFutureOrToday(form.pilotStartDate)) errors.pilotStartDate = 'Choose today or a future date.';
  if (type === 'pilot' && !form.agreement) errors.agreement = 'Please confirm that Kaya may contact you about the pilot.';
  return errors;
}
