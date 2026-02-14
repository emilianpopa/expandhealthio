import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'calendlyUrl',
      title: 'Calendly Booking URL',
      type: 'url',
      description: 'Your Calendly booking page URL',
      validation: (Rule) => Rule.required().uri(),
    }),
    defineField({
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        {name: 'name', title: 'Company Name', type: 'string'},
        {name: 'companyNumber', title: 'Company Number', type: 'string'},
        {name: 'address', title: 'Address', type: 'text'},
        {name: 'email', title: 'Support Email', type: 'string'},
        {name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url'},
      ],
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {name: 'badge', title: 'Badge Text', type: 'string'},
        {name: 'title', title: 'Hero Title', type: 'string'},
        {name: 'description', title: 'Hero Description', type: 'text'},
        {name: 'image', title: 'Hero Image', type: 'image'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
