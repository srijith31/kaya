# Kaya deployment guide

## Frontend

1. Set `VITE_API_URL` to the deployed HTTPS API base, for example `https://api.example.com/api`.
2. Run `npm ci` and `npm run build`.
3. Deploy `dist/` to a static host with SPA fallback to `index.html`.
4. Configure HTTPS and a strict Content Security Policy at the hosting layer.

## Backend

1. Deploy `backend/` on a Node.js host.
2. Run `npm ci --omit=dev` and `npm start`.
3. Configure all variables in [backend/.env.example](../backend/.env.example) through the host’s secret manager.
4. Set `CLIENT_URL` to the exact HTTPS frontend origin. Do not use `*`.
5. Set a long random `ADMIN_TOKEN_SECRET`, an `ADMIN_PASSWORD_HASH`, and a separate `ADMIN_EMAIL`.
6. Put the API behind HTTPS termination and a reverse proxy with request logging.
7. Expose `/health` to the platform health checker, but do not expose admin data routes without the bearer token.

## MongoDB Atlas

- Create a dedicated least-privilege application database user.
- Allow only the backend’s egress IPs in the Atlas network access list.
- Enable automated backups and point-in-time recovery according to the chosen Atlas tier.
- Enable Atlas monitoring and alerts for connection failures, storage, and query latency.
- Do not put the connection string in source control or frontend variables.

## Operations

Use structured platform logs and alert on repeated 5xx responses, failed database connections, rate-limit spikes, and email delivery failures. Rotate admin secrets and database credentials on a defined schedule. For an incident: disable affected credentials, preserve logs, identify impacted records, notify stakeholders, restore from the latest verified backup if needed, and document the timeline and remediation.
