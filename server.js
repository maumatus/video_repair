const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


//Obtenemos Metadata
ffmpeg.ffprobe('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche.avi', (data, err)=> {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
});

//Probamos procesar tamaño video
ffmpeg()
  .input('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage/noche.avi')
  //.inputFormat('avi')
  .FPSOutput(24)
  .size('1920x1080')
  .videoCodec('libx264rgb')
  .videoBitrate('30000k')
  //.videoCodec('prores')
  
  .addOptions(['-pix_fmt yuv420p'])
  .videoFilters(
    {
      filter: 'atadenoiser',
      //options: { a:0.02, b:0.04, a:0.02, b:15, a:0.02, b:0.02, s:9, p:'all', a:'p', s:32767  }
    })
  .toFormat('mp4')
  .on('progress', function(progress) {
    console.log('Progreso ' + Object.keys(progress));
    console.log('Progreso ' + progress.frames + progress);
  })
  .output('/Volumes/SSD_02/Desarrollo_ProcVideo/Footage_salida/noche-salida.mp4')
  .on('error', function(err) {
  console.log(err);
  })
  .on('end', function() {
    console.log('Processing finished !');
  })
  .run();