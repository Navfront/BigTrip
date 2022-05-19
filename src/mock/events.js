export const EVENTS = {
  taxi: {
    offers: [
      {
        title: "Upgrade to a business class",
        price: 120,
      },
      {
        title: "Choose the radio station",
        price: 60,
      },
    ],
    destinations: ["geneva"],
  },
  bus: {
    offers: [
      {
        title: "Upgrade to a lux bus",
        price: 110,
      },
      {
        title: "Climat control",
        price: 160,
      },
    ],
    destinations: ["geneva", "chamonix"],
  },
  train: {
    offers: [
      {
        title: "Ride on old stream train",
        price: 310,
      },
      {
        title: "Climat control",
        price: 260,
      },
      {
        title: "Restoraunt all-inclusice",
        price: 400,
      },
    ],
    destinations: ["geneva", "chamonix"],
  },
  ship: {
    offers: [
      {
        title: "Fast boat",
        price: 510,
      },
      {
        title: "Swiming",
        price: 260,
      },
      {
        title: "All-inclusice",
        price: 400,
      },
      {
        title: "Fishing",
        price: 70,
      },
    ],
    destinations: ["amsterdam"],
  },
  transport: {
    offers: [],
    destinations: ["amsterdam", "geneva"],
  },
  drive: {
    offers: [
      {
        title: "Upgrade to s-class",
        price: 600,
      },
    ],
    destinations: ["amsterdam", "geneva", "chamonix"],
  },
  flight: {
    offers: [
      {
        title: "Choose meal",
        price: 180,
      },
      {
        title: "Upgrade to comfort class",
        price: 50,
      },
    ],
    destinations: ["amsterdam", "geneva", "chamonix"],
  },
  "check-in": {
    offers: [
      {
        title: "Penthouse",
        price: 11980,
      },
      {
        title: "All-inclusive",
        price: 9950,
      },
    ],
    destinations: ["amsterdam", "geneva", "chamonix"],
  },
  sightseeing: {
    offers: [
      {
        title: "Extra",
        price: 1200,
      },
      {
        title: "All-inclusive",
        price: 1950,
      },
    ],
    destinations: ["amsterdam", "geneva", "chamonix"],
  },
  restaurant: {
    offers: [
      {
        title: "Mclaren pub",
        price: 200,
      },
      {
        title: "That place",
        price: 350,
      },
    ],
    destinations: ["amsterdam", "geneva", "chamonix"],
  },
};

export const EVENT_DESTINATIONS = {
  chamonix: {
    base_price: 1300,
    description:
      "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
    name: "Chamonix",
    pictures: [
      {
        src: "http://picsum.photos/300/200?r=0.0762563005163317",
        description: "Chamonix parliament building",
      },
      {
        src: "img/photos/5.jpg",
        description: "Random image",
      },
    ],
  },
  geneva: {
    base_price: 999,
    description: "Geneva is beautiful.",
    name: "Geneva",
    pictures: [
      {
        src: "http://picsum.photos/300/200?r=0.0762563005163317",
        description: "Geneva looks good",
      },
      {
        src: "img/photos/1.jpg",
        description: "Random image",
      },
      {
        src: "img/photos/2.jpg",
        description: "Random image",
      },
    ],
  },
  amsterdam: {
    base_price: 1500,
    description: "Amsterdam is nice.",
    name: "Amsterdam",
    pictures: [
      {
        src: "http://picsum.photos/300/200",
        description: "Geneva looks good",
      },
      {
        src: "img/photos/3.jpg",
        description: "Random image",
      },
      {
        src: "img/photos/4.jpg",
        description: "Random image",
      },
    ],
  },
};

export const POINT = {
  base_price: 1100,
  date_from: "2019-07-10T22:55:56.845Z",
  date_to: "2019-07-11T11:22:13.375Z",
  destination: "amsterdam",
  id: "0",
  is_favorite: false,
  offers: [
    {
      title: "Choose meal",
      price: 180,
    },
    {
      title: "Upgrade to comfort class",
      price: 50,
    },
  ],
  type: "bus",
};

export const EVENT_TYPES = Object.keys(EVENTS);
// ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant']

export const getDestinationByTypes = (eventType) => {
  if (EVENT_TYPES.some((it) => it === eventType)) {
    return EVENTS[eventType].destinations;
  }
  return "bad type of event in getDestinationByTypes function";
};

export const getOffersByType = (eventType) => {
  if (EVENT_TYPES.some((it) => it === eventType)) {
    return EVENTS[eventType].offers;
  }
  return "bad type of event in getOffersByType function";
};

export const getPicturesByDestination = (destinationName) => {
  return EVENT_DESTINATIONS[destinationName].pictures;
};

export const getDescriptionOfDestination = (destinationName) => {
  return EVENT_DESTINATIONS[destinationName].description;
};

//WIP
export const IMAGES_SRC = [
  "img/photos/1.jpg",
  "img/photos/2.jpg",
  "img/photos/3.jpg",
  "img/photos/4.jpg",
  "img/photos/5.jpg",
];
