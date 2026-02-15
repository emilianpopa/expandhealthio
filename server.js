/**
 * ExpandHealth Marketing Site - Minimal Server
 * Serves landing page and password-protected documentation only
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');
const contentRoutes = require('./api/content');
const { getSEOSettings, getSiteSettings } = require('./lib/sanity');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Docs authentication middleware
const docsAuth = basicAuth({
  users: {
    [process.env.DOCS_USERNAME || 'admin']: process.env.DOCS_PASSWORD || 'expandhealth2025'
  },
  challenge: true,
  realm: 'ExpandHealth Documentation'
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Content API routes
app.use('/api/content', contentRoutes);

// Serve landing page at root with server-side rendering
app.get('/', async (req, res) => {
  try {
    // Fetch SEO settings and site settings from Sanity
    const [seoSettings, siteSettings] = await Promise.all([
      getSEOSettings(),
      getSiteSettings(),
    ]);

    const currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    // Set cache headers (5 minutes in production)
    const cacheMaxAge = process.env.NODE_ENV === 'production' ? 300 : 0;
    res.set('Cache-Control', `public, max-age=${cacheMaxAge}`);

    // Render EJS template with SEO data
    res.render('index', {
      seo: seoSettings || {},
      site: siteSettings || {},
      currentUrl: currentUrl,
    });
  } catch (error) {
    console.error('Error fetching SEO content:', error);
    // Fallback to static HTML if Sanity is unavailable
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

// Password-protected docs
app.use('/docs', docsAuth, express.static(path.join(__dirname, 'public', 'docs')));

// Static assets (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal server error');
});

// Start server
app.listen(PORT, () => {
  console.log(`[INFO] ExpandHealth Marketing Site running on port ${PORT}`);
  console.log(`[INFO] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[INFO] Landing page: http://localhost:${PORT}/`);
  console.log(`[INFO] Documentation: http://localhost:${PORT}/docs/`);
});
