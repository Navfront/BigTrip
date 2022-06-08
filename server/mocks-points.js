POINTS = [
  {
    id: '0',
    isFavorite: false,
    basePrice: 1100,
    dateFrom: '2022-03-21T22:55:56.845Z',
    dateTo: '2022-03-22T11:22:13.375Z',
    destination:
      {
        name: 'amsterdam',
        description: 'Amsterdam is nice.',
        pictures: [
          {
            src: 'http://picsum.photos/300/200',
            description: 'Geneva looks good',
          },
          {
            src: 'img/photos/3.jpg',
            description: 'Random image',
          },
          {
            src: 'img/photos/4.jpg',
            description: 'Random image',
          },
        ],
      },
    offers: [
      {
        title: 'Upgrade to a business class',
        price: 120,
      },
      {
        title: 'Choose the radio station',
        price: 60,
      },
    ],
    type: 'taxi',
  },
  {
    id: '1',
    isFavorite: true,
    basePrice: 4100,
    dateFrom: '2019-07-11T12:55:56.845Z',
    dateTo: '2019-07-12T11:12:13.375Z',
    destination: {
      name: 'geneva',
      description: 'Geneva is beautiful.',
      pictures: [
        {
          src: 'http://picsum.photos/300/200?r=0.0762563005163317',
          description: 'Geneva looks good',
        },
        {
          src: 'img/photos/1.jpg',
          description: 'Random image',
        },
        {
          src: 'img/photos/2.jpg',
          description: 'Random image',
        },
      ],
    },
    offers: [
      {
        title: 'Restoraunt all-inclusice',
        price: 400,
      },
    ],
    type: 'train',
  },
  {
    id: '2',
    isFavorite: true,
    basePrice: 2100,
    dateFrom: '2019-07-12T22:55:56.845Z',
    dateTo: '2019-07-13T15:22:13.375Z',
    destination: {
      name: 'chamonix',
      description:
        'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
      pictures: [
        {
          src: 'http://picsum.photos/300/200?r=0.0762563005163317',
          description: 'Chamonix parliament building',
        },
        {
          src: 'img/photos/5.jpg',
          description: 'Random image',
        },
      ],
    },
    offers: [
      {
        title: 'Upgrade to comfort class',
        price: 50,
      },
    ],
    type: 'flight',
  },
];

module.exports = POINTS;
