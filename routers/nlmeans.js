const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

//Probamos procesar tamaño video
ffmpeg()
  .input('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/video.avi')
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
      filter: "nlmeans=s=1.0:p=7:pc=0:r=15:rc=0"//Opciones funcionaron asi. Entender.
    }
  ) 
  .toFormat('mov')
  .on('progress', function(progress) {
    console.log('Progreso ' + Object.keys(progress));
    console.log('Progreso ' + progress.frames + progress);
  })
  .output('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/noche-salidav2.mov')
  .on('error', function(err) {
  console.log(err);
  })
  .on('end', function() {
    console.log('Processing finished !');
  })
  .run();