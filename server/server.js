const express = require('express');
const ServerModel = require('./model.js')
const cors = require('cors');

const serverModel = new ServerModel();

//искуственная задержка
const TIMEOUT = 2000;

const whitelist = ["http://localhost:8080"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

const app = express();
app.use(express.json("application/json"));
app.use(cors(corsOptions));

const port = 3001;
const log = (req, text='') => {
    console.log('method:', req?.method,'from:', req?.headers?.host,  req?.ip, text, req?.body?.id || '', req?.body?.destination?.name || '');
}

//all points
app.get('/api/points', (req, res) => {
  log(req, 'points')
  setTimeout(()=>{res.json({message: serverModel.getPoints()})}, TIMEOUT)
});

//all events
app.get('/api/events', (req, res) => {
  log(req, 'events')
  setTimeout(()=>{res.json({message: serverModel.getEvents()})}, TIMEOUT)
});

//all destinations
app.get('/api/destinations', (req, res) => {
  log(req, 'destinations')
  setTimeout(()=>{res.json({message: serverModel.getDestinations()})}, TIMEOUT)
});

//get point by id
app.post('/api/point', (req, res) => {
  log(req, 'point by id')
  setTimeout(()=>{res.json({message: serverModel.getPointById(req.body.id)})}, TIMEOUT)
});

//create new point by data
app.post('/api/create', (req, res) => {
  log(req, 'created: ')
  res.send({message: serverModel.createPoint(req.body)})
})

//create new point by data
app.post('/api/update', (req, res) => {
  log(req, 'update')
  res.send({message: serverModel.updatePoint(req.body)})
})

//delete point by id
app.post('/api/delete', (req, res) => {
  log(req, 'delete')
  res.send({message: serverModel.deletePoint(req.body.id)})
})

app.post('*', (req, res) => {
  log(req)
  //WIP
  res.json({
    message: 'post ok',
    body: req.body})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

//node server/server.js to run this
