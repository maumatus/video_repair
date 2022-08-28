const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

//Probamos procesar tamaño video
ffmpeg()
  .input('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche1.avi')
  //.inputFormat('avi')
  .FPSOutput(24)
  .size('1920x1080')
  //.videoCodec('libx264rgb')
  //.videoBitrate('30000k')
  .videoCodec('prores_ks')
  
  //.addOptions(['-pix_fmt yuv422p10le', '-profile:v 3'])
  .addOptions(['-pix_fmt yuva444p10le', '-profile:v 3'])
  
  .videoFilters(
    {
      filter: "atadenoise=0a=0.03:1a=0.03:2a=0.03:0b=0.07:1b=0.07:2b=0.07:s=20:p=all"//Opciones funcionaron asi. Entender.
    }
  ) 
  .toFormat('mov')
  .on('progress', function(progress) {
    console.log('Progreso ' + Object.keys(progress));
    console.log('Progreso ' + progress.frames + progress);
  })
  .output('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/atadenoise.mov')
  .on('error', function(err) {
  console.log(err);
  })
  .on('end', function() {
    console.log('Processing finished !');
  })
  .run();


  //Nos falta crear una funcion por cada modulo, asi esta funcion procesa el video
  //Segun peticiones con parametros desde frontend