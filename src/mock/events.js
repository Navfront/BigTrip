export const EVENTS_TYPE = [
  "taxi",
  "bus",
  "train",
  "ship",
  "drive",
  "flight",
  "check-in",
  "sightseeing",
  "restaurant",
];

export const DESTINATION = {
  description:
    "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
  name: "Chamonix",
  pictures: [
    {
      src: "http://picsum.photos/300/200?r=0.0762563005163317",
      description: "Chamonix parliament building",
    },
  ],
};

export const POINT = {
  base_price: 1100,
  date_from: "2019-07-10T22:55:56.845Z",
  date_to: "2019-07-11T11:22:13.375Z",
  destination: DESTINATION,
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

export const OFFER = {
  type: "taxi",
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
};

export const ALL_POINTS = [
  {
    id: "0",
    base_price: 1100,
    destination: {
      description:
        "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
      name: "Chamonix",
      pictures: [
        {
          src: "http://picsum.photos/300/200?r=0.0762563005163317",
          description: "Chamonix parliament building",
        },
      ],
    },

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
  },
  {
    id: "1",
    base_price: 3100,
    destination: {
      description: "Geneva, is a beautiful.",
      name: "Geneva",
      pictures: [
        {
          src: "http://picsum.photos/300/200?r=0.0762563005163317",
          description: "Geneva looks good",
        },
      ],
    },
    offers: [
      {
        title: "Add luggage",
        price: 30,
      },
      {
        title: "Switch to comfort class",
        price: 100,
      },
      {
        title: "Add meal",
        price: 15,
      },
    ],
    type: "flight",
  },
];

export const ALL_DESTINATIONS_BY_TYPE = [
  { flight: ["Amsterdam", "Geneva", "Chamonix"] },
];

export const OFFERS_BY_DESTINATIONS = [
  {
    geneva: [
      {
        title: "Add luggage",
        price: 30,
      },
      {
        title: "Switch to comfort class",
        price: 100,
      },
      {
        title: "Add meal",
        price: 15,
      },
    ],
  },
];

//WIP
export const IMAGES_SRC = [
  "img/photos/1.jpg",
  "img/photos/2.jpg",
  "img/photos/3.jpg",
  "img/photos/4.jpg",
  "img/photos/5.jpg",
];
