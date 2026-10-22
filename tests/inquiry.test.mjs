import test from 'node:test';
import assert from 'node:assert/strict';
import { buildInquiry } from '../public/app.js';

test('rental inquiry includes the requested date, period, location and quantity', () => {
  const inquiry = buildInquiry({
    service: 'rental',
    location: '  Wrocław,   Polska  ',
    quantity: '2',
    start: '2026-11-03',
    duration: '1–2 tygodnie',
  });
  assert.match(inquiry.subject, /^Wynajem nagrzewnicy MASTER BV-691S — Wrocław, Polska$/);
  assert.match(inquiry.body, /Lokalizacja realizacji: Wrocław, Polska/);
  assert.match(inquiry.body, /Liczba nagrzewnic: 2/);
  assert.match(inquiry.body, /Planowany początek wynajmu: 03\.11\.2026/);
  assert.match(inquiry.body, /Planowany okres wynajmu: 1–2 tygodnie/);
});

test('sale inquiry requests a purchase and excludes stale rental dates', () => {
  const inquiry = buildInquiry({
    service: 'sale',
    location: 'Opole',
    quantity: 1,
    start: '2026-11-03',
    duration: 'Kilka dni',
  });
  assert.match(inquiry.subject, /^Zakup nagrzewnicy/);
  assert.match(inquiry.body, /ofertę zakupu/);
  assert.doesNotMatch(inquiry.body, /Planowany początek wynajmu|Planowany okres wynajmu|03\.11\.2026|Kilka dni/);
});

test('user details and multiline notes survive without introducing subject line breaks', () => {
  const inquiry = buildInquiry({
    location: 'Łódź\r\nhala A',
    quantity: 3,
    application: 'Hala namiotowa',
    dimensions: '  20 × 30 × 5 m  ',
    message: 'Bramy otwierane co godzinę.\r\nTemperatura: +15°C.\rProszę o kontakt.',
  });
  assert.match(inquiry.subject, /Łódź hala A$/);
  assert.doesNotMatch(inquiry.subject, /[\r\n]/);
  assert.match(inquiry.body, /Zastosowanie: Hala namiotowa/);
  assert.match(inquiry.body, /Obiekt \/ wymiary: 20 × 30 × 5 m/);
  assert.ok(inquiry.body.includes('Bramy otwierane co godzinę.\nTemperatura: +15°C.\nProszę o kontakt.'));
  assert.doesNotMatch(inquiry.body, /\r/);
});

test('optional fields can be omitted and the supported model spelling is normalized', () => {
  const inquiry = buildInquiry({ location: 'Poznań', model: 'master_bv-691_s' });
  assert.match(inquiry.subject, /^Wynajem nagrzewnicy MASTER BV-691S — Poznań$/);
  assert.match(inquiry.body, /Liczba nagrzewnic: 1/);
  assert.match(inquiry.body, /Planowany początek wynajmu: do uzgodnienia/);
  assert.match(inquiry.body, /Planowany okres wynajmu: do uzgodnienia/);
  assert.doesNotMatch(inquiry.body, /\bundefined\b|\bnull\b/);
  assert.match(buildInquiry({ location: 'Poznań', quantity: 99 }).body, /Liczba nagrzewnic: 99/);
});

test('empty and whitespace-only locations cannot produce an inquiry', () => {
  for (const location of [undefined, null, '', '   ', '\n\t']) {
    assert.throws(() => buildInquiry({ location }), TypeError);
  }
});

test('invalid quantities are rejected instead of sending an unusable request', () => {
  for (const quantity of [0, -1, 100, 1.5, 'abc', '', Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.throws(() => buildInquiry({ location: 'Wrocław', quantity }), RangeError);
  }
});
