# ExpandHealth Sanity Studio

This is the Sanity Studio for managing content on the ExpandHealth marketing website.

## Setup

### 1. Install Dependencies (if not already done)

```bash
cd studio
npm install
```

### 2. Configure Your Sanity Project

Edit `sanity.config.js` and replace `'your-project-id'` with your actual Sanity project ID.

You can find your project ID by:
- Going to [sanity.io/manage](https://sanity.io/manage)
- Selecting your project
- The project ID is in the URL and project settings

### 3. Start the Studio

```bash
npm run dev
```

This will start Sanity Studio at [http://localhost:3333](http://localhost:3333)

## Content Types

The studio manages four main content types:

### 1. **Team Members**
Manage your team profiles displayed in the About section.
- Name
- Role
- Bio
- Photo
- Display Order
- Active/Inactive toggle

### 2. **Pilot Customers**
Manage customer logos displayed in the trusted-by carousel.
- Customer Name
- Location
- Logo
- Display Order
- Active/Inactive toggle

### 3. **Clinic Locations**
Manage clinic photos and information.
- Clinic Name
- Location
- Image
- Display Order
- Active/Inactive toggle

### 4. **Site Settings**
Global site configuration (singleton - only one document).
- Site Title & Description
- Calendly URL
- Company Information
- Hero Section Content

## Deployment

To deploy the studio to Sanity's hosted platform:

```bash
npm run build
sanity deploy
```

## API Integration

The marketing website fetches content from Sanity via API routes:
- `/api/content/team` - Team members
- `/api/content/customers` - Pilot customers
- `/api/content/clinics` - Clinic locations
- `/api/content/settings` - Site settings
- `/api/content/all` - All content at once

## Environment Variables

Make sure to set these in your `.env` file:

```env
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_TOKEN=your-read-token
```

## CORS Configuration

If you encounter CORS issues, add your domain to the CORS origins in Sanity:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API settings
4. Add your domain (e.g., `https://expandhealth-production.up.railway.app`)
