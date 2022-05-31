const express = require('express');
const app = express();
const port = 3000;
const log = (req) => {
    console.log('method:', req.method,'from:', req.headers.host,  req.ip);
}
app.get('/api', (req, res) => {
  log(req)

  res.send({message: DATA});
});

app.put('/api', (req, res) => {
  log(req)
  //WIP
  res.send({message: 'updated'})
})

app.delete('/api', (req, res) => {
  log(req)
  //WIP
  res.send({message: 'deleted'})
})

app.post('/api', (req, res) => {
  log(req)
  //WIP
  res.send({message: 'created'})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

//node server.js to run this


const DATA = [
  {
    basePrice: 1100,
    dateFrom: '2022-06-21T22:55:56.845Z',
    dateTo: '2022-06-22T11:22:13.375Z',
    destination: 'amsterdam',
    id: '0',
    isFavorite: false,
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
    type: 'taxi',
  },
  {
    basePrice: 4100,
    dateFrom: '2019-07-11T12:55:56.845Z',
    dateTo: '2019-07-12T11:12:13.375Z',
    destination: 'geneva',
    id: '1',
    isFavorite: true,
    offers: [
      {
        title: 'Choose meal',
        price: 280,
      },
      {
        title: 'Upgrade to comfort class',
        price: 150,
      },
    ],
    type: 'train',
  },
  {
    basePrice: 2100,
    dateFrom: '2019-07-12T22:55:56.845Z',
    dateTo: '2019-07-13T15:22:13.375Z',
    destination: 'chamonix',
    id: '2',
    isFavorite: true,
    offers: [
      {
        title: 'Choose meal',
        price: 1280,
      },
      {
        title: 'Upgrade to comfort class',
        price: 4150,
      },
    ],
    type: 'flight',
  },
];
