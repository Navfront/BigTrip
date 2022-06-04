//-> api/points
export const POINTS = [
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

//-> api/destination?<name>
export const EVENT_DESTINATIONS = [
  { name: 'Chamonix',
    basePrice: 1300,
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
  { name: 'Geneva',
    basePrice: 999,
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
  { name: 'Amsterdam',
    basePrice: 1500,
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
];
//-> api/offers?<type>
export const EVENTS_DATA = [
  {
    type: 'taxi',
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
    destinations: ['geneva'],
  },
  {
    type: 'bus',
    offers: [
      {
        title: 'Upgrade to a lux bus',
        price: 110,
      },
      {
        title: 'Climat control',
        price: 160,
      },
    ],
    destinations: ['geneva', 'chamonix'],
  },
  {
    type: 'train',
    offers: [
      {
        title: 'Ride on old stream train',
        price: 310,
      },
      {
        title: 'Climat control',
        price: 260,
      },
      {
        title: 'Restoraunt all-inclusice',
        price: 400,
      },
    ],
    destinations: ['geneva', 'chamonix', 'xz'],
  },
  {
    type: 'ship',
    offers: [
      {
        title: 'Fast boat',
        price: 510,
      },
      {
        title: 'Swiming',
        price: 260,
      },
      {
        title: 'All-inclusice',
        price: 400,
      },
      {
        title: 'Fishing',
        price: 70,
      },
    ],
    destinations: ['amsterdam'],
  },
  {
    type: 'transport',
    offers: [],
    destinations: ['amsterdam', 'geneva'],
  },
  {
    type: 'drive',
    offers: [
      {
        title: 'Upgrade to s-class',
        price: 600,
      },
    ],
    destinations: ['amsterdam', 'geneva', 'chamonix'],
  },
  {
    type: 'flight',
    offers: [
      {
        title: 'Choose meal',
        price: 180,
      },
      {
        title: 'Upgrade to comfort class',
        price: 50,
      },
    ],
    destinations: ['amsterdam', 'geneva', 'chamonix'],
  },
  {
    type: 'check-in',
    offers: [
      {
        title: 'Penthouse',
        price: 11980,
      },
      {
        title: 'All-inclusive',
        price: 9950,
      },
    ],
    destinations: ['amsterdam', 'geneva', 'chamonix'],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        title: 'Extra',
        price: 1200,
      },
      {
        title: 'All-inclusive',
        price: 1950,
      },
    ],
    destinations: ['amsterdam', 'geneva', 'chamonix'],
  },
  {
    type: 'restaurant',
    offers: [
      {
        title: 'Mclaren pub',
        price: 200,
      },
      {
        title: 'That place',
        price: 350,
      },
    ],
    destinations: ['amsterdam', 'geneva', 'chamonix'],
  },
];
