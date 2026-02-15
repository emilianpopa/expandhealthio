import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'seoSettings',
  title: 'SEO & Meta Tags',
  type: 'document',
  icon: CogIcon,
  // __experimental_singleton: true, // Uncomment in Sanity v3+ to ensure only one document

  groups: [
    {name: 'basic', title: '📄 Basic Meta Tags', default: true},
    {name: 'social', title: '📱 Social Media'},
    {name: 'technical', title: '⚙️ Technical SEO'},
    {name: 'analytics', title: '📊 Analytics'},
  ],

  fields: [
    // ========================================
    // BASIC META TAGS GROUP
    // ========================================
    defineField({
      name: 'metaTitle',
      title: 'Page Title',
      type: 'string',
      description:
        '🎯 This appears in browser tabs and Google search results (50-60 characters recommended)',
      validation: (Rule) =>
        Rule.required().max(60).warning('Keep under 60 characters for best SEO'),
      group: 'basic',
    }),

    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        '📝 Brief summary shown in search results (150-160 characters recommended)',
      validation: (Rule) =>
        Rule.required().max(160).warning('Keep under 160 characters for best results'),
      group: 'basic',
    }),

    defineField({
      name: 'metaKeywords',
      title: 'Keywords (Optional)',
      type: 'array',
      of: [{type: 'string'}],
      description:
        '🔑 Main topics/keywords for your page (e.g., "AI healthcare", "medical practice management")',
      group: 'basic',
    }),

    // ========================================
    // SOCIAL MEDIA GROUP
    // ========================================
    defineField({
      name: 'ogTitle',
      title: 'Social Media Title',
      type: 'string',
      description: '📱 Title when shared on Facebook, LinkedIn (leave blank to use Page Title)',
      validation: (Rule) => Rule.max(60),
      group: 'social',
    }),

    defineField({
      name: 'ogDescription',
      title: 'Social Media Description',
      type: 'text',
      rows: 2,
      description:
        '📝 Description for social media shares (leave blank to use Meta Description)',
      validation: (Rule) => Rule.max(160),
      group: 'social',
    }),

    defineField({
      name: 'ogImage',
      title: 'Social Media Preview Image',
      type: 'image',
      description: '🖼️ Image shown when sharing on social media (1200x630px recommended)',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Image Description',
          description: 'Describe this image for accessibility',
        }),
      ],
      group: 'social',
    }),

    defineField({
      name: 'twitterCardType',
      title: 'Twitter Card Style',
      type: 'string',
      description: '🐦 How your link appears on Twitter/X',
      options: {
        list: [
          {title: 'Summary (small image)', value: 'summary'},
          {title: 'Large Image Card (recommended)', value: 'summary_large_image'},
        ],
      },
      initialValue: 'summary_large_image',
      group: 'social',
    }),

    defineField({
      name: 'twitterHandle',
      title: 'Twitter Username',
      type: 'string',
      description: '🐦 Your Twitter/X handle (e.g., @expandhealth)',
      validation: (Rule) =>
        Rule.regex(/^@?[A-Za-z0-9_]+$/, {
          name: 'twitter handle',
          invert: false,
        }).warning('Must be a valid Twitter handle (e.g., @expandhealth)'),
      group: 'social',
    }),

    // ========================================
    // TECHNICAL SEO GROUP
    // ========================================
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: '🔗 The main URL for this page (usually https://www.expandhealth.io/)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['https'],
        }),
      group: 'technical',
    }),

    defineField({
      name: 'structuredData',
      title: 'Business Information',
      type: 'object',
      description: '🏢 Helps Google understand your business (for rich search results)',
      group: 'technical',
      fields: [
        defineField({
          name: 'organizationName',
          title: 'Company Name',
          type: 'string',
          initialValue: 'Expand Health',
        }),
        defineField({
          name: 'legalName',
          title: 'Legal Name',
          type: 'string',
          initialValue: 'Expand Health Limited',
        }),
        defineField({
          name: 'foundingDate',
          title: 'Founded Date',
          type: 'date',
          description: 'When was the company founded?',
        }),
        defineField({
          name: 'address',
          title: 'Business Address',
          type: 'object',
          fields: [
            {name: 'street', title: 'Street Address', type: 'string'},
            {name: 'city', title: 'City', type: 'string'},
            {name: 'postalCode', title: 'Postal Code', type: 'string'},
            {name: 'country', title: 'Country', type: 'string'},
          ],
        }),
        defineField({
          name: 'contactPoint',
          title: 'Contact Information',
          type: 'object',
          fields: [
            {name: 'telephone', title: 'Phone Number', type: 'string'},
            {name: 'email', title: 'Email', type: 'string'},
            {
              name: 'contactType',
              title: 'Contact Type',
              type: 'string',
              initialValue: 'customer support',
            },
          ],
        }),
        defineField({
          name: 'sameAs',
          title: 'Social Media Profiles',
          type: 'array',
          description: 'Links to your official social media pages and profiles',
          of: [{type: 'url'}],
        }),
      ],
    }),

    defineField({
      name: 'robotsSettings',
      title: 'Search Engine Instructions',
      type: 'object',
      description: '🤖 Control how search engines index your site',
      group: 'technical',
      fields: [
        defineField({
          name: 'index',
          title: 'Allow Indexing',
          type: 'boolean',
          description:
            '✅ Let Google and other search engines list this page in search results',
          initialValue: true,
        }),
        defineField({
          name: 'follow',
          title: 'Follow Links',
          type: 'boolean',
          description: '🔗 Allow search engines to follow links on this page',
          initialValue: true,
        }),
      ],
    }),

    defineField({
      name: 'additionalMetaTags',
      title: 'Additional Meta Tags (Advanced)',
      type: 'array',
      description: '⚡ Add custom meta tags if needed (for advanced users)',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Tag Name', type: 'string'},
            {name: 'content', title: 'Content', type: 'string'},
          ],
          preview: {
            select: {
              name: 'name',
              content: 'content',
            },
            prepare({name, content}) {
              return {
                title: name || 'Unnamed tag',
                subtitle: content || 'No content',
              }
            },
          },
        },
      ],
      group: 'technical',
    }),

    // ========================================
    // ANALYTICS GROUP
    // ========================================
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      description: '📊 Your GA4 Measurement ID (e.g., G-XXXXXXXXXX)',
      validation: (Rule) =>
        Rule.regex(/^(G-|UA-)?[A-Z0-9-]+$/, {
          name: 'GA ID',
          invert: false,
        }).warning('Should be in format: G-XXXXXXXXXX or UA-XXXXXXXXX'),
      group: 'analytics',
    }),

    defineField({
      name: 'googleTagManagerId',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: '🏷️ Your GTM container ID (e.g., GTM-XXXXXXX)',
      validation: (Rule) =>
        Rule.regex(/^GTM-[A-Z0-9]+$/, {
          name: 'GTM ID',
          invert: false,
        }).warning('Should be in format: GTM-XXXXXXX'),
      group: 'analytics',
    }),

    defineField({
      name: 'facebookPixelId',
      title: 'Facebook Pixel ID',
      type: 'string',
      description: '📘 For Facebook ad tracking (optional)',
      group: 'analytics',
    }),

    defineField({
      name: 'linkedInPartnerId',
      title: 'LinkedIn Insight Tag',
      type: 'string',
      description: '💼 For LinkedIn ad tracking (optional)',
      group: 'analytics',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'SEO Settings',
        subtitle: 'Manage meta tags, social sharing, and analytics',
      }
    },
  },
})
