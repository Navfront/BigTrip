const express = require('express');
const ServerModel = require('./model.js')
const serverModel = new ServerModel();

//искуственная задержка
const TIMEOUT = 2000;


const app = express();

const port = 3001;
const log = (req) => {
    console.log('method:', req.method,'from:', req.headers.host,  req.ip);
}
app.get('/api', (req, res) => {
  log(req)
  setTimeout(()=>{res.send({message: serverModel.getPoints})}, TIMEOUT)
});

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

//node server/server.js to run this
