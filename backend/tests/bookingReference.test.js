const test = require('node:test');
const assert = require('node:assert/strict');
const { createBookingReference } = require('../utils/bookingReference');

test('creates unique, typed booking references', () => {
  const demo = createBookingReference('DEMO');
  const pilot = createBookingReference('PILOT');
  assert.match(demo, /^KAYA-DEMO-[A-F0-9]{8}$/);
  assert.match(pilot, /^KAYA-PILOT-[A-F0-9]{8}$/);
  assert.notEqual(demo, pilot);
});
