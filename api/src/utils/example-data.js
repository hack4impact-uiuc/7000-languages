module.exports.exampleData = {
  units: [
    {
      unitData: {
        name: 'Language Learning Phrases',
        selected: true,
        description:
          'Useful phrases that are a good introduction to the language.',
      },
      lessons: [
        {
          lessonData: {
            name: 'Helpful Phrases',
            selected: true,
            description: 'Helpful phrases description.',
          },
          vocab: [
            {
              original: 'How do you say hello?',
              translation: 'Translation of hello',
            },
            {
              original: 'How do you say goodnight?',
              translation: 'Translation of goodnight',
            },
          ],
        },
        {
          lessonData: {
            name: 'The Basics - Colors',
            selected: true,
            description: 'Learn how to say a variety of colors.',
          },
          vocab: [],
        },
        {
          lessonData: {
            name: 'The Basics - Numbers',
            selected: true,
            description: 'Learn the basic numbers of the language.',
          },
          vocab: [],
        },
      ],
    },
  ],
};
