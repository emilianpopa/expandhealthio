/**
 * Sanity Client Configuration
 * Connects to Sanity backend to fetch content
 */

const { createClient } = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'rtt3hnlz',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for faster response
  token: process.env.SANITY_TOKEN, // Optional: for authenticated requests
});

// Image URL builder helper
const builder = imageUrlBuilder(client);

/**
 * Generate image URL from Sanity image object
 * @param {Object} source - Sanity image object
 * @returns {string} - Image URL
 */
function urlFor(source) {
  return builder.image(source);
}

/**
 * Fetch all active team members
 */
async function getTeamMembers() {
  const query = `*[_type == "teamMember" && active == true] | order(order asc) {
    _id,
    name,
    role,
    bio,
    "photoUrl": photo.asset->url,
    order
  }`;
  return await client.fetch(query);
}

/**
 * Fetch all active pilot customers
 */
async function getCustomers() {
  const query = `*[_type == "customer" && active == true] | order(order asc) {
    _id,
    name,
    location,
    "logoUrl": logo.asset->url,
    order
  }`;
  return await client.fetch(query);
}

/**
 * Fetch all active clinics
 */
async function getClinics() {
  const query = `*[_type == "clinic" && active == true] | order(order asc) {
    _id,
    name,
    location,
    "imageUrl": image.asset->url,
    order
  }`;
  return await client.fetch(query);
}

/**
 * Fetch site settings
 */
async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    title,
    description,
    calendlyUrl,
    companyInfo,
    heroSection {
      badge,
      title,
      description,
      "imageUrl": image.asset->url
    }
  }`;
  return await client.fetch(query);
}

module.exports = {
  client,
  urlFor,
  getTeamMembers,
  getCustomers,
  getClinics,
  getSiteSettings,
};
