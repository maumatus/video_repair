const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

//Encapsulamos dentro de modulo la función y la exportamos.
module.exports = function atadenoise(entrada, salida, th0A, th1A, th2A, th0B, th1B, th2B, planosPromedio) {
  
  ffmpeg()
    .input(entrada)
    //.inputFormat('avi')
    .FPSOutput(24)
    .size('1920x1080')
    //.videoCodec('libx264rgb')
    //.videoBitrate('30000k')
    .videoCodec('prores_ks')
    
    //.addOptions(['-pix_fmt yuv422p10le', '-profile:v 3'])
    .addOptions(['-pix_fmt yuva444p10le', '-profile:v 3'])
 /* este tamboen funciona, pero no carga variables dentro scope del objeto 
   .videoFilters(
     {
       //filter: "atadenoise=0a=0.03:1a=0.03:2a=0.03:0b=0.07:1b=0.07:2b=0.07:s=20"
       //filter: `"atadenoise=0a=${th0A}:1a=${th1A}:2a=${th2A}:0b=${th0B}:1b=${th1B}:2b=${th2B}:s=${planosPromedio}"`
       filter: `"atadenoise=0a=${th0A}:1a=${th1A}:2a=${th2A}:0b=${th0B}:1b=${th1B}:2b=${th2B}:s=${planosPromedio}"`
     }
    ) 
  */
    //.videoFilters("atadenoise=0.03:0.03:0.03:0.07:0.07:0.07:20") este funciona, opcion sin nombres.
    .videoFilters([`atadenoise=${th0A}:${th0B}:${th1A}:${th1B}:${th2A}:${th2B}:${planosPromedio}`])
  
    .toFormat('mov')
    .on('progress', function(progress) {
      console.log('Progreso ' + Object.keys(progress));
      console.log('Progreso ' + progress.frames + progress);
    })
     
    .output(salida)
    .on('error', function(err) {
    console.log(err);
    })
    .on('end', function() {
      console.log('Processing finished !');
    })
    .run();
};