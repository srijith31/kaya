# Kaya API

Base URL: `https://<api-host>/api`

## Public booking endpoints

### `POST /bookings/demo`

Accepts `fullName`, `companyName`, `businessEmail` (any valid email address), optional `phone`, `industry` (Services, Sales, Telecom, Business Consultancy, Education, Healthcare, or Other), `employeeCount`, `preferredDate` (`YYYY-MM-DD`), `preferredTime` (`morning`, `afternoon`, `late-afternoon`), and optional `message`.

### `POST /bookings/pilot`

Accepts `contactName`, `companyName`, `businessEmail` (any valid email address), `phone`, `industry` (Services, Sales, Telecom, Business Consultancy, Education, Healthcare, or Other), `companyLocation`, `employeeCount`, `expectedParticipants` (20–50), `preferredStartDate`, `requirements`, and `consentToContact: true`.

Successful writes return `201` and a generated booking reference. Database failures return an error; no success response is emitted.

## Admin endpoints

First call `POST /admin/login` with `{ "email": "...", "password": "..." }`. Send the returned token as `Authorization: Bearer <token>`.

- `GET /admin/summary`
- `GET /admin/bookings/demo`
- `GET /admin/bookings/pilot`
- `GET /admin/bookings/:type/:reference`
- `PATCH /admin/bookings/:type/:reference` with `status` and/or `internalNotes`
- `GET /admin/bookings/:type/export`

Admin list and detail responses are never available without authentication. The CSV export intentionally includes only operational fields.
