# Expand Health IO - Marketing Website

This is the marketing website for Expand Health, accessible at **expandhealth.io**.

## ⚠️ Separate from Main Application

This marketing site is **completely separate** from the main Expand Health AI application (located in `demo/expand-health/v2/`). It serves as a landing page and documentation portal only.

## Structure

```
expandhealthio/
├── public/
│   ├── index.html           # Landing page
│   ├── css/
│   │   └── landing.css      # Styles
│   └── images/              # All marketing images
│       ├── logos/           # Customer logos
│       ├── team/            # Team photos
│       └── clinics/         # Clinic photos
├── server.js                # Minimal Express server
├── package.json             # Dependencies
└── railway.toml             # Railway deployment config
```

## Features

- 🎨 **Landing Page**: Marketing site with:
  - Infinite scrolling customer carousel
  - Problem showcase with doctor image
  - Solution showcase with tablet mockup
  - About section with founders photo
  - Team profiles
  - Clinic locations

- 🔒 **Password-Protected Documentation**: `/docs` route requires basic auth

## Tech Stack

- **Backend**: Node.js, Express.js (static file serving only)
- **Frontend**: Vanilla HTML/CSS with responsive design
- **Deployment**: Railway (separate service from main app)

## Environment Variables

```env
NODE_ENV=production
DOCS_USERNAME=admin
DOCS_PASSWORD=your-secure-password
PORT=3001
```

## Local Development

```bash
cd expandhealthio
npm install
node server.js
# Visit http://localhost:3001
```

## Deployment

This folder is deployed separately to Railway:

**Project**: `expandhealthio-website`
**Branch**: `marketing`
**Root Directory**: `expandhealthio`
**Domain**: https://expandhealth.io

### Railway Configuration

1. Set root directory to `expandhealthio`
2. Set branch to `marketing`
3. Configure environment variables
4. Railway will auto-deploy on push

## Health Check

```bash
curl https://expandhealth.io/api/health
```

## Documentation Access

```bash
# Documentation is password-protected
https://expandhealth.io/docs/
# Username: admin
# Password: (set via DOCS_PASSWORD env var)
```

## Important Notes

- This is a **static marketing site** - no database, no user accounts, no PHI
- Do NOT add application logic here - keep it minimal
- For the main application, see `demo/expand-health/v2/`
