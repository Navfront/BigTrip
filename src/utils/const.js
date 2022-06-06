export const FILTERS = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export const SORTS = [
  {
    sortName: 'day',
    isDisabled: false,
    isChecked: true,
  },
  {
    sortName: 'event',
    isDisabled: false,
    isChecked: false,
  },
  {
    sortName: 'time',
    isDisabled: false,
    isChecked: false,
  },
  {
    sortName: 'price',
    isDisabled: false,
    isChecked: false,
  },
  {
    sortName: 'offer',
    isDisabled: false,
    isChecked: false,
  },
];

export const TYPES_OF_TRANSFER = [{
  title: 'Bus to',
  id: 'bus',
},
{
  title: 'Drive to',
  id: 'drive',
},
{
  title: 'Flight to',
  id: 'flight',
},
{
  title: 'Ship to',
  id: 'ship',
},
{
  title: 'Taxi to',
  id: 'taxi',
},
{
  title: 'Train to',
  id: 'train',

},
{
  title: 'Transport to',
  id: 'transport',

},
];
