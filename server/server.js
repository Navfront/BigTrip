const express = require('express');
const ServerModel = require('./model.js')
const serverModel = new ServerModel();

//искуственная задержка
const TIMEOUT = 2000;


const app = express();
app.use(express.json("application/json"))

const port = 3001;
const log = (req) => {
    console.log('method:', req?.method,'from:', req?.headers?.host,  req?.ip, req?.body);
}

//all points
app.get('/api/points', (req, res) => {
  log(req)
  setTimeout(()=>{res.json({message: serverModel.getPoints()})}, TIMEOUT)
});

//all events
app.get('/api/events', (req, res) => {
  log(req)
  setTimeout(()=>{res.json({message: serverModel.getEvents()})}, TIMEOUT)
});

//all destinations
app.get('/api/destinations', (req, res) => {
  log(req)
  setTimeout(()=>{res.json({message: serverModel.getDestinations()})}, TIMEOUT)
});

//get point by query id
app.post('/api/point', (req, res) => {
  log(req)
  setTimeout(()=>{res.json({message: serverModel.getPointById(req.body.id)})}, TIMEOUT)
});

//create new point by data
app.post('/api/create', (req, res) => {
  log(req)
  res.send({message: serverModel.createPoint(req.body)})
})

//create new point by data
app.post('/api/update', (req, res) => {
  log(req)
  res.send({message: serverModel.updatePoint(req.body)})
})

//delete point by query id
app.post('/api/delete', (req, res) => {
  log(req)
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
