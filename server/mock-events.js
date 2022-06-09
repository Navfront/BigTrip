const EVENTS = [
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
    destinations: ['geneva', 'chamonix'],
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

module.exports = EVENTS
