import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'headline',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'theme',
      title: 'Research Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Urban Systems', value: 'systems' },
          { title: 'Human Behavior', value: 'behavior' },
          { title: 'Policy & Planning', value: 'policy' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Completed', value: 'completed' },
          { title: 'Planned', value: 'planned' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'team',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        },
      ],
    }),
    defineField({
      name: 'chartData',
      title: 'Chart Data',
      type: 'object',
      description: 'Optional data visualization for this project',
      fields: [
        defineField({
          name: 'chartType',
          title: 'Chart Type',
          type: 'string',
          options: {
            list: [
              { title: 'Bar Chart', value: 'bar' },
              { title: 'Line Chart', value: 'line' },
              { title: 'Pie Chart', value: 'pie' },
              { title: 'Area Chart', value: 'area' },
            ],
            layout: 'dropdown',
          },
        }),
        defineField({
          name: 'title',
          title: 'Chart Title',
          type: 'string',
        }),
        defineField({
          name: 'data',
          title: 'Data Points',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'value', title: 'Value', type: 'number' },
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'value',
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'xAxisLabel',
          title: 'X-Axis Label',
          type: 'string',
        }),
        defineField({
          name: 'yAxisLabel',
          title: 'Y-Axis Label',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'relatedPublications',
      title: 'Related Publications',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'publication' }],
        },
      ],
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const startDate = (context.parent as { startDate?: string })?.startDate
          if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
            return 'End date must be after start date'
          }
          return true
        }),
    }),
  ],
  orderings: [
    {
      title: 'Start Date, Newest',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Start Date, Oldest',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
    {
      title: 'Headline A-Z',
      name: 'headlineAsc',
      by: [{ field: 'headline', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'headline',
      theme: 'theme',
      status: 'status',
      media: 'featuredImage',
    },
    prepare({ title, theme, status, media }) {
      const themeLabels: Record<string, string> = {
        systems: 'Urban Systems',
        behavior: 'Human Behavior',
        policy: 'Policy & Planning',
      }
      const statusLabels: Record<string, string> = {
        active: 'Active',
        completed: 'Completed',
        planned: 'Planned',
      }

      return {
        title,
        subtitle: `${themeLabels[theme] || theme} | ${statusLabels[status] || status}`,
        media,
      }
    },
  },
})
