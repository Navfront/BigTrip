export const EVENT_TYPE = [
  "taxi",
  "bus",
  "train",
  "ship",
  "transport",
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

export const LOCAL_POINT = {
  base_price: 222,
  date_from: "2019-07-10T22:55:56.845Z",
  date_to: "2019-07-11T11:22:13.375Z",
  destination: DESTINATION,
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
  type: "taxi",
};
