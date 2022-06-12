export const EVENTS = {
  taxi: {
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
  bus: {
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
  train: {
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
    destinations: ['geneva', 'chamonix'],
  },
  ship: {
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
  transport: {
    offers: [],
    destinations: ['amsterdam', 'geneva'],
  },
  drive: {
    offers: [
      {
        title: 'Upgrade to s-class',
        price: 600,
      },
    ],
    destinations: ['amsterdam', 'geneva', 'chamonix'],
  },
  flight: {
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
  'check-in': {
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
  sightseeing: {
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
  restaurant: {
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
};

export const EVENT_DESTINATIONS = {
  chamonix: {
    basePrice: 1300,
    description:
      'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
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
  geneva: {
    basePrice: 999,
    description: 'Geneva is beautiful.',
    name: 'Geneva',
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
  amsterdam: {
    basePrice: 1500,
    description: 'Amsterdam is nice.',
    name: 'Amsterdam',
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
};

export const EVENT_TYPES = Object.keys(EVENTS);
