import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export async function submitDemoRequest(payload) {
  const { data } = await api.post('/bookings/demo', {
    ...payload,
    industry: payload.industry,
    preferredTime: payload.timeSlot.includes('Morning') ? 'morning' : payload.timeSlot.includes('Afternoon') && !payload.timeSlot.includes('Late') ? 'afternoon' : 'late-afternoon',
    preferredDate: payload.demoDate,
  });
  return data.booking;
}

export async function submitPilotRequest(payload) {
  const { data } = await api.post('/bookings/pilot', {
    ...payload,
    industry: payload.industry,
    phone: payload.contactNumber,
    companyLocation: payload.location,
    expectedParticipants: Number.parseInt(payload.participants, 10),
    preferredStartDate: payload.pilotStartDate,
    consentToContact: payload.agreement,
  });
  return data.booking;
}

export function getApiError(error) {
  if (!error.response) return 'We could not reach Kaya right now. Please check your connection and try again.';
  return error.response.data?.error || 'We could not submit your request. Please review the form and try again.';
}

export async function adminLogin(email, password) {
  const { data } = await api.post('/admin/login', { email, password });
  return data;
}

export function adminApi(token) {
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  return {
    summary: () => api.get('/admin/summary', auth).then(response => response.data),
    list: (type, params = {}) => api.get(`/admin/bookings/${type}`, { ...auth, params }).then(response => response.data),
    detail: (type, reference) => api.get(`/admin/bookings/${type}/${reference}`, auth).then(response => response.data),
    update: (type, reference, body) => api.patch(`/admin/bookings/${type}/${reference}`, body, auth).then(response => response.data),
    exportUrl: type => `${api.defaults.baseURL}/admin/bookings/${type}/export`,
    auth,
  };
}
