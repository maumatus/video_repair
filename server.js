const express = require('express')
const app = express()
const PORT = 3000;

//Importamos los modulos con los distintos motores "denoiser"
const ATADENOISE = require('./routers/atadenoise');  
const ATADENOISE = require('./routers/bitplanedenoise');  
const ATADENOISE = require('./routers/dctdnoiz');  
const ATADENOISE = require('./routers/fftdnoiz');  
const ATADENOISE = require('./routers/nlmeans');  
const ATADENOISE = require('./routers/owdenoise');  
const ATADENOISE = require('./routers/vaguedenoiser');  

//Construimos 7 enrutadores para los distintos metodos de "Reduccion de ruido".
const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();
const router4 = express.Router();
const router5 = express.Router();
const router6 = express.Router();
const router7 = express.Router();

//Aqui construimos el enrutador con Node-Express
router1.post('/nlmeans', function (req, res, next) {
  console.log("Router1 funcionando");
  res.end();
});

router2.post('/atadenoise', function (req, res, next) {
  console.log("Router1 funcionando");
  res.end();
});

router3.post('/bitplanedenoise', function (req, res, next) {
  console.log("Router1 funcionando");
  res.end();
});

router4.post('/dctdnoiz', function (req, res, next) {
  console.log("Router1 funcionando");
  res.end();
});

router5.post('/fftdnoiz', function (req, res, next) {
  console.log("Router1 funcionando");
  res.end();
});

router6.post('/owdenoise', function (req, res, next) {
  console.log("Router1 funcionando");
  res.end();
});

router7.post('/vaguedenoiser', function (req, res, next) {
  console.log("Router1 funcionando");
  res.end();
});

app.use(router1);
app.use(router2);
app.use(router3);
app.use(router4);
app.use(router5);
app.use(router6);
app.use(router7);


//Server
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Ejecutando servidor en http://localhost:${PORT}`)
});