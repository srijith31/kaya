# Kaya bookings API

This is the separate Express/Mongoose backend for Kaya’s demo and corporate pilot enquiry workflows. It does not store employee health information and does not expose customer details through the list endpoints.

## Setup

```bash
cd backend
cp .env.example .env
npm install
npm start
```

Set `MONGODB_URI` to a MongoDB Atlas connection string in `.env`. Never commit `.env` or share its contents. `CLIENT_URL` may contain a comma-separated allowlist of frontend origins.

For local API testing, use `curl`, Postman, or another API client against `http://localhost:4000`. The server intentionally refuses to start when `MONGODB_URI` is missing in production mode. With `NODE_ENV=development`, the health endpoint can be inspected before connecting, but booking writes still require a live MongoDB connection.

Email delivery is optional. Configure `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, and `EMAIL_FROM` before enabling delivery. New registration notifications are sent to `teamkayasupport@gmail.com` by default; set `EMAIL_FOUNDER` to override that recipient. Email failures are logged and do not roll back a successful database write.

For Gmail/Google Workspace SMTP, use an app password rather than your normal account password:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your-sending-account@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
EMAIL_FROM=your-sending-account@gmail.com
EMAIL_FOUNDER=teamkayasupport@gmail.com
```

The sending account must have 2-Step Verification enabled before an app password can be created. Keep these values only in the backend deployment secret manager or an uncommitted `backend/.env` file.

## Endpoints

- `GET /health`
- `POST /api/bookings/demo`
- `POST /api/bookings/pilot`
- `GET /api/bookings/demo`
- `GET /api/bookings/pilot`

The list endpoints intentionally return only booking reference, status, and timestamp. They are not an admin API and should be protected behind authentication before production use. They do not return names, emails, phone numbers, company details, or requirements.
The admin UI uses `POST /api/admin/login` to obtain a short-lived signed token. All admin routes require `Authorization: Bearer <token>`. The older booking list paths also require this token.

## Admin endpoints

- `POST /api/admin/login`
- `GET /api/admin/summary`
- `GET /api/admin/bookings/:type`
- `GET /api/admin/bookings/:type/:reference`
- `PATCH /api/admin/bookings/:type/:reference`
- `GET /api/admin/bookings/:type/export`

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `ADMIN_TOKEN_SECRET`. Generate a password hash with Node’s `crypto.scryptSync`; do not put a plaintext password in `.env`. A hash has the format `salt$hexDigest`.

The frontend reads `VITE_API_URL` from its own `.env` file. For local development use `http://localhost:4000/api`; for deployment use the HTTPS API origin.

## Example request

```json
{
  "fullName": "Asha Rao",
  "companyName": "Example Co",
  "email": "asha@example.com",
  "industry": "Services",
  "employeeCount": 120,
  "preferredDate": "2026-12-01",
  "preferredTime": "morning"
}
```

The API generates a reference only after MongoDB successfully saves the booking. Confirmation email is attempted through the service layer only when SMTP configuration is complete.

## Example pilot request

```json
{
  "contactName": "Ravi Kumar",
  "companyName": "Example Co",
  "email": "ravi@example.com",
  "phone": "+91 9876543210",
  "industry": "Services",
  "companyLocation": "Hyderabad",
  "employeeCount": 120,
  "expectedParticipants": 30,
  "preferredStartDate": "2026-12-01",
  "requirements": "We want to build healthier everyday routines.",
  "consentToContact": true
}
```

Admin list requests require `Authorization: Bearer <token>`. Public booking routes do not return booking data without authentication.
