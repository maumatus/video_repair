const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

//Encapsulamos el modulo dentro de funcion.
function atadenoise(entrada, salida, thresholdAp1, thresholdBp1, thresholdAp2, thresholdBp2, thresholdAp3, thresholdBp3, planosPromedio, planosFilter ) {
  ffmpeg()
    //.input('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche1.avi')
    .input(entrada)
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
        filter: `"atadenoise=0a=${thresholdAp1}:1a=${thresholdAp2}:2a=${thresholdAp3}:0b=${thresholdBp1}:1b=${thresholdBp2}:2b=${thresholdBp3}:s=${planosPromedio}:p=${planosFilter}"`
      }
      //filter: "atadenoise=0a=0.03:1a=0.03:2a=0.03:0b=0.07:1b=0.07:2b=0.07:s=20:p=all"
    ) 
    .toFormat('mov')
    .on('progress', function(progress) {
      console.log('Progreso ' + Object.keys(progress));
      console.log('Progreso ' + progress.frames + progress);
    })
     //.output('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/atadenoise.mov')
    .output(salida)
    .on('error', function(err) {
    console.log(err);
    })
    .on('end', function() {
      console.log('Processing finished !');
    })
    .run();
};

export default atadenoise();

  //Nos falta crear una funcion por cada modulo, asi esta funcion procesa el video
  //Segun peticiones con parametros desde frontend