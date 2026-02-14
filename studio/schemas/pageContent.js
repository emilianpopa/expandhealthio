import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal reference (e.g., "Homepage")',
      validation: (rule) => rule.required(),
    }),

    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          description: 'Small badge above the title (e.g., "AI for Smarter, Personalised Healthcare")',
        }),
        defineField({
          name: 'badgeIcon',
          title: 'Badge Icon',
          type: 'string',
          description: 'Emoji or icon for the badge (e.g., "✨")',
        }),
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        }),
      ],
    }),

    // Problem Section
    defineField({
      name: 'problemSection',
      title: 'Problem Section',
      type: 'object',
      fields: [
        defineField({
          name: 'tag',
          title: 'Section Tag',
          type: 'string',
          description: 'Small tag above title (e.g., "Problem")',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'image',
          title: 'Problem Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        }),
        defineField({
          name: 'problemPoints',
          title: 'Problem Points',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  description: 'Emoji icon (e.g., "📊")',
                }),
                defineField({
                  name: 'text',
                  title: 'Text',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  icon: 'icon',
                  text: 'text',
                },
                prepare({ icon, text }) {
                  return {
                    title: `${icon} ${text}`,
                  }
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
        }),
      ],
    }),

    // Solution Section
    defineField({
      name: 'solutionSection',
      title: 'Solution Section',
      type: 'object',
      fields: [
        defineField({
          name: 'tag',
          title: 'Section Tag',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'badges',
          title: 'Feature Badges',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'mainImage',
          title: 'Main Solution Image',
          type: 'image',
          description: 'Tablet/dashboard mockup image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        }),
        defineField({
          name: 'featureBadges',
          title: 'Feature Badges on Image',
          type: 'array',
          description: 'Badges that appear on the tablet mockup',
          of: [
            defineArrayMember({
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'detailedFeatures',
          title: 'Detailed Features',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'features',
                  title: 'Feature List',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'string',
                    }),
                  ],
                }),
                defineField({
                  name: 'image',
                  title: 'Feature Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    defineField({
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                    }),
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  media: 'image',
                },
              },
            }),
          ],
        }),
      ],
    }),

    // About Section
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({
          name: 'tag',
          title: 'Section Tag',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'foundersImage',
          title: 'Founders Photo',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        }),
        defineField({
          name: 'storyTitle',
          title: 'Story Title',
          type: 'string',
        }),
        defineField({
          name: 'storyText',
          title: 'Story Text',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'teamTag',
          title: 'Team Section Tag',
          type: 'string',
        }),
        defineField({
          name: 'teamTitle',
          title: 'Team Title',
          type: 'string',
        }),
      ],
    }),

    // CTA Section
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'Emoji icon (e.g., "📞")',
        }),
        defineField({
          name: 'tag',
          title: 'Tag',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
        }),
      ],
    }),

    // Footer Section
    defineField({
      name: 'footerSection',
      title: 'Footer Section',
      type: 'object',
      fields: [
        defineField({
          name: 'brandText',
          title: 'Brand Text',
          type: 'string',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
        }),
        defineField({
          name: 'linkedinUrl',
          title: 'LinkedIn URL',
          type: 'url',
        }),
        defineField({
          name: 'companyName',
          title: 'Company Name',
          type: 'string',
        }),
        defineField({
          name: 'companyNumber',
          title: 'Company Number',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (rule) => rule.email(),
        }),
        defineField({
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
