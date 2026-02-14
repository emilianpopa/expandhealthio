/**
 * Content API Routes
 * Endpoints to fetch content from Sanity
 */

const express = require('express');
const router = express.Router();
const {
  getTeamMembers,
  getCustomers,
  getClinics,
  getSiteSettings,
  getPageContent,
} = require('../lib/sanity');

// Cache duration (5 minutes in production, 0 in development)
const CACHE_DURATION = process.env.NODE_ENV === 'production' ? 300 : 0;

/**
 * GET /api/content/team
 * Fetch all team members
 */
router.get('/team', async (req, res) => {
  try {
    const team = await getTeamMembers();
    res.set('Cache-Control', `public, max-age=${CACHE_DURATION}`);
    res.json({ success: true, data: team });
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch team members' });
  }
});

/**
 * GET /api/content/customers
 * Fetch all pilot customers
 */
router.get('/customers', async (req, res) => {
  try {
    const customers = await getCustomers();
    res.set('Cache-Control', `public, max-age=${CACHE_DURATION}`);
    res.json({ success: true, data: customers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch customers' });
  }
});

/**
 * GET /api/content/clinics
 * Fetch all clinics
 */
router.get('/clinics', async (req, res) => {
  try {
    const clinics = await getClinics();
    res.set('Cache-Control', `public, max-age=${CACHE_DURATION}`);
    res.json({ success: true, data: clinics });
  } catch (error) {
    console.error('Error fetching clinics:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch clinics' });
  }
});

/**
 * GET /api/content/settings
 * Fetch site settings
 */
router.get('/settings', async (req, res) => {
  try {
    const settings = await getSiteSettings();
    res.set('Cache-Control', `public, max-age=${CACHE_DURATION}`);
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch settings' });
  }
});

/**
 * GET /api/content/page
 * Fetch page content
 */
router.get('/page', async (req, res) => {
  try {
    const page = await getPageContent();
    res.set('Cache-Control', `public, max-age=${CACHE_DURATION}`);
    res.json({ success: true, data: page });
  } catch (error) {
    console.error('Error fetching page content:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch page content' });
  }
});

/**
 * GET /api/content/all
 * Fetch all content at once (for initial page load)
 */
router.get('/all', async (req, res) => {
  try {
    const [team, customers, clinics, settings, page] = await Promise.all([
      getTeamMembers(),
      getCustomers(),
      getClinics(),
      getSiteSettings(),
      getPageContent(),
    ]);

    res.set('Cache-Control', `public, max-age=${CACHE_DURATION}`);
    res.json({
      success: true,
      data: {
        team,
        customers,
        clinics,
        settings,
        page,
      },
    });
  } catch (error) {
    console.error('Error fetching all content:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch content' });
  }
});

module.exports = router;
