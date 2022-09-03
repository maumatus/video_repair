//Modulos basicos para encender el server
const express = require('express')
const app = express()
const PORT = 3000;

//Importamos lo necesario para deserializar
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let fs = require('fs');
let path = require('path');

//Modulos procesadores de archivos
const atadenoise = require('./routes/atadenoise');
const dctdnoiz = require('./routes/dctdnoiz');  
const fftdnoiz  = require('./routes/fftdnoiz');  
const nlmeans = require('./routes/nlmeans');  
const owdenoise = require('./routes/owdenoise');  
const vaguedenoiser = require('./routes/vaguedenoiser');

//Esta ruta es para probar que estamos recibiendo, luego se implementa real.
app.post('/atadenoise', function (req, res, next) {
  const dirEntrada = req.body.entrada;
  const dirSalida = req.body.salida;
  console.log("revisamos que data nos carga el middleware")
  console.log(entrada,salida)
})

app.use(express.urlencoded({
  extended: true
}));

//Por mientras agregamos la funcianalidad para enviar retorno a front despues
//Implementar barra de avance o un aviso sobre termino de procesado de archivo
io.on('connection', (socket) => {
  console.log('un usuario conectado')
});

//Aqui construimos el enrutador con rutas de Node-Express
app.get('/atadenoise', function (req, res, next) {
  const dirEntrada = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche1.avi';
  const dirSalida = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/atadenoise.mov';
  var th0A = 0.02;
  var th1A = 0.02;
  var th2A = 0.02;
  var th0B = 0.04;
  var th1B = 0.04;
  var th2B = 0.04;
  var planosPromedio = 10;
  atadenoise(dirEntrada, dirSalida, th0A, th1A, th2A, th0B, th1B, th2B, planosPromedio);
  res.end();
});

app.get('/dctdnoiz', function (req, res, next) {
  const dirEntrada = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche1.avi';
  const dirSalida = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/dctdnoiz.mov';
  let sigma = 2;
  let n = 1;
  dctdnoiz(dirEntrada, dirSalida, sigma, n);
  res.end();
});

app.get('/fftdnoiz', function (req, res, next) {
  const dirEntrada = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche1.avi';
  const dirSalida = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/fftdnoiz.mov';
  let sig = 1;
  let amount = 1;
  fftdnoiz(dirEntrada, dirSalida, sig, amount);
  res.end();
});

app.get('/nlmeans', function (req, res, next) {
  const dirEntrada = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche1.avi';
  const dirSalida = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/nlmeans.mov';
  let s = 1;
  let p = 7; 
  let pc = 0;
  let r = 15;
  let rc = 0;
  nlmeans(dirEntrada, dirSalida, s, p, pc, r, rc);
  res.end();
});

app.get('/owdenoise', function (req, res, next) {
  const dirEntrada = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche1.avi';
  const dirSalida = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/owdenoise.mov';
  let depth = 8;
  let ls = 1;
  let cs = 1;
  owdenoise(dirEntrada, dirSalida, depth, ls, cs);
  res.end();
});

app.get('/vaguedenoiser', function (req, res, next) {
  const dirEntrada = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche1.avi';
  const dirSalida = '/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/vaguedenoiser.mov';
  let threshold = 2;
  let method = 1;
  let nsteps = 1;
  let percent = 1;
  vaguedenoiser(dirEntrada, dirSalida, threshold, method, nsteps, percent);
  res.end();
});

/*
//activamos los distintos routers
app.use(router1);
app.use(router2);
app.use(router3);
app.use(router4);
app.use(router5);
app.use(router6);
*/

//Ejecutamos server
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Ejecutando servidor en http://localhost:${PORT}`)
});