const express = require('express')
const app = express()
const PORT = 3000;

//Importamos los modulos con los distintos motores "denoiser".PENDIENTE.
//Cambiar por destructuracion para importar funcion y utilizar c/u en este enrutador.
const { atadenoise } = require('./routers/atadenoise');  ;  
const { dctdnoiz } = require('./routers/dctdnoiz');  
const { fftdnoiz } = require('./routers/fftdnoiz');  
const { nlmeans } = require('./routers/nlmeans');  
const { owdenoise } = require('./routers/owdenoise');  
const { vaguedenoiser } = require('./routers/vaguedenoiser');  

//Construimos 7 enrutadores para los distintos metodos de "Reduccion de ruido".
const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();
const router4 = express.Router();
const router5 = express.Router();
const router6 = express.Router();

//Aqui construimos el enrutador con rutas de Node-Express
router1.post('/atadenoise', function (req, res, next) {
  let dirEntrada = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche1.avi';
  let dirSalida = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/atadenoise.mov';
  atadenoise(dirEntrada, dirSalida);
  console.log("Router1 funcionando");
  res.end();
});

router2.post('/dctdnoiz', function (req, res, next) {
  dctdnoiz();
  console.log("Router1 funcionando");
  res.end();
});

router3.post('/fftdnoiz', function (req, res, next) {
  fftdnoiz();
  console.log("Router1 funcionando");
  res.end();
});

router4.post('/nlmeans', function (req, res, next) {
  nlmeans();
  console.log("Router1 funcionando");
  res.end();
});

router5.post('/owdenoise', function (req, res, next) {
  owdenoise();
  console.log("Router1 funcionando");
  res.end();
});

router6.post('/vaguedenoiser', function (req, res, next) {
  vaguedenoiser();
  console.log("Router1 funcionando");
  res.end();
});

//activamos los distintos routers
app.use(router1);
app.use(router2);
app.use(router3);
app.use(router4);
app.use(router5);
app.use(router6);


//Server escuchando
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Ejecutando servidor en http://localhost:${PORT}`)
});