# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for the ExpandHealth marketing website.

## Prerequisites

- Sanity account ([sign up here](https://www.sanity.io/))
- Node.js installed
- This repository cloned

## Step 1: Create a Sanity Project

### Option A: Use Existing Project
If you already have a Sanity project you want to use:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Note your project ID

### Option B: Create New Project
```bash
cd studio
npx sanity@latest init
# Follow the prompts to create a new project
```

## Step 2: Configure Your Project

1. Edit `studio/sanity.config.js`:
   ```javascript
   projectId: 'YOUR_PROJECT_ID_HERE', // Replace this
   dataset: 'production',
   ```

2. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your Sanity credentials:
   ```env
   SANITY_PROJECT_ID=your-actual-project-id
   SANITY_DATASET=production
   SANITY_TOKEN=your-read-token (optional for public read)
   ```

## Step 3: Get Your API Token (Optional)

For public read access, you don't need a token. For authenticated requests:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API → Tokens
4. Create a new token with "Read" permissions
5. Copy the token to your `.env` file

## Step 4: Configure CORS

Allow your website to access Sanity:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API → CORS Origins
4. Add your domains:
   - `http://localhost:3001` (for local development)
   - `https://expandhealth-production.up.railway.app` (your Railway URL)
   - Your custom domain when ready

## Step 5: Start Sanity Studio

```bash
cd studio
npm install  # if you haven't already
npm run dev
```

Studio will be available at [http://localhost:3333](http://localhost:3333)

## Step 6: Add Initial Content

### Required: Site Settings
1. Open Sanity Studio
2. Create a "Site Settings" document
3. Fill in:
   - Site Title: "Expand Health AI"
   - Calendly URL: `https://calendly.com/emilian_popa/expand-health`
   - Company Information
   - Hero Section content

### Add Team Members
1. Create "Team Member" documents
2. Upload photos
3. Set display order (0, 1, 2, etc.)

### Add Pilot Customers
1. Create "Pilot Customer" documents
2. Upload logos
3. Set display order

### Add Clinics
1. Create "Clinic Location" documents
2. Upload clinic images
3. Set display order

## Step 7: Test the Integration

1. Start your Express server:
   ```bash
   npm start
   ```

2. Test API endpoints:
   - http://localhost:3001/api/content/settings
   - http://localhost:3001/api/content/team
   - http://localhost:3001/api/content/customers
   - http://localhost:3001/api/content/clinics

3. You should see JSON responses with your Sanity content

## Step 8: Update Frontend (Optional)

The current HTML is static. To make it dynamic, you can:
- Use server-side rendering (EJS templates)
- Use client-side JavaScript to fetch from API
- Keep it static and only update via Sanity when needed

For now, content is available via API endpoints but the HTML is still static.

## Deploying Sanity Studio

To host your Studio on Sanity's servers:

```bash
cd studio
npm run build
npx sanity deploy
```

This will give you a URL like `https://your-project.sanity.studio`

## Troubleshooting

### CORS Errors
- Make sure your domain is added to CORS origins in Sanity project settings

### 401 Unauthorized
- Check your `SANITY_TOKEN` in `.env`
- Verify the token has correct permissions

### No Data Returned
- Make sure you've created and published documents in Sanity Studio
- Check that documents have `active: true`

## Next Steps

1. Migrate existing content from HTML to Sanity
2. Update frontend to fetch from Sanity API
3. Set up webhooks for automatic redeployment when content changes
4. Add more content types as needed (blog posts, testimonials, etc.)

## Need Help?

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
- [Sanity MCP Tools](https://github.com/sanity-io/mcp-server-sanity)
