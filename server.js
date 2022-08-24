const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


//Obtenemos Metadata
/*
ffmpeg.ffprobe('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche.avi', (data, err)=> {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
});
*/

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
      filter: "atadenoise=0a=0.02:1a=0.02:2a=0.02:0b=0.04:1b=0.04:2b=0.04:s=9:p=all"//Opciones funcionaron asi. Entender.
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